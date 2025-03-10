import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { addToCart } from "../../api/api";
import "./ProductComp.css";
import { Alert } from "bootstrap";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/products/filter-and-search",
        {}
      );
      setData(response.data);
      const initialQuantities = {};
      response.data.forEach((product) => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + amount),
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      console.log("ADDING TO CART")
      await addToCart(productId, quantities[productId]);
     alert("ADDED TO CART");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid mx-10">
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
      <div className="row mt-4">
        {data.map(
          (product) =>
            product.featured && (
              <div key={product.id} className="col-md-3 mb-2">
                <a href={`/product/${product.id}`} className="text-decoration-none">
                  <div className="card h-100 text-center">
                    <img
                      src={product.imageURL}
                      className="card-img-top w-100"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Price: ₹{product.price}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuantityChange(product.id, -1);
                        }}
                      >
                        -
                      </Button>
                      <span>{quantities[product.id]}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuantityChange(product.id, 1);
                        }}
                      >
                        +
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <Button
                        variant="success"
                        className="mb-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product.id);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </a>
              </div>
            )
        )}
      </div>
      
    </div>
  );
};

export default Product;