import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentOnServer } from "../reducers/commentsReducer";

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCreateNewComment = async (event) => {
    event.preventDefault();
    const newComment = {
      content: content,
      blog: blog.id,
    };

    dispatch(createCommentOnServer(blog.id, newComment));
    setContent("");
  };

  return (
    <Form>
      <Row className="align-items-end mt-3" style={{ width: "40rem" }}>
        <Col xs={10}>
          <FloatingLabel controlId="floatingTextarea2" label="New comment">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={content}
              onChange={handleContentChange}
            />
          </FloatingLabel>
        </Col>
        <Col xs={2} className="d-flex align-items-end">
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={handleCreateNewComment}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CommentForm;
