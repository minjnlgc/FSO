import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showNotificationWithTimeout  = (content, time) => {
    return (dispatch) => {
        dispatch(setNotification(content));
        setTimeout(() => {
            dispatch(setNotification(''));
        }, time)
    }
}