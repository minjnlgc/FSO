import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

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

  return (
    <div style={blogStyle}>
      <p style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={viewVisibility}>View</button>
      </p>

      <div style={showWhenVisible}>
        <p>
          {blog.title} <button onClick={viewVisibility}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button>like</button>{" "}
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
