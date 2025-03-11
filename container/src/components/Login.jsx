import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import FingerprintGif from "../../public/assets/Fingerprint.gif";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
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
      document.cookie = `token=${token}; path=/; domain=localhost; SameSite=None; Secure`;
      console.log("Login Successfully: ", response.data);
      setToastMessage(
        "User Login Successfully!! Redirecting to Product Page "
      );

      setShowToast(true);
      setTimeout(() => {
        navigate("/product");
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
          <div className="col-12 col-md-10 col-lg-8 p-5 border border-success rounded d-flex shadow-lg">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <Image src={FingerprintGif} fluid  style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="col-7">
              <Form onSubmit={handleSubmitLogin}>
                <h3 className="text-center mb-4">Login</h3>
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

                <Button variant="success" type="submit" className="w-100">
                  LogIn
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
                   autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Login;