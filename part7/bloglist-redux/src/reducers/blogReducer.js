import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
    likeBlog(state, action) {
      const likedBlog = action.payload;
      return state.map((b) => (b.id !== likedBlog.id ? b : likedBlog));
    },
    removeBlogFromState(state, action) {
      const deletedBlog = action.payload;
      return state.reduce((acc, blog) => {
        if (blog.id !== deletedBlog.id) {
          acc.push(blog);
        }
        return acc;
      }, []);
    },
  },
});

export const { setBlog, addBlog, likeBlog, removeBlogFromState } =
  blogSlice.actions;
export default blogSlice.reducer;

export const initialiseBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch(addBlog(blog));
  };
};

export const updateBlogLike = (id) => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find((n) => n.id === id);

    const likedBlog = await blogService.update(id, {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    });
    dispatch(likeBlog(likedBlog));
  };
};

export const deleteBlogFromServer = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id);
    console.log(deletedBlog);

    dispatch(removeBlogFromState(deletedBlog));
  };
};
