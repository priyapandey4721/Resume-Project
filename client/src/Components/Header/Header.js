import React from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { MdAssignment } from "react-icons/md";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#home" id="heading">
            React CV Builder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="#home" id="heading1">
                Home
              </Nav.Link>
              <Nav.Link href="#link" id="heading1">
                Link
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown id="basic-nav-dropdown">
                <NavDropdown.Item href="login" id="navdropdown-title">
                  Login <BiLogIn />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="register" id="navdropdown-title">
                  Register <MdAssignment />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
