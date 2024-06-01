import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlogFromServer } from "../reducers/blogReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const Blog = ({ blog, currentUserId }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    textDecoration: 'none' 
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
    <div>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        action 
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold fs-5">
            <Link to={`/blogs/${blog.id}`} style={blogStyle}>{blog.title}</Link>
          </div>
          <div className="justify-content-end">
          {blog.author}   
          </div>
        </div>
      </ListGroup.Item>
    </div>
  );
};

export default Blog;
