import { createSlice } from "@reduxjs/toolkit";
import storage from "../services/storage";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showNotificationWithTimeout } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const initialiseUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const loginOnServer = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      storage.saveUser(user);
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(showNotificationWithTimeout("Login successfully!", 5000));
    } catch (error) {
      dispatch(showNotificationWithTimeout("Invalid password or username!", 5000))
    }
  };
};

export const logoutOnServer = () => {
  return async (dispatch) => {
    storage.removeUser();
    dispatch(setUser(null));
  };
};
