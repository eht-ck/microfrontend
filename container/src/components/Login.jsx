import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FingerprintGif from "../../public/assets/Fingerprint.gif";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
      document.cookie = `token=${token}; Max-age=432000; path=/; domain=localhost; SameSite=None; Secure`;
      console.log("Login Successfully: ", response.data);
      toast.success("User Login Successfully");

      setTimeout(() => {
        navigate("/product");
      }, 1000);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Login Failed";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex vh-100">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="col-12 col-md-10 col-lg-8 p-5 border border-success rounded d-flex shadow-lg">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <Image src={FingerprintGif} fluid style={{ width: '200px', height: '200px' }} />
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
    </>
  );
};


export default Login;