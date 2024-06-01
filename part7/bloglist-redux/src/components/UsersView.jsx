import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

const Users = ({ users }) => {
  return (
    <div>
      <h2 className="display-6 mt-3 mb-4 ms-2">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.name}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
