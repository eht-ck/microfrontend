import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutTeaTreats = () => {
  return (
    <div className="bg-dark text-white py-5" style={{ backgroundImage: "url('https://teagritty.com/cdn/shop/articles/tg_c9.png?v=1740640337')", backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <div className="p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
              <h1 className="display-4">About Tea Treats</h1>
              <p className="lead">
                Welcome to Tea Treats! We are dedicated to bringing you the finest teas from around the world. Our mission is to provide high-quality, sustainably sourced teas that delight your senses and promote well-being.
              </p>
              <p className="lead">
                At Tea Treats, we bring you the purest, most authentic tea experience. Our carefully selected organic, ethically sourced teas ensure every sip is refreshing and nourishing. 🍵
              </p>
              <ul className="list-unstyled">
                <li>🌱 Sustainable & Organic</li>
                <li>🌍 Eco-Friendly Packaging</li>
                <li>🏆 Premium Quality</li>
              </ul>
              
              <p className="lead">
                Join us on a journey to discover the rich flavors and health benefits of our teas. Whether you're a seasoned tea enthusiast or just beginning your tea journey, we have something special for everyone.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutTeaTreats;