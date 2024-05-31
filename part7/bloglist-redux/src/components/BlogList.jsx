import { useSelector } from "react-redux";
import Blog from "./Blog";
import { useMemo } from "react";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  return (
    <div>
      {sortedBlogs.map((b) => (
        <Blog key={b.id} blog={b} currentUserId={user.id} />
      ))}
    </div>
  );
};

export default BlogList;
