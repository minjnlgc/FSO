import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import { useRef } from "react";

const Home = ({ user }) => {
  const blogFormRef = useRef();

  return (
    <div>
      <div>
        <Togglable label="new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>

        <br />
        <BlogList user={user} />
      </div>
    </div>
  );
};

export default Home;
