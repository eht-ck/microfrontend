import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaSearch, FaSignInAlt } from 'react-icons/fa';
import '../index.css';
import './Header.css';

export default function Header() {
  return (
    <Navbar bg="light" data-bs-theme="light" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fst-italic brand-color mx-auto">TEA TREATS 🍃</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Products</Nav.Link>
            <Nav.Link href="#features">Contact</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center gap-3">
          <Nav.Link href="#search"><FaSearch /></Nav.Link>
          <Nav.Link href="#cart"><FaShoppingCart /></Nav.Link>
          <Nav.Link href="#signin"><FaSignInAlt /></Nav.Link>
        </div>
      </Container>
    </Navbar>
  );
}
