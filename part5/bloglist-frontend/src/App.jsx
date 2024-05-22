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

        returnedBlogs.sort((a, b) => b.likes - a.likes);

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

      console.log("newBlog:", newBlog);

      setNotificationMsg(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
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

  const handleUpdateBlog = async (id, updatedBlogObject) => {
    try {
      const updatedBlog = await blogService.update(id, updatedBlogObject);
      const updatedBlogs = blogs.map((blog) => {
        if (blog.id === id) {
          return { ...updatedBlog };
        }
        return blog;
      });

      setBlogs(updatedBlogs);

      console.log("updated blog!");
    } catch (exception) {
      setNotificationMsg(exception.response.data.error);
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);

      console.log("error updating blog!", exception.response.data.error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const deletedBlog = await blogService.remove(id);
      const blogsAfterDelete = blogs.reduce((acc, blog) => {
        if (blog.id !== deletedBlog.id) {
          acc.push(blog);
        }
        return acc;
      }, []);

      console.log(blogsAfterDelete);

      setBlogs(blogsAfterDelete);

      setNotificationMsg(
        `successfully deleted ${deletedBlog.title} by ${deletedBlog.author}!`,
      );
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setNotificationMsg(exception.response.data.error);
      setTimeout(() => {
        setNotificationMsg("");
      }, 5000);

      console.log("error deleting blog!", exception.response.data.error);
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
            data-testid='username'
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
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

        <Togglable label="new note" ref={blogFormRef}>
          <BlogForm handleCreateNewBlog={handleCreateNewBlog} />
        </Togglable>

        <br />

        {blogs.map((b) => (
          <Blog
            key={b.id}
            blog={b}
            handleUpdateBlog={handleUpdateBlog}
            handleDeleteBlog={handleDeleteBlog}
            currentUserId={user.id}
          />
        ))}
      </div>
    </>
  );
}

export default App;
