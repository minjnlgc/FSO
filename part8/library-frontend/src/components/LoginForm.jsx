import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage }) => {
  if (!show) {
    return null;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
        console.log(error.graphQLErrors[0].message);
    }
  })

  useEffect(() => {
    if (result.data) {
        const token = result.data.login.value;
        setToken(token);
        console.log(token);
        localStorage.setItem('library-user-token', token);

        setPage('authors');
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } })

    console.log('result:', result);

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
