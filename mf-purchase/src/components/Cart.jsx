import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  ListGroup,
  Spinner,
  Container,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";

const tokenHeader = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return config;
};

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const config = tokenHeader();
        const response = await axios.get(
          "http://localhost:8082/api/cart/",
          config
        );
        const cartData = response.data;

        const productDetails = await Promise.all(
          cartData.cartItems.map(async (item) => {
            const productResponse = await axios.get(
              `http://localhost:8081/api/products/${item.productId}`
            );
            return { ...item, product: productResponse.data };
          })
        );

        setCart({ ...cartData, cartItems: productDetails });
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const clearCart = async () => {
    try {
      const config = tokenHeader();
      await axios.delete("http://localhost:8082/api/cart/clearCart", config);
      setCart(null);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const changeQuantity = async (cartItemId, quantity) => {
    try {
      const config = tokenHeader();
      await axios.patch(
        `http://localhost:8082/api/cart/${cartItemId}/quantity/${quantity}`,
        {},
        config
      );

      // Refresh cart data
      const response = await axios.get(
        "http://localhost:8082/api/cart/",
        config
      );
      const cartData = response.data;

      const productDetails = await Promise.all(
        cartData.cartItems.map(async (item) => {
          const productResponse = await axios.get(
            `http://localhost:8081/api/products/${item.productId}`
          );
          return { ...item, product: productResponse.data };
        })
      );

      setCart({ ...cartData, cartItems: productDetails });
    } catch (error) {
      console.error("Error changing quantity:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const placeOrder = (cartItemId = null) => {
    if (cartItemId) {
      const item = cart.cartItems.find(
        (item) => item.cartItemId === cartItemId
      );
      setSelectedCartItem(item);
    } else {
      setSelectedCartItem(null);
    }
    handleShowModal();
  };

  const confirmOrder = async (cartItemId = null) => {
    try {
      const config = tokenHeader();
      const data = cartItemId ? { cartItemList: [cartItemId] } : {};
      await axios.post("http://localhost:8082/api/order/", data, config);
      // Optionally, clear the cart after placing the order
      setCart(null);
      handleCloseModal();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!cart) {
    return <div>Your cart is empty.</div>;
  }

  const totalAmount = cart.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            {cart.cartItems.map((item) => (
              <ListGroup.Item
                key={item.cartItemId}
                className="d-flex align-items-center"
              >
                <Card className="w-100">
                  <Row noGutters>
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={item.product.imageURL}
                        alt={item.product.name}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{item.product.name}</Card.Title>
                        <Card.Text>
                           Price: ₹{item.product.price} <br />
                           Discount: {item.discount}%
                        </Card.Text>
                        <Form inline>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              changeQuantity(item.cartItemId, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          {" "}{item.quantity} {" "}
                          
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              changeQuantity(item.cartItemId, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </Form>
                        <Button
                          variant="success"
                          className="mt-2"
                          onClick={() => placeOrder(item.cartItemId)}
                        >
                          Buy Now
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text>Total Amount: ₹{totalAmount}</Card.Text>
              <Button variant="success" onClick={() => placeOrder()}>
                Place Order for Whole Cart
              </Button>
              <br/>
              <Button variant="danger" className="mt-2" onClick={clearCart}>
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Your Order</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row>
      <Col md={6}>
        <ListGroup>
          {selectedCartItem ? (
            <Card className="mb-3 shadow-sm rounded">
              <ListGroup.Item key={selectedCartItem.cartItemId}>
                <Row>
                  <Col md={4}>
                    <img
                      src={selectedCartItem.product.imageURL}
                      alt={selectedCartItem.product.name}
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={8}>
                    <h5>{selectedCartItem.product.name}</h5>
                    <p>Price: ₹{selectedCartItem.product.price}</p>
                    <p>Quantity: {selectedCartItem.quantity}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Card>
          ) : (
            cart.cartItems.map((item) => (
              <Card className="mb-3 shadow-sm rounded" key={item.cartItemId}>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <img
                        src={item.product.imageURL}
                        alt={item.product.name}
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col md={8}>
                      <h5>{item.product.name}</h5>
                      <p>Price: ₹{item.product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </Card>
            ))
          )}
        </ListGroup>
      </Col>
      <Col md={6}>
        <p>Total Amount: ₹{totalAmount}</p>
       
        <Button
          variant="success"
          className="ml-2"
          onClick={() =>
            confirmOrder(
              selectedCartItem ? selectedCartItem.cartItemId : null
            )
          }
        >
          Confirm Order
        </Button>
        <br/>
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
      </Col>
    </Row>
  </Modal.Body>
</Modal>    </Container>
  );
};

export default Cart;
