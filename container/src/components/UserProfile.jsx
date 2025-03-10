import React, { useState, useEffect } from "react";
import { Card, Nav, Button, Form, Row, Col, Container } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserOrderHistory from "mf_purchase/UserOrderHistory"
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("#userInfoTab");
  const [userInfo, setUserInfo] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState(userInfo.userName);
  const [address, setAddress] = useState(userInfo.address);
  const [email, setEmail] = useState(userInfo.email);

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const getUserDetail = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        try {
          const response = await axios.get(
            "http://localhost:8080/api/user",
            config
          );
          setUserInfo(response.data);
          setAddress(response.data.address);
          setEmail(response.data.email);
          setUpdatedUserName(response.data.userName);
        } catch (error) {
          console.error("Error making the request:", error);
        }
      } else {
        console.error("Token not found");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordChange = async (e) => {
    try {
      setPasswordError("");
      console.log("CHANGING PASSWORD");
      e.preventDefault();
      if (!passwordRegex.test(newPassword)) {
        setPasswordError(
          "Password must contain at least 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be at least 8 characters long."
        );
        return;
      }
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const payload = {
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
        console.log(payload);
        const response = await axios.put(
          "http://localhost:8080/api/user/change-password",
          payload,
          config
        );
        setToastMessage(
          "Password Changed Successfully, Redirecting to Login!!!"
        );
        setShowToast(true);
        document.cookie = "token=; Max-Age=0; path=/;";

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Unable to change Password";
      setShowToast(true);

      setToastMessage(errorMessage);
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userName: userInfo.userName,
        email: email,
        address: address,
      };
      console.log(payload);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        console.log("MAKING CALL");
        const response = await axios.put(
          "http://localhost:8080/api/user/update",
          payload,
          config
        );
        console.log(response.data);
        const updatedData = await axios.get(
          "http://localhost:8080/api/user",
          config
        );
        setUserInfo(updatedData.data);
        setToastMessage("Updated the information successfully!!!");
        showToast(true);
        setTimeout(() => {}, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
                <Nav.Link eventKey="#userInfoTab">User Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#changePasswordTag">
                  Change Password
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#updateUserInfoTab">
                  Update Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#orderHistory" >
                  Order History
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            {
              activeTab === "#orderHistory" && (<>
              <UserOrderHistory/>
              </>)
              
            }
            {activeTab === "#userInfoTab" && (
              <>
                <Card.Title className="text-center mb-4">
                  User Information
                </Card.Title>
                <Row className="mb-3">
                  <Col md={6}>
                    <Card className="p-3 shadow-sm">
                      <Card.Text>
                        <strong>Username:</strong> {userInfo.userName}
                      </Card.Text>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="p-3 shadow-sm">
                      <Card.Text>
                        <strong>Email:</strong> {userInfo.email}
                      </Card.Text>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Card className="p-3 shadow-sm">
                      <Card.Text>
                        <strong> Delivery Address:</strong> {userInfo.address}
                      </Card.Text>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
            {activeTab === "#changePasswordTag" && (
              <>
                <Card.Title>Change Password</Card.Title>
                <Form onSubmit={handlePasswordChange}>
                  <Form.Group controlId="formCurrentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}

                  <Button variant="success" type="submit">
                    Change Password
                  </Button>
                </Form>
              </>
            )}
            {activeTab === "#updateUserInfoTab" && (
              <>
                <Card.Title>Update Information</Card.Title>
                <Form onSubmit={handleUpdateInfo}>
                  <Form.Group controlId="formName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={updatedUserName}
                      // onChange={(e) => setUpdatedUserName(e.target.value)}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Update Information
                  </Button>
                </Form>
              </>
            )}
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
      <br />
    </>
  );
};

export default UserProfile;
