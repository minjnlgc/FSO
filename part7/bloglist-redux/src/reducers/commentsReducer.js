import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    addComment(state, action) {
      return state.concat(action.payload);
    },
    clearComment(state, action) {
      return []
    }
  },
});

export const { setComments, addComment, clearComment } = commentsSlice.actions;
export default commentsSlice.reducer;

export const initialiseComments = (id) => {
  return async (dispatch) => {
    const allComments = await commentService.getAll(id);
    dispatch(setComments(allComments));
  };
};

export const createCommentOnServer = (id, newComment) => {
  return async (dispatch) => {
    const comment = await commentService.create(id, newComment);
    dispatch(addComment(comment));
  }
}
