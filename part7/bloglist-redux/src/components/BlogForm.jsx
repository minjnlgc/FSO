import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    dispatch(createBlog(newBlog));
    dispatch(
      showNotificationWithTimeout(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        5000
      )
    );

    setTitle("");
    setAuthor("");
    setUrl("");
    
    blogFormRef.current.toggleVisibility()
  };

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            name="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            name="Author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="text"
            name="Url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button onClick={handleCreateNewBlog}>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
