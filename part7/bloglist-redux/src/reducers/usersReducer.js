import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const initialiseAllUsers = () => {
    return async (dispatch) => {
        const allUsers = await userService.getAll();
        dispatch(setUsers(allUsers));
        console.log(allUsers);
    }
}