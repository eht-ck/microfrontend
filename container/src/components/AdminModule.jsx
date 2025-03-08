import React, { useState, useEffect } from "react";
import { Card, Nav, Button, Container, Table } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaBan, FaUserShield } from "react-icons/fa";
import Image from "../../public/assets/4288d1.JPG"; 
const AdminModule = () => {
  const [activeTab, setActiveTab] = useState("userInfoTab");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const [customFields, setCustomFields] = useState([]);

    const addCustomField = () => {
        setCustomFields([...customFields, '']);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        alert('Form submitted!');
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
      console.log(error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return config;
  };
  const handleDeleteUser = async(userId) =>  {
    const config = getToken();
    const response = await axios.delete(
        `http://localhost:8080/api/user/delete/${userId}`,
        config
      );
    console.log(`Delete user with ID: ${userId}`);
  }

  const handleBlockUser = async(userId) =>{
    const config = getToken();
    const response = await axios.put(
        `http://localhost:8080/api/user/block-user/${userId}`,
        {},
        config
      );
    // Implement block user functionality
    console.log(`Block user with ID: ${userId}`);
  }

  const  handleMakeAdmin  = async (userId) => {
    const config = getToken();
    const response = await axios.patch(
        `http://localhost:8080/api/user/update/role/${userId}`,
        {"role": "ADMIN"},
        config
      );
    console.log(`Make user with ID: ${userId} an admin`);
  }

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
                    <Nav.Link eventKey="userInfoTab">All Users</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="addProduct">ADD Products</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="changePasswordTag">PRODUCTS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="updateUserInfoTab">ADD</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orderHistory">Order History</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                {activeTab === "userInfoTab" && (
                  <Table striped bordered hover>
                    <thead>
                      <tr className="text-center">
                        <th className="bg-success">User ID</th>
                        <th className="bg-success">Username</th>
                        <th className="bg-success">Email</th>
                        <th className="bg-success">Address</th>
                        <th className="bg-success">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user) => (
                        <tr key={user.userId}>
                          <td>{user.userId}</td>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td>{user.address}</td>
                          <td>
                            <div className="d-flex justify-content-around">
                              <Button
                                variant="danger"
                                disabled={
                                  user.deleted || user.userName === "chandresh"
                                }
                                onClick={() => handleDeleteUser(user.userId)}
                                className="m-2"
                              >
                                <FaTrash />
                              </Button>
                              <Button
                                variant="warning"
                                disabled={
                                  user.blocked || user.userName === "chandresh"
                                }
                                onClick={() => handleBlockUser(user.userId)}
                                className="m-2"
                              >
                                <FaBan /> Block
                              </Button>
                              <Button
                                variant="info"
                                disabled={user.roles == "ADMIN"}
                                onClick={() => handleMakeAdmin(user.userId)}
                                className="m-2"
                              >
                                <FaUserShield /> Make Admin
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                {activeTab === "addProduct" && <>
                
                
                  <div className="container mt-5">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" name="price" required />
                </div>
                <div className="form-group">
                    <label htmlFor="stockQuantity">Stock Quantity</label>
                    <input type="number" className="form-control" id="stockQuantity" name="stockQuantity" required />
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input type="text" className="form-control" id="brand" name="brand" required />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" id="category" name="category" required />
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL">Image URL</label>
                    <input type="url" className="form-control" id="imageURL" name="imageURL" required />
                </div>
                {customFields.map((field, index) => (
                    <div className="form-group custom-field" key={index}>
                        <label htmlFor={`customField${index}`}>Custom Field</label>
                        <input type="text" className="form-control" id={`customField${index}`} name={`customField${index}`} />
                    </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={addCustomField}>+ Add Custom Field</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
                </>}
                {activeTab === "updateUserInfoTab" && <></>}
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
        </>
      ) :    <div className="d-flex justify-content-center">
          <img src={Image} className="img-fluid" style={{ maxWidth: '55%' }} alt="Responsive" />
          </div>
      }
    </>
  );
};

export default AdminModule;
