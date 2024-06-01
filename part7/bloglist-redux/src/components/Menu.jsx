import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>{" "}
      </p>
    </div>
  );
};

export default Menu;
