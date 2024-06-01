import { useEffect } from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { showNotificationWithTimeout } from "./reducers/notificationReducer";
import { initialiseBlog } from "./reducers/blogReducer";
import { initialiseUser, logoutOnServer } from "./reducers/userReducer";
import { initialiseAllUsers } from "./reducers/usersReducer";
import { Routes, Route } from "react-router-dom";

import Users from "./components/UsersView";
import User from "./components/UserView";
import Home from "./components/Home";
import Notification from "./components/Notification";
import Login from "./components/Login";
import BlogView from "./components/BlogView";
import Menu from "./components/Menu";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialiseUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlog());
      dispatch(initialiseAllUsers());
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
      <Menu user={user} handleLogout={handleLogout}/>
      <h2>blog app</h2>
      <Notification />
      

      <Routes>
        <Route path="/users" element={<Users users={users}/>}></Route>
        <Route path="/users/:id" element={<User users={users}/>}></Route>
        <Route path="/" element={<Home user={user} />}></Route>
        <Route path="/blogs/:id" element={<BlogView blogs={blogs}/>}></Route>
      </Routes>
    </>
  );
};

export default App;
