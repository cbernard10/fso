import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [newBlog, setNewBlog] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const [message, setMessage] = useState({ text: null, type: "success" });

  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((res) => {
      setBlogFormVisible(false);
      setBlogs(blogs.concat(res));
      setNewBlog("");
      setNewAuthor("");
      setNewUrl("");
      setMessage({ text: "Blog added", type: "success" });
      setTimeout(() => {
        setMessage({ text: null, type: "success" });
      }, 5000);
    });
  };

  const handleBlogChange = (event) => {
    console.log(event.target.value);
    setNewBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewUrl(event.target.value);
  };

  const blogForm = () => (
    <Togglable
      buttonLabel="new blog"
      visible={blogFormVisible}
      setVisible={setBlogFormVisible}
    >
      <BlogForm
        addBlog={addBlog}
        handleBlogChange={handleBlogChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        newBlog={newBlog}
        newAuthor={newAuthor}
        newUrl={newUrl}
        user={user}
      />
    </Togglable>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ text: "Wrong credentials", type: "error" });
      setTimeout(() => {
        setMessage({ text: null, type: "success" });
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogListUser");
      setUser(null);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("could not logout.");
    }
  };

  return (
    <div>
      <Notification message={message.text} type={message.type} />
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {/* {blogs.map((blog) => (
            <div key={blog.id} style={{display: "flex", gap: "12px" }}>
              <Blog key={blog.id} blog={blog} user={user} />

            </div>
          ))} */}
          <BlogList blogs={blogs.sort((a,b) => b.likes - a.likes)} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
