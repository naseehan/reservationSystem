import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../stylePages/navbar/App.css'

function TextLinkExample() {
  return (
    <Navbar bg="dark"  expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">Paradise Hotel</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/rooms">Rooms</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cart" style={{ cursor: "pointer", marginRight: "2%" }}>
              <FontAwesomeIcon icon={faCartShopping} />
            </Nav.Link>
            <Navbar.Text>
              Signed in as: <Link to="/dashboard">Admin</Link>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
