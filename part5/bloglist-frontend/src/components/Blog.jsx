import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const [blogState, setBlogState] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    // adds one like to the blog post in the database and updates the state of the blog post
    const updatedBlog = {
      ...blog,
      user: blogState.user.id,
      likes: blogState.likes + 1,
    };
    blogService.update(blogState.id, updatedBlog).then((res) => {
      setBlogState(res);
    });
  };

  const handleDelete = () => {
    blogService.remove(blogState.id).then(() => {
      setBlogState(null);
    });
  };

  return (
    <div>
      {blogState && (
        <div style={blogStyle}>
          {blogState.title} {blogState.author}
          <button
            onClick={() => {

              setVisible(!visible);
            }}
          >
            {visible ? "hide" : "view"}
          </button>
          <div
            style={
              visible
                ? { display: "flex", flexDirection: "column" }
                : { display: "none" }
            }
          >
            <div>
              {blogState.likes} <button onClick={handleLike}>like</button>
            </div>
            <div> {blogState.url}</div>
            <div>{blogState.user.name ?? user.name}</div>

            {blogState.user.name === user.name && (
              <button onClick={handleDelete}>delete</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
