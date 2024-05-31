import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlogFromServer, updateBlogLike } from "../reducers/blogReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const Blog = ({ blog, currentUserId }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 15,
    borderColor: "#DCDCDC",
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const viewVisibility = () => {
    setVisible(!visible);
  };

  const handleUpdateBlogLikes = (event) => {
    event.preventDefault();
    dispatch(updateBlogLike(blog.id));
  };

  const handleDeleteBlog = async (event) => {
    event.preventDefault();
    console.log("delete!", blog.id);

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlogFromServer(blog.id));

      dispatch(
        showNotificationWithTimeout(
          `successfully deleted ${blog.title} by ${blog.author}!`,
          5000
        )
      );
    }
  };

  const showDeleteButton = () => {
    if (
      blog.user &&
      (currentUserId === blog.user || currentUserId === blog.user.id)
    ) {
      return <button onClick={handleDeleteBlog}>delete</button>;
    }
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blog-default-view">
        <p>
          {blog.title} {blog.author}
          <button onClick={viewVisibility}>View</button>
        </p>
      </div>

      <div style={showWhenVisible} className="blog-hide-content">
        <p>
          {blog.title} <button onClick={viewVisibility}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p data-testid="likes">
          {blog.likes} <button onClick={handleUpdateBlogLikes}>like</button>
        </p>
        <p>{blog.author}</p>
        {showDeleteButton()}
      </div>
    </div>
  );
};

export default Blog;
