import { useState } from "react";
import { loginOnServer } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginOnServer({ username, password }));
    setPassword("");
    setUsername("");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
