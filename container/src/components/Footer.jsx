import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center text-lg-start">
      <Container className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">TEA TREATS</h5>
            <p>
              Enjoy the finest selection of teas and treats from around the world.
            </p>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#home" className="text-white">Home</a>
              </li>
              <li>
                <a href="#products" className="text-white">Products</a>
              </li>
              <li>
                <a href="#contact" className="text-white">Contact</a>
              </li>
              <li>
                <a href="#about" className="text-white">About Us</a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="mailto:info@teatreats.com" className="text-white">info@teatreats.com</a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-white">+1 234 567 890</a>
              </li>
              <li>
                <a href="#location" className="text-white">Our Location</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <a href="https://www.facebook.com" className="text-white me-4">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.twitter.com" className="text-white me-4">
              <FaTwitter size={30} />
            </a>
            <a href="https://www.instagram.com" className="text-white">
              <FaInstagram size={30} />
            </a>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: '#2e524a' }}>
        © 2025 TEA TREATS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;