import React, { useEffect, useState } from "react";
import { getUserOrder } from "../../api/api";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { FaBoxOpen, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaCheckCircle, FaLeaf, FaMugHot } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserOrderHistory.css"; // Import the CSS file

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getUserOrder();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusColors = {
      DELIVERED: "success",
      Processing: "warning",
      PENDING: "info",
      CANCELLED: "danger",
    };

    return (
      <Badge
        bg={statusColors[status] || "secondary"}
        className="px-3 py-2 rounded-pill shadow-sm"
        style={{ fontSize: "0.9rem", fontWeight: "bold" }}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success " style={{ fontWeight: "bold", fontFamily: "'Playfair Display', serif" }}>
        <FaBoxOpen className="me-2" /> Your Orders
      </h2>

      <Accordion defaultActiveKey="0" className="tea-accordion ">
        {orders.map((order, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={order.orderId}
            className="border-0 shadow-sm mb-3 rounded tea-card"
          >
            <Accordion.Header>
              <div className="w-100 d-flex flex-column flex-md-row justify-content-between align-items-md-center    ">
                <span className="fw-bold ">
                  <FaCheckCircle className="text-success me-2" /> Order ID: {order.orderId}
                </span>
                <span className=" ">Total: ₹{order.totalAmount}</span>
                {getStatusBadge(order.status)}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Card className="border-0 shadow-sm p-3 tea-card">
                <Card.Body>
                  <p className="mb-2 text-dark">
                    <FaCalendarAlt className="me-2 text-success" />
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p className="mb-3 text-dark">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    <strong>Delivery Address:</strong> {order.deliveryAddress}
                  </p>

                  <h5 className="text-success mb-3">
                    <FaShoppingCart className="me-2" /> Order Items:
                  </h5>

                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroup.Item
                        key={item.orderItemId}
                        className="d-flex justify-content-between align-items-center tea-item"
                      >
                        <div>
                          <span className="fw-semibold">{item.productName}</span>
                          <small className="text-muted d-block">Quantity: {item.quantity}</small>
                        </div>
                        <div className="text-end">
  ₹{(item.price - (item.price * item.discount / 100)).toFixed(2)}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default UserOrderHistory;