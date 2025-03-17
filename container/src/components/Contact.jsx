import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Card, Container, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="position-relative">
        <img
          src="https://www.teacupsfull.com/cdn/shop/files/Bestseller.png?v=1674038527&width=1920"
          height="200"
          className="img-fluid w-100"
          alt="Contact Us"
          style={{ objectFit: "cover", filter: "brightness(70%)" }}
        />
        <div className="overlay-text position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-white display-4 fw-bold">CONTACT US</h1>
        </div>
      </div>

      <Container className="py-4">
        {/* Store Address */}
        <Row className="py-4">
          <Col md={6} className="mx-auto">
            <Card className="p-4 shadow border-0 text-center">
              <h2 className="fw-bold">📍 Store Address</h2>
              <p className="text-muted">Bengaluru, India</p>
              <p>
                <strong>🕒 Store Timing:</strong> 10 AM - 8 PM
              </p>
            </Card>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-4">
          {/* Google Map */}
          <Col>
            <Card className="shadow border-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995410.0565678026!2d76.44798429703184!3d12.951329605439055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1741848732791!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Store Location"
              ></iframe>
            </Card>
          </Col>

          {/* Contact Details */}
          <Col>
            <Card className="p-4 shadow border-0">
              <h2 className="fw-bold">Get in Touch!</h2>
              <p className="text-muted">
                Have any questions? Feel free to contact us. We usually respond
                within 24 hours on weekdays.
              </p>
              <hr />
              <p>
                <strong>📞 Phone:</strong> +91 9781265646
              </p>
              <p>
                <strong>🕒 Timing:</strong> 10 AM - 7 PM (Mon - Sat)
              </p>
              <p>
                <strong>📧 Email:</strong>{" "}
                <a href="mailto:sales@teatreats.com">sales@teatreats.com</a>
              </p>
              <a href="mailto:sales@teatreats.com?subject=Regarding Sales Query">

              <Button variant="success" className="mt-2 w-100" >
                Contact Us
                </Button>
                </a>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
