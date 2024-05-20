import { useEffect, useRef, useState } from "react";
import "./App.css";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notificationMsg, setNotificationMsg] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    const getBlogs = async () => {
      if (user !== null) {
        const returnedBlogs = await blogService.getAll();
        setBlogs(returnedBlogs);
        console.log("fetched blogs!");
      }
    };

    getBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      console.log(user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      setNotificationMsg("login successfully!");
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);

      console.log("login!");
    } catch (exception) {
      setNotificationMsg(exception.response.data.error);
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);

      console.log("Wrong credentials!");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    console.log("logout");

    setNotificationMsg("logout successfully!");
    setTimeout(() => {
      setNotificationMsg("");
    }, 5000);
  };

  const handleCreateNewBlog = async (newBlogObject) => {
    try {
      const newBlog = await blogService.create(newBlogObject);
      const newBlogs = blogs.concat(newBlog);
      setBlogs(newBlogs);

      setNotificationMsg(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);

      blogFormRef.current.toggleVisibility();

      console.log("new blog created!");

    } catch (exception) {
      setNotificationMsg(exception.response.data.error);
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);

      console.log("error creating new blog!");
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={notificationMsg} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );

  if (user === null) {
    return loginForm();
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMsg} />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>{" "}
        </p>

        <Togglable label='new note' ref={blogFormRef}>
          <BlogForm handleCreateNewBlog={handleCreateNewBlog} />
        </Togglable>

        <br />        

        {blogs.map((b) => (
          <Blog key={b.id} blog={b} />
        ))}
      </div>
    </>
  );
}

export default App;
