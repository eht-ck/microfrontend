import React from "react";
 import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart, FaSearch, FaSignInAlt } from 'react-icons/fa';
import '../index.css';
import './Header.css'
export default function Header() {
  return (
    <Navbar bg="light" data-bs-theme="light" sticky="top" >
      <Container>
        <Navbar.Brand href="#home" className="fst-italic brand-color "> TEA TREATS
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#home">Products</Nav.Link>
          <Nav.Link href="#features">Contact</Nav.Link>
          <Nav.Link href="#pricing">About Us</Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#search"><FaSearch /></Nav.Link>
          <Nav.Link href="#cart"><FaShoppingCart /></Nav.Link>
          <Nav.Link href="#signin"><FaSignInAlt /></Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}