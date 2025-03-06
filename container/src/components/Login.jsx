import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import {userContext}
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState("");
  const navigate = useNavigate();
  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        userName: userName,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        payload
      );
      const token = response.data;
      document.cookie = `token=${token}; path=/;`;
      console.log("Login Successfully: ", response.data);
      setToastMessage(
        "User Login Successfully!! Redirecting to Landing Page -> to be changed to product page "
      );
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Login Failed";
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="container d-flex vh-100">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6 p-5 border border-success">
            <Form onSubmit={handleSubmitLogin}>
              <div className="fst-italic brand-color mx-auto text-center">
                TEA TREATS 🍃
              </div>
              <Form.Group controlId="formBasicEmail">
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
              </Form.Group>

              <Button variant="success" type="submit">
                LogIn
              </Button>
            </Form>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Login;
