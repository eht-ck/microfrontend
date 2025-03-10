import React, { useEffect, useState } from "react";
import { getUserOrder } from "../../api/api";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { FaBoxOpen, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
 
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
      DELIVERED : "success",
      Processing: "warning",
      PENDING: "info",
      CANCELLED: "danger",
    };
    return <Badge bg={statusColors[status] || "secondary"} className="px-3 py-2">{status}</Badge>;
  };
 
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#2E7D32", fontWeight: "bold" }}>
        <FaBoxOpen className="me-2" /> User Order History
      </h2>
      <Accordion defaultActiveKey="0">
        {orders.map((order, index) => (
          <Accordion.Item eventKey={index.toString()} key={order.orderId} className="border-0 shadow-sm mb-3 rounded">
            <Accordion.Header>
              <div className="w-100 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <span className="fw-bold">
                  <FaCheckCircle className="text-success me-2" />
                  Order ID: {order.orderId}
                </span>
                <span className="text-muted">Total: ₹{order.totalAmount}</span>
                {getStatusBadge(order.status)}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Card className="border-0 shadow-sm p-3">
                <Card.Body>
                    
                  <p className="mb-2">
                    <FaCalendarAlt className="me-2 text-secondary" />
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p className="mb-3">
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
                        className="d-flex justify-content-between align-items-center bg-light rounded my-1"
                      >
                        <div>
                          <span className="fw-semibold">{item.productName}</span>
                          <small className="text-muted d-block">Quantity: {item.quantity}</small>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold">₹{item.price}</span><span>-{item.discount}%</span>
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