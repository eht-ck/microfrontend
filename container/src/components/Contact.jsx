import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Col, Row, Card} from "react-bootstrap"
const Contact = () => {
  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="position-relative">
              <img
                src="https://www.teacupsfull.com/cdn/shop/files/Bestseller.png?v=1674038527&width=1920"
                height="150"
                className="img-fluid full-width-image"
                alt="Contact Us"
              />
              <div className="overlay-text d-flex justify-content-center align-items-center">
                <h1 className="text-white display-4">CONTACT US</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 p-2">
          <div className="col-md-6 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995410.0565678026!2d76.44798429703184!3d12.951329605439055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1741848732791!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
          <Col md={6}>
          <h2 className="fw-bold">Get in Touch!</h2>
          <p className="text-muted">
            For any queries, please do not hesitate to contact us. We aim to answer all inquiries sent via the contact form within 24 hours. However, please allow 48 hours over weekends and busy periods.
          </p>
 
          <Card className="p-3 mb-4 shadow-sm">
            <p>
              <strong>Phone:</strong> +91 9781265646
            </p>
            <p>
              <strong>Timing:</strong> 10 AM - 7 PM (Monday - Saturday)
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:sales@teatreats.com">sales@teatreats.com</a>
            </p>
          </Card>
 
          <h2 className="fw-bold mt-4">Store Address</h2>
          <Card className="p-3 shadow-sm">
            <p className="text-muted mb-1">Bengaluru, India</p>
            <p>
              <strong>Timing:</strong> 10 AM - 8 PM
            </p>
          </Card>
        </Col>
        </div>
      </div>
    </>
  );
};

export default Contact;
