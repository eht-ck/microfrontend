import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import order from "../../public/assets/order.gif"; // Adjust the path as needed

const OrderPlaced = () => {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={5} className="d-flex justify-content-center">
          <Image src={order} fluid />
        </Col>
        <Col md={7}>
          <FaCheckCircle size={100} color="green" />
          <h2 className="mt-3" style={{ color: "#2E7D32" }}>
            Order Successful!
          </h2>
          <p className="lead">Your order will reach you within 2 days.</p>
          <p className="lead">
            Track your order details in the order section in your profile!!!!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPlaced;
