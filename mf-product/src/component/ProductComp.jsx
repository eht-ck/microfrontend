import React, { useState, useEffect } from "react";
import { Container, Row, Badge, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import './ProductComp.css'; // Import the CSS file

const ProductComp = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [products, setProducts] = useState([]);

  const brands = ["Teagritty", "Tetly", "Nestle"];
  const categories = ["TEA", "TEA_BLENDS", "TEA_ACCESSORIES", "GIFT_SETS"];
  const fetchProducts = async () => {
    try {
      const filters = {};
      if (selectedBrand) filters.brand = selectedBrand;
      if (selectedCategory) filters.category = selectedCategory;
      if (minPrice) filters.minPrice = minPrice;
      if (maxPrice) filters.maxPrice = maxPrice;
      filters.sortBy = sortBy;
      filters.sortDirection = sortDirection;

      const response = await axios.post(
        "http://localhost:8081/api/products/filter-and-search",
        filters
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    selectedBrand,
    selectedCategory,
    minPrice,
    maxPrice,
    sortBy,
    sortDirection,
  ]);

  const handleBrandChange = (brand) => {
    setSelectedBrand((prevBrand) => (prevBrand === brand ? "" : brand));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("brand");
    setSortDirection("asc");
  };

  const handleAddToCart = (productId, quantities) => {
    addToCart(productId, quantities);
  };

  return (
    <>
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <Card className="p-3 shadow-sm ">
              <Card.Body>
                <h5 className="mb-3">Filters</h5>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Brand</strong>
                  </Form.Label>
                  {brands.map((brand) => (
                    <Form.Check
                      key={brand}
                      type="checkbox"
                      label={brand}
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                    />
                  ))}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Category</strong>
                  </Form.Label>
                  {categories.map((category) => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      label={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                  ))}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Price Range</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Sort By</strong>
                  </Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mb-2"
                  >
                    <option value="brand">Brand Name</option>
                    <option value="price">Price</option>
                    <option value="name"> Name </option>
                  </Form.Select>
                  <Form.Select
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value)}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="outline-danger"
                  className="w-100"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Row>
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="col-md-3 mb-2">
                    <a
                      href={`/product/${product.id}`}
                      className="text-decoration-none"
                    >
                      <div className="card h-100 text-center glassy-card">
                        <img
                          src={product.imageURL}
                          className="card-img-top w-100"
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          {product.category === "GIFT_SETS" && (
                            <Badge bg="success" className="ms-2 fst-italic">
                              10% OFF
                            </Badge>
                          )}
                          <p className="card-text">Price: ₹{product.price}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="success"
                            className="mb-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product.id, 1);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <Col>
                  <Card className="p-3 text-center shadow-sm glassy-card">
                    <Card.Body>
                      <h5>No products found</h5>
                      <p>Try adjusting the filters</p>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductComp;