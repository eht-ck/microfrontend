import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/products/filter-and-search",
        {}
      );
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid mx-10 ">
      <div className="row mt-4">
        {data.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 text-center">
              <img
                src={product.imageURL}
                className="card-img-top w-100"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
              </div>
              <div className="d-flex justify-content-center">
                <Button variant="" className="m-3 hover-bg-primary" style={{ backgroundColor: "#e8f5e9" }}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
