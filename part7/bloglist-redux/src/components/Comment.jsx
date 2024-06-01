import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearComment, initialiseComments } from "../reducers/commentsReducer";

import ListGroup from "react-bootstrap/ListGroup";

const Comment = ({ blog }) => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearComment());

    const getAllCommentById = async (id) => {
      dispatch(initialiseComments(id));
    };

    getAllCommentById(blog.id);
  }, []);

  return (
    <div className="mt-4">
      <p className="mt-3 mb-3 ms-2 fw-semibold fs-5">Comments</p>
      {comments && comments.length > 0 ? (
        <ListGroup as="ol">
          {comments.map((c) => (
            <ListGroup.Item as="li" key={c.id} action>
              {c.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="fw-light ms-2 fs-8 text-muted">No comment</p>
      )}
    </div>
  );
};

export default Comment;
