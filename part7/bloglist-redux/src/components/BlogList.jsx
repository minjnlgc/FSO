import { useSelector } from "react-redux";
import Blog from "./Blog";
import { useMemo } from "react";

import ListGroup from "react-bootstrap/ListGroup";


const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  return (
    <div>
      <ListGroup as="ul">
        {sortedBlogs.map((b) => (
          <Blog key={b.id} blog={b} currentUserId={user.id} />
        ))}
      </ListGroup>
    </div>
  );
};

export default BlogList;
