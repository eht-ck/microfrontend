import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/api";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Card, ListGroup, Dropdown, Pagination } from "react-bootstrap";
import { FaBoxOpen, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserOrderHistory.css"; // Import the CSS file

const AllOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders(page);
      setOrders(data.content);
      setTotalPages(data.totalPages);
    };

    fetchOrders();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const getStatusBadge = (order) => {
    const statusColors = {
      DELIVERED: 'success',
      PROCESSING: 'warning',
      PENDING: 'info',
      CANCELLED: 'danger',
    };
    return (
      <Dropdown onSelect={(eventKey) => handleStatusChange(order.orderId, eventKey)}>
        <Dropdown.Toggle variant={statusColors[order.status] || 'secondary'} className="px-3 py-2">
          {order.status}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="DELIVERED">DELIVERED</Dropdown.Item>
          <Dropdown.Item eventKey="PROCESSING">PROCESSING</Dropdown.Item>
          <Dropdown.Item eventKey="PENDING">PENDING</Dropdown.Item>
          <Dropdown.Item eventKey="CANCELLED">CANCELLED</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success" style={{ fontWeight: "bold", fontFamily: "'Playfair Display', serif" }}>
        <FaBoxOpen className="me-2" /> All Order History
      </h2>
      <Accordion defaultActiveKey="0" className="tea-accordion">
        {orders.map((order, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={order.orderId}
            className="border-0 shadow-sm mb-3 rounded tea-card"
          >
            <Accordion.Header>
              <div className="w-100 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <span className="fw-bold">
                  <FaCheckCircle className="text-success me-2" /> Order ID: {order.orderId}
                </span>
                <span>Total: ₹{order.totalAmount}</span>
                {getStatusBadge(order)}
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
      <Pagination className="mt-3 d-flex justify-content-center">
        <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
        <Pagination.Prev onClick={handlePreviousPage} disabled={page === 0} />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} disabled={page === totalPages - 1} />
        <Pagination.Last onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1} />
      </Pagination>
    </div>
  );
};

export default AllOrderHistory;