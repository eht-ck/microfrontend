import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
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
            <Nav.Link href="/product">Products</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/aboutus">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn && (
            <Nav.Link href="/admin">
              <GrUserAdmin />
            </Nav.Link>
          )}

          {isLoggedIn ? (
            <Nav.Link href="/cart">
              <FaShoppingCart />
            </Nav.Link>
          ) : (
            <Nav.Link href="/signup" className="btn">
              SignUp
            </Nav.Link>
          )}
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout} className="btn">
              <FaSignOutAlt /> Logout
            </Nav.Link>
          ) : (
            <Nav.Link href="/login" className="btn ">
              <FaSignInAlt /> Login
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
