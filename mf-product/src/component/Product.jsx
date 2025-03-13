import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { addToCart } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductComp.css";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

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

  const handleQuantityInputChange = (productId, value) => {
    const quantity = Math.max(1, Number(value));
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, quantities[productId]);
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Error adding to cart. Make sure you are logged in.");
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid mx-10">
      <ToastContainer />
      <h2 className="d-flex justify-content-center mb02">Top selling Products</h2>
      <div className="row ">
        {data.map(
          (product) =>
            product.featured && (
              <div key={product.id} className="col-md-3 mb-2 ">
                <a
                  href={`/product/${product.id}`}
                  className="text-decoration-none"
                >
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
                      <input
                        type="text"
                        value={quantities[product.id]}
                        onChange={(e) => {
                          handleQuantityInputChange(product.id, e.target.value);
                        }}
                        onClick={(e) => e.preventDefault()}
                        className="form-control text-center"
                        style={{ width: "40px" }}
                      />
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