import React, { useState } from "react";
import { Button, Form, Image, Row, Col, Container, Card, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignUpImg from "../../public/assets/Signup.gif";
 
const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
 
  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setFormError("");
 
    if (!userName || !password || !email || !address) {
      setFormError("All fields must be filled.");
      return;
    }
    if (userName.length < 5) {
      setFormError("Username must be at least 5 characters long.");
      return;
    }
    if (address.length < 10) {
      setFormError("Address must be at least 10 characters long.");
      return;
    }
 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be at least 8 characters long."
      );
      return;
    }
 
    try {
      const payload = { userName, password, email, address };
const response = await axios.post("http://localhost:8080/api/user/signup", payload);
      document.cookie = `token=${response.data}; Max-age=432000; path=/; domain=localhost; SameSite=None; Secure`;
 
      setToastMessage("Signup Successfully!");
      setToastType("success");
      setShowToast(true);
 
      setTimeout(() => navigate("/product"), 2000);
    } catch (error) {
      setShowToast(true);
      setToastMessage(error.response ? error.response.data : "Signup Failed");
      setToastType("danger");
    }
  };
 
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "550px", width: "100%" }}>
          <Card.Body>
            <Row className="align-items-center">
              <Col className="text-center mb-3">
                <Image src={SignUpImg} fluid style={{ width: "150px", height: "150px" }} />
              </Col>
            </Row>
            <Form onSubmit={handleSubmitSignup}>
              <Form.Group controlId="formBasicUserName" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
 
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
 
              <Form.Group controlId="formBasicAddress" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
 
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="text-danger small mt-1">{passwordError}</div>}
              </Form.Group>
 
              {formError && <div className="text-danger small mb-3">{formError}</div>}
 
              <Button variant="success" type="submit" className="w-100 rounded-3">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
 
      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          className={`text-white ${toastType === "success" ? "bg-success" : "bg-danger"}`}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
 
export default SignUpForm;