import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const categories = ["TEA", "TEA_BLENDS", "TEA_ACCESSORIES", "GIFT_SETS"];

const AddProductForm = () => {
  const [customFields, setCustomFields] = useState([]);
  const [formData, setFormData] = useState({
    price: "",
    stockQuantity: "",
  });

  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price <= 0 || formData.stockQuantity <= 0) {
      alert("Price and Stock Quantity must be greater than 0");
      return;
    }
    // Handle form submission logic
    console.log("Form submitted successfully", formData, customFields);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h2 className="mb-4 text-center fw-bold">Add New Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" name="brand" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select name="category" required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.replace("_", " ")}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="url" name="imageURL" required />
            </Form.Group>

            {customFields.map((field, index) => (
              <Row className="mb-3" key={index}>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Custom Field Key"
                    value={field.key}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "key", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Custom Field Value"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "value", e.target.value)
                    }
                    required
                  />
                </Col>
              </Row>
            ))}

            <Button
              variant="outline-secondary"
              className="w-100 mb-3"
              onClick={addCustomField}
            >
              + Add Custom Field
            </Button>

            <Button type="submit" variant="primary" className="w-100">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProductForm;
