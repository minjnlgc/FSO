import { useEffect, useState } from "react";

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, currentUserId }) => {
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

  const updateBlogLikes = async (event) => {
    event.preventDefault();
    await handleUpdateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
  };

  const deleteBlog = async (event) => {
    event.preventDefault();
    console.log('delete!', blog.id);
    
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await handleDeleteBlog(blog.id);
    }
  }

  const showDeleteButton = () => {
    if (blog.user && (currentUserId === blog.user || currentUserId === blog.user.id)) {
     return (<button onClick={deleteBlog}>delete</button>)
    }
  }

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
          {blog.likes} <button onClick={updateBlogLikes}>like</button>
        </p>
        <p>{blog.author}</p>
        {showDeleteButton()}
      </div>
    </div>
  );
};

export default Blog;
