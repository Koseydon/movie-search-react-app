import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Movie Search</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/favorites">Favorites</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);
