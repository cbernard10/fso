import React from "react";
import Blog from "./Blog";

function BlogList({ blogs, user }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={{ display: "flex", gap: "12px" }}>
          <Blog key={blog.id} blog={blog} user={user} />
        </div>
      ))}
    </div>
  );
}

export default BlogList;
