import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlogLike } from "../reducers/blogReducer";

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
      <h2>{blog.title}</h2>
      <p>
        <a href={`${blog.url}`}>{blog.url}</a>
      </p>
      <p>
        {`${blog.likes} likes`}{" "}
        <button onClick={handleUpdateBlogLikes}>like</button>
      </p>
      <p>{`added by ${blog.author}`}</p>
    </div>
  );
};
export default BlogView;
