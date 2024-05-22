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
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title-input'
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author-input'
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url-input'
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
