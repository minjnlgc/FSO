import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlogLike } from "../reducers/blogReducer";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  const handleUpdateBlogLikes = (event) => {
    event.preventDefault();
    dispatch(updateBlogLike(blog.id));
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="display-6 mb-4">{blog.title}</Card.Title>
          <Card.Text>
            <a href={`${blog.url}`}>{blog.url}</a>
          </Card.Text>
          <Card.Text>
            {`${blog.likes} likes`}{" "}
            <Button variant="danger" size='sm' onClick={handleUpdateBlogLikes} className="ms-3">
              like
            </Button>
          </Card.Text>
          <Card.Text>{`added by ${blog.author}`}</Card.Text>
        </Card.Body>
      </Card>

      <CommentForm blog={blog}/>
      <Comment blog={blog}/>
    </div>
  );
};
export default BlogView;
