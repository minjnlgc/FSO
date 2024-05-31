import { useEffect, useRef } from "react";
import "./App.css";

import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationWithTimeout } from "./reducers/notificationReducer";
import { initialiseBlog } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import { initialiseUser, logoutOnServer } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initialiseUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlog());
    }
  }, [user]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutOnServer());
    dispatch(showNotificationWithTimeout("logout successfully!", 5000));
    console.log("logout");
  };

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </>
    );
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>{" "}
        </p>

        <Togglable label="new note" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>

        <br />
        <BlogList user={user} />
      </div>
    </>
  );
};

export default App;
