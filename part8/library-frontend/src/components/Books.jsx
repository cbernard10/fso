import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  ALL_BOOKS,
  ALL_GENRES,
  ALL_BOOKS_BY_GENRE,
  BOOK_ADDED,
} from "../queries";
import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

export const updateCache = (cache, query, addedBook) => {
  console.log("updateCache", cache, query, addedBook);
  cache.updateQuery(query, ({ allBooks }) => {
    console.log("allBooks", allBooks);
    return {
      allBooks: allBooks.concat(addedBook),
    };
  });
};

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const FILTER_WITH_GRAPHQL = true;

  const result = useQuery(ALL_BOOKS);
  const [genres, setGenres] = useState(["all genres"]);
  const [selectedGenre, setSelectedGenre] = useState("all genres");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log(`${addedBook.title} added`);

      // only one will be needed depending on FILTER_WITH_GRAPHQL value
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      updateCache(
        client.cache,
        { query: ALL_BOOKS_BY_GENRE, variables: { genre: selectedGenre } },
        addedBook
      );
    },
  });

  const filteredBooks = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
  });

  if (result.loading || filteredBooks.loading) {
    return <div>loading...</div>;
  } else if (result.data.allBooks.length > 0) {
    result.data.allBooks.map((book) => {
      book.genres.map((genre) => {
        // find all genres for the book
        if (!genres.includes(genre)) {
          // avoid duplicates
          setGenres(genres.concat(genre));
        }
      });
    });
  }

  return (
    <div>
      <h2>books</h2>
      {genres.map((genre) => {
        return (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        );
      })}

      {!FILTER_WITH_GRAPHQL && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {result.data.allBooks.map((book) =>
              selectedGenre === "all genres" ? (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ) : (
                book.genres.includes(selectedGenre) && (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      )}

      {FILTER_WITH_GRAPHQL &&
        filteredBooks.data &&
        filteredBooks.data.allBooks.map((book) => {
          return (
            <div key={book.title}>
              {book.title} {book.author.name} {book.published}
            </div>
          );
        })}
    </div>
  );
};

export default Books;
