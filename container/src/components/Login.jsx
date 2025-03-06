import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import {userContext}
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   const { setIsLoggedIn } = useContext(AuthContext);
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
      navigate("/");
    } catch (error) {
      console.log("Login Failed: ", error);
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
    </>
  );
};

export default Login;
