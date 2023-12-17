const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },

    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author.name === args.author && book.genres.includes(args.genre)
        );
      } else if (args.author)
        return books.filter((book) => book.author.name === args.author);
      else if (args.genre)
        if (args.genre === "all genres") return books;
        else return books.filter((book) => book.genres.includes(args.genre));
      else return books;
    },

    allAuthors: async () => {
      const authors = await Author.find({}).populate("books");

      return authors.map(async (author) => {
        const bookCount = author.books.length;

        return {
          name: author.name,
          born: author.born,
          bookCount,
          allBooks: author.books,
        };
      });
    },

    me: (root, args, context) => {
      console.log(context.currentUser);
      return context.currentUser;
    },

    allGenres: async () => {
      const books = await Book.find({});
      const genres = books.map((book) => book.genres).flat();
      return [...new Set(genres)];
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(args);
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      console.log("current user", currentUser);
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1,
          books: [],
        });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
          });
        }
      }

      const book = new Book({
        ...args,
        author: await Author.findOne({ name: args.author }),
      });

      const newAuthor = await Author.findOneAndUpdate(
        { name: args.author },
        { $push: { books: book._id } },
        { new: true }
      );

      await newAuthor.save();

      console.log(book);

      try {
        await book.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(error.message, {
            extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
          });
        }
      }

      newBook = {
        title: book.title,
        published: book.published,
        genres: book.genres,
        author: {
          name: book.author.name,
          bookCount: 1,
          allBooks: [book.title],
        },
      };
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
      return newBook;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      console.log("current user", currentUser);

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      console.log(author);
      if (!author) return null;
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Saving user failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator("BOOK_ADDED") },
  },
};

module.exports = resolvers;
