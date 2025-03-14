import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import {
  FaPlus,
  FaMinus,
  FaGift,
  FaTshirt,
  FaMobileAlt,
  FaLeaf,
  FaGlobe,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { addToCart } from "../../api/api";

const Pdp = () => {
  const location = useLocation();
  const url = location.pathname;

  const match = url.match(/\/product\/(\d+)/);
  const productId = match ? match[1] : null;

  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState(1);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const getProduct = async () => {
    const response = await axios.get(
      `http://localhost:8081/api/products/${productId}`
    );
    setProduct(response.data);
  };

  const handleAddToCart = async (productId) => {
    try {
      console.log("ADDING TO CART");
      await addToCart(productId, quantities);
      toast.success("Added to cart successfully!!")
    } catch (error) {
      toast.error("Error adding to cart. Make sure you are logged in.")
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    getProduct();
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) return <div>Loading...</div>;

  const discountPrice =
    product.category === "GIFT_SETS" ? product.price * 0.9 : product.price;

  const handleQuantityChange = (quantity) => {
    setQuantities((prev) => Math.max(1, prev + quantity));
  };

  const handleQuantityInputChange = (event) => {
    let value = event.target.value;
    setQuantities("")
    if(!isNaN(value)){
    const quantity = Math.max(1, Number(value));
    setQuantities(quantity);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "GIFT_SETS":
        return <FaGift className="me-2" />;
      case "CLOTHING":
        return <FaTshirt className="me-2" />;
      case "ELECTRONICS":
        return <FaMobileAlt className="me-2" />;
      default:
        return null;
    }
  };

  function calculateTimeLeft() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const difference = midnight - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  return (
    <Container className="mt-5 mb-5">
      <ToastContainer/>
      <Row>
        <Col md={5}>
          <Image
            src={product.imageURL}
            alt={product.name}
            className="rounded img-fluid h-75"
          />
        </Col>
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                {product.name}
                {product.category === "GIFT_SETS" && (
                  <Badge bg="success" className="ms-2 fst-italic">
                    10% OFF
                  </Badge>
                )}

                <Badge bg="danger" className="ms-2">
                  Limited Stock
                </Badge>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {product.brand}
              </Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>
                Category: {getCategoryIcon(product.category)} {product.category}
              </Card.Text>
              {product.category === "GIFT_SETS" ? (
                <h4>
                  Price: <del>₹{product.price}</del>{" "}
                  <span className="text-success">
                    ₹{discountPrice.toFixed(2)}
                  </span>
                </h4>
              ) : (
                <h4>Price: ₹{product.price}</h4>
              )}
              <Card.Text className="text-danger">
                Hurry! Price goes up in: {timeLeft.hours}h {timeLeft.minutes}m{" "}
                {timeLeft.seconds}s
              </Card.Text>

              {product.customFields &&
                Object.keys(product.customFields).length > 0 && (
                  <div className="mt-3">
                    <h5>Additional Information:</h5>
                    <ul>
                      {Object.entries(product.customFields).map(
                        ([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              <Row className="mt-4">
                <Col md={6} className="text-center px-2">
                  <FaCheckCircle size={30} className="text-success" />
                  <p>No Artificial Flavour</p>
                </Col>
                <Col md={6} className="text-center">
                  <FaTimesCircle size={30} className="text-success" />
                  <p>No Tea Dust</p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6} className="text-center">
                  <FaLeaf size={30} className="text-success" />
                  <p>Whole Leaf Tea</p>
                </Col>
                <Col md={6} className="text-center">
                  <FaGlobe size={30} className="text-success" />
                  <p>Worldwide Delivery</p>
                </Col>
              </Row>
              <div className="d-flex justify-content-center align-items-center gap-2 my-3">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <FaMinus />
                </Button>
                <input
                  type="text"
                  value={quantities}
                  onChange={handleQuantityInputChange}
                  // onChange={(e) => handleQuantityInputChange(e.target.value)}
                  className="form-control text-center"
                  style={{ width: "60px" }}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                >
                  <FaPlus />
                </Button>
              </div>
              <Button
                variant="success"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product.id);
                }}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Pdp;
