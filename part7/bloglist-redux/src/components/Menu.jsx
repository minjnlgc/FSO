import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const Menu = ({ user, handleLogout }) => {
  const style = {
    paddingRight: 5,
    textDecoration: "none",
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Blog App</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={style}>
              blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users" style={style}>
              users
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user.name} logged in{" "}
              <Button
                variant="outline-secondary"
                onClick={handleLogout}
                className="ms-2 mb-1"
              >
                logout
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;
