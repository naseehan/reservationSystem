import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// chakra ui for avatar
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

function ReactNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">Paradise Hotel</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">About Us</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Nav>
            <AvatarGroup spacing=".5rem">
              {/* <Avatar bg='red.500' icon={<AiOutlineUser fontSize='1.5rem' />} /> */}
              <Avatar size="sm" bg="teal.500" />
            </AvatarGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ReactNavbar;
