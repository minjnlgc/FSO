import { useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Card className="mt-3">
        <Card.Title className="display-6 mb-4 ms-3 mt-3">
          {user.name}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted ms-3">
          Added blogs:
        </Card.Subtitle>
        <ListGroup variant="flush" className="ms-1">
          {user.blogs.map((b) => {
            return (
              <ListGroup.Item action key={b.id}>
                {b.title}
              </ListGroup.Item>
            );
          })}
          <br />
        </ListGroup>
      </Card>
    </div>
  );
};

export default User;
