import React, { useState, useEffect } from "react";
import { Card, Nav, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfileGif from "../../public/assets/userProfile.gif";
import ResetPass from "../../public/assets/resetpass.gif";
import UpdateProfile from "../../public/assets/updateProfile.gif";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

const UserOrderHistory = lazy(() => import("mf_purchase/UserOrderHistory"));
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("#orderHistory");
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState(userInfo.userName);
  const [address, setAddress] = useState(userInfo.address);
  const [email, setEmail] = useState(userInfo.email);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

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
      e.preventDefault();
      if (newPassword.localeCompare(confirmNewPassword) !== 0) {
        setPasswordError(
          "New Password doesn't match with the confirm password!"
        );
        return;
      }
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
        const response = await axios.put(
          "http://localhost:8080/api/user/change-password",
          payload,
          config
        );
        toast.success("Password Changed Successfully, Redirecting to Login!!!");
        document.cookie = "token=; Max-Age=0; path=/;";

        setTimeout(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Unable to change Password";
      toast.error(errorMessage);
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email cannot be left empty!!!");
      return;
    }
    if (!address) {
      toast.error("Address cannot be empty!!!");
      return;
    }

    try {
      const payload = {
        userName: userInfo.userName,
        email: email,
        address: address,
      };

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.put(
          "http://localhost:8080/api/user/update",
          payload,
          config
        );
        const updatedData = await axios.get(
          "http://localhost:8080/api/user",
          config
        );
        setUserInfo(updatedData.data);
        toast.success("Updated the information successfully!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <Container>
        <ToastContainer />

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
                <Nav.Link eventKey="#orderHistory">Order History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                {activeTab === "#orderHistory" && (
                  <>
                    <UserOrderHistory />
                  </>
                )}
              </Suspense>
            </ErrorBoundary>
            {activeTab === "#userInfoTab" && (
              <>
                <Card className="mb-4 p-3 shadow-sm">
                  <div className="d-flex justify-content-center">
                    <Card.Img
                      variant="top"
                      src={UserProfileGif}
                      alt="User Info GIF"
                      style={{ width: "25%", height: "auto" }}
                    />
                  </div>
                  <Card.Body>
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
                            <strong>Delivery Address:</strong>{" "}
                            {userInfo.address}
                          </Card.Text>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </>
            )}
            {activeTab === "#changePasswordTag" && (
              <>
                <div className="d-flex justify-content-center">
                  <Card.Title>Change Password</Card.Title>
                </div>
                <Row className="align-items-center">
                  <Col md={4} className="d-flex justify-content-center">
                    <Card.Img
                      variant="top"
                      src={ResetPass}
                      alt="User Info GIF"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Col>
                  <Col md={8}>
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
                      <Form.Group controlId="formConfirmNewPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmNewPassword"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                      </Form.Group>
                      {passwordError && (
                        <div className="text-danger">{passwordError}</div>
                      )}
                      <div className="mt-3 d-flex justify-content-center">
                        <Button variant="success" type="submit">
                          Change Password
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </>
            )}

            {activeTab === "#updateUserInfoTab" && (
              <>
                <div className="d-flex justify-content-center">
                  <Card.Title>Update Information</Card.Title>
                </div>
                <Row className="align-items-center">
                  <Col md={4} className="d-flex justify-content-center">
                    <Card.Img
                      variant="top"
                      src={UpdateProfile}
                      alt="User Info GIF"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Col>
                  <Col md={8}>
                    <Form onSubmit={handleUpdateInfo}>
                      <Form.Group controlId="formName">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={updatedUserName}
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
                      <div className="mt-2 d-flex justify-content-center">
                        <Button variant="success" type="submit">
                          Update Information
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      <br />
    </>
  );
};

export default UserProfile;
