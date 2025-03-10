import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import SignUpImg from "../../public/assets/Signup.gif";
import Image from "react-bootstrap/Image";
import { Row, Col, Container } from 'react-bootstrap';

const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmitSignup = async (event) => {
    event.preventDefault();

    if (!userName || !password || !email || !address) {
      setFormError("All fields must be filled.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      const payload = {
        userName: userName,
        password: password,
        email: email,
        address: address,
      };

      const response = await axios.post(
        "http://localhost:8080/api/user/signup",
        payload
      );
      console.log("Signup Successfully: ", response.data);
      setToastMessage("Signup Successfully! Redirecting to Login Page");

      setShowToast(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setShowToast(true);

      const errorMessage = error.response
        ? error.response.data
        : "Signup Failed";
      setToastMessage(errorMessage);
      console.log("Signup Failed: ", error);
    }
  };

  return (
    <>
      <Container className="d-flex vh-100">
        <Row className="w-100 justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6} className="p-5 border border-success rounded shadow-lg">
            <Form onSubmit={handleSubmitSignup}>
              <Row className="align-items-center">
                <Col md={6} className="text-center mb-3 mb-md-0">
                  <Image src={SignUpImg} fluid style={{ width: '200px', height: '200px' }} />
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicUserName" className="mb-3">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
          </Form.Group>


                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  {formError && <div className="text-danger">{formError}</div>}

                  <Button variant="success" type="submit" className="w-100">
                    SignUp
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <ToastContainer position="top-end" className="p-3">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
};

export default SignUpForm;