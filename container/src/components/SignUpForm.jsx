import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

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
      setToastMessage("Signup Successfully!  Redirecting to Login Page");


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
      <div className="container d-flex vh-100">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6 p-5 border border-success rounded">
            <Form onSubmit={handleSubmitSignup} >
              <div className="fst-italic brand-color mx-auto text-center">
                TEA TREATS 🍃
              </div>
              <Form.Group controlId="formBasicUserName">
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

              <Button variant="success" type="submit">
                SignUp
              </Button>
            </Form>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default SignUpForm;
