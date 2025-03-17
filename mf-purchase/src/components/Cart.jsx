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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from 'react-icons/fa';
import emptycart from "../../public/assests/Empty.gif"
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

  const checkStock = async (cartItemId = null) => {
    try {
      const config = tokenHeader();
      const data = cartItemId ? { cartItemList: [cartItemId] } : {};
      const response = await axios.post(
        "http://localhost:8082/api/order/stockCheck",
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error checking stock:", error);
      return null;
    }
  };

  const changeQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;  

    try {
      const config = tokenHeader();
      await axios.patch(
        `http://localhost:8082/api/cart/${cartItemId}/quantity/${quantity}`,
        {},
        config
      );

      setCart((prevCart) => {
        const updatedCartItems = prevCart.cartItems.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        );
        return { ...prevCart, cartItems: updatedCartItems };
      });
    } catch (error) {
      console.error("Error changing quantity:", error);
    }
  };

  const deleteCartItem = async (cartItemId) => {
    try {
      const config = tokenHeader();
      await axios.patch(
        `http://localhost:8082/api/cart/${cartItemId}/quantity/0`,
        {},
        config
      );

      setCart((prevCart) => {
        const updatedCartItems = prevCart.cartItems.filter(
          (item) => item.cartItemId !== cartItemId
        );
        return { ...prevCart, cartItems: updatedCartItems };
      });
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const placeOrder = async (cartItemId = null) => {
    const outOfStockItems = await checkStock(cartItemId);
    console.log(outOfStockItems);
    if (outOfStockItems && outOfStockItems.length > 0) {
      toast.error(outOfStockItems);
      return;
    }

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
 

  const handleStripeCheckout = async () => {
    try {
      const config = tokenHeader();
      let placeOrderDTO;
      let finalPrice;
      if (!selectedCartItem) {
        placeOrderDTO = {
          cartItemList: cart.cartItems.map((item) => item.cartItemId),
        };
        finalPrice = totalAmount;
      } else {
        placeOrderDTO = {
          cartItemList: [selectedCartItem.cartItemId],
        };
        finalPrice =
          selectedCartItem.product.price *
          selectedCartItem.quantity *
          (1 - selectedCartItem.discount / 100);
      }

      const response = await axios.post(
        "http://localhost:8082/api/order/stripeCheckout",
        {
          name: "Total Cart",
          amount: finalPrice * 100,
          currency: "INR",
          quantity: 1,
          orderDataJson: JSON.stringify(placeOrderDTO),
        },
        config
      );

      window.location.href = response.data.sessionUrl;
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Container className="mt-4 mb-4">
        <Card className="text-center">
          <Card.Body>
           <img src={emptycart} height="400px" width="400px"/>
            <Card.Title>Your cart is empty</Card.Title>
            <Card.Text>
              Looks like you haven't added anything to your cart yet.
            </Card.Text>
            <Button variant="success" href="/product">
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  const totalAmount = cart.cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity * (1 - item.discount / 100),
    0
  );
  console.log(cart)

  return (
  
    <Container className="mt-4 overflow-auto">
      
      <ToastContainer />
      <h2 className="d-flex justify-content-center mb-1">Shopping Cart</h2>
      <Row>
        <Col md={8}  className="mb-2">
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
                          Price: ₹
                          {(
                            item.product.price *
                            (1 - item.discount / 100)
                          ).toFixed(2)}{" "}
                          <br />
                          Brand: {item.product.brand} <br />
                          Category: {item.product.category}
                        </Card.Text>
                        <Form inline>
                          Quantity:{" "}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              changeQuantity(item.cartItemId, item.quantity - 1)
                            }
                          >
                            -
                          </Button>{" "}
                          {item.quantity}{" "}
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
                          variant="danger"
                          className="mt-2 mx-2 "
                          onClick={() => deleteCartItem(item.cartItemId)}
                        >
                          Delete
                        </Button>
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
              <br />
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
            <Col md={7}>
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
                           
                            Price: ₹
                            {(
                              selectedCartItem.product.price *
                              (1 - selectedCartItem.discount / 100)
                            ).toFixed(2)}
                          <br/>
                          Quantity: {selectedCartItem.quantity}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Card>
                ) : (
                  cart.cartItems.map((item) => (
                    <Card
                      className="mb-3 shadow-sm rounded"
                      key={item.cartItemId}
                    >
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
                            <p>
                              Price: ₹
                              {(
                                item.product.price *
                                (1 - item.discount / 100)
                              ).toFixed(2)}
                             <br/>
                             Quantity: {item.quantity}</p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </Card>
                  ))
                )}
              </ListGroup>
            </Col>
            <Col md={5}>
              <div className="d-flex flex-column align-items-center">
                {selectedCartItem ? (
                  <>
                    <p>
                      Total Amount: ₹
                      {(
                        selectedCartItem.product.price *
                        selectedCartItem.quantity *
                        (1 - selectedCartItem.discount / 100)
                      ).toFixed(2)}
                    </p>
                    <Button
                      variant="success"
                      className="mt-1"
                      onClick={handleStripeCheckout}
                    >
                      Confirm Order
                    </Button>
                  </>
                ) : (
                  <>
                    <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
                    <Button
                      variant="success"
                      className="mt-1"
                      onClick={handleStripeCheckout}
                    >
                      Confirm Order
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Cart;
