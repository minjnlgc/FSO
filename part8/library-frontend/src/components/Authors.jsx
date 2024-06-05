import { useQuery } from "@apollo/client";
import BirthForm from "./BirthForm";

import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  let authors = [];
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>is loading</div>;
  }

  if (result.data) {
    authors = result.data.allAuthors;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthForm authors={authors}/>
    </div>
  );
};

export default Authors;
