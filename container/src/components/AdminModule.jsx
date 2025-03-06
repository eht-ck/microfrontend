import React, { useState, useEffect } from "react";
import { Card, Nav, Button, Form, Row, Col, Container } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminModule = () => {
  const [activeTab, setActiveTab] = useState("userInfoTab");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const getAllUsers = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
      

      const response = await axios.get(
        "http://localhost:8080/api/user/all",
        config
      );
      setAllUsers(response.data);
    }
    } catch (error) {
        console.log(error)
      setIsAdmin(false);
    }
  };

  useEffect(()=> {
    getAllUsers();
  }, []);
  return (
    <>
      {isAdmin ? (
        <>
          <Container>
            <Card className="my-5">
              <Card.Header className="d-flex justify-content-center">
                <Nav
                  variant="tabs"
                  activeKey={activeTab}
                  onSelect={handleTabSelect}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="#userInfoTab">All Users</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#changePasswordTag">Products</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#updateUserInfoTab">Orders</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#orderHistory">Order History</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                {activeTab === "#userInfoTab" && <>
                
                
                
                </>}
                {activeTab === "#changePasswordTag" && <></>}
                {activeTab === "#updateUserInfoTab" && <></>}
              </Card.Body>
            </Card>
          </Container>
          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
            >
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </ToastContainer>
          <br />{" "}
        </>
      ) : (
        <> "OOOPSSS NOT ADMIN" </>
      )}
    </>
  );
};

export default AdminModule;
