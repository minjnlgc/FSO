import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTH } from "../queries";

const BirthForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    console.log(name, born);

    changeBorn({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <label>
          authors:
          <select
            name="selectedAuthor"
            onChange={({ target }) => setName(target.value)}
            value={name}
          >
            <option value="">Select an author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <div>
          born{" "}
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
