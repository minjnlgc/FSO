import { createSlice } from "@reduxjs/toolkit";
import storage from "../services/storage";
import blogService from "../services/blogs";
import loginService from "../services/login";

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
    const user = await loginService.login(credentials);
    storage.saveUser(user);
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const logoutOnServer = () => {
  return async (dispatch) => {
    storage.removeUser();
    dispatch(setUser(null));
  };
};
