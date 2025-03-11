import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Button, Card, Badge } from "react-bootstrap";
import { FaPlus, FaMinus, FaGift, FaTshirt, FaMobileAlt } from "react-icons/fa"; 
import { addToCart } from "../../api/api";

const Pdp = () => {
  const location = useLocation();
  const url = location.pathname;

  const match = url.match(/\/product\/(\d+)/);
  const productId = match ? match[1] : null;

  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState(1);

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
      alert("ADDED TO CART");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return <div>Loading...</div>;

  const discountPrice =
    product.category === "GIFT_SETS" ? product.price * 0.9 : product.price;

  const handleQuantityChange = (quantity) => {
    setQuantities((prev) => Math.max(1, prev + quantity)); 
  };

  const handleQuantityInputChange = (value) => {
    const quantity = Math.max(1, Number(value));
    setQuantities(quantity);
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

  return (
    <Container className="mt-5 mb-0">
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
                  <Badge bg="success" className="ms-2 fst-italic">10% OFF</Badge>
                )}
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
                  Price: <del>₹{product.price}</del> <span className="text-success">₹{discountPrice.toFixed(2)}</span>
                </h4>
              ) : (
                <h4>Price: ₹{product.price}</h4>
              )}

              {product.customFields && (
                <div className="mt-3">
                  <h5>Additional Information:</h5>
                  <ul>
                    {Object.entries(product.customFields).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="d-flex justify-content-center align-items-center gap-2 my-3">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <FaMinus />
                </Button>
                <input
                  type="number"
                  value={quantities}
                  onChange={(e) => handleQuantityInputChange(e.target.value)}
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
              <Button variant="success" className="w-100" onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product.id);
              }}>
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