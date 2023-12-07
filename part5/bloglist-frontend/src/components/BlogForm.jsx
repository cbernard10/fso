import { useState } from "react";

const BlogForm = ({
  addBlog,
  handleBlogChange,
  handleAuthorChange,
  handleUrlChange,
  newBlog,
  newAuthor,
  newUrl,
  user
}) => {
  const [newNote, setNewNote] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <div>
      <h2>Create a new blog post</h2>

      <form onSubmit={addBlog}>
        <div>
          <span>title:</span>
          <input value={newBlog} onChange={handleBlogChange} />
        </div>

        <div>
          <span>author:</span>
          <input value={newAuthor} onChange={handleAuthorChange} />
        </div>

        <div>
          <span>url:</span>
          <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
