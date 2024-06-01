import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

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

    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Card className="mt-4">
      <Card.Body>
        <Card.Title>Create new blog</Card.Title>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            data-testid="title"
            type="text"
            name="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            data-testid="author"
            type="text"
            name="Author"
            value={author}
            onChange={handleAuthorChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            data-testid="url"
            type="text"
            name="Url"
            value={url}
            onChange={handleUrlChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleCreateNewBlog}>
          Create
        </Button>
      </Form>
      </Card.Body>
    </Card>
    </div>
  );
};

export default BlogForm;
