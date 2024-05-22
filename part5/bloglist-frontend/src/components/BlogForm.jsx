import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreateNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    await handleCreateNewBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          title
          <input
            data-testid='title'
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid='author'
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid='url'
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={addBlog}>create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreateNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
