import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaShoppingCart,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "../index.css";
import "./Header.css";
import { GrUserAdmin } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg="light" data-bs-theme="light" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="fst-italic brand-color mx-auto">
          TEA TREATS 🍃
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Products</Nav.Link>
            <Nav.Link href="#features">Contact</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center gap-3">
          <Nav.Link href="#search">
            <FaSearch />
          </Nav.Link>
          <Nav.Link href="/admin">
            <GrUserAdmin />
          </Nav.Link>

          {isLoggedIn ? (
            <Nav.Link href="#cart">
              <FaShoppingCart />
            </Nav.Link>
          ) : (
            <Nav.Link href="/signup"> SignUp</Nav.Link>
          )}
          {isLoggedIn ? (
            <Nav.Link href="#logout" onClick={handleLogout}>
              <FaSignOutAlt /> LOGOUT
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">
              <FaSignInAlt /> LOGIN{" "}
            </Nav.Link>
          )}
          {isLoggedIn ? (
            <Nav.Link href="/user">
              <FaRegUserCircle />
            </Nav.Link>
          ) : (
            ""
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
