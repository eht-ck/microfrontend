import React from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
 
 import AboutImage from "../../public/assets/img1.jpg"; 

const About = () => {
  return (
    <Container className="my-5">
      <Card className="border-0 shadow-lg p-4" style={{ backgroundColor: "#e8f5e9" }}>
        <Row className="align-items-center">
           <Col md={6} className="text-center text-md-start p-4">
            <Card.Body>
              <h2 className="font-italic text-success text-center">About Us 🍃</h2>
              <p className=" text-black mt-3">
                At <strong>TeaTreats</strong>, we bring you the purest, most authentic tea experience.  
                Our carefully selected organic, ethically sourced teas ensure every sip is refreshing and nourishing. 🍵  
              </p>
              <hr className="border-success opacity-50 w-50 mx-auto mx-md-0" />
              <p className="fs-6 text-muted">
                <ul>
                  <li>🌱 Sustainable & Organic</li>
                  <li>🌍 Eco-Friendly Packaging</li>
                  <li>🏆 Premium Quality</li>
                </ul>
              </p>
            </Card.Body>
          </Col>

           <Col md={6} className="d-flex justify-content-center">
            <Image src={AboutImage} alt="Tea Image" fluid rounded className="shadow w-200 h-100" />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default About;
