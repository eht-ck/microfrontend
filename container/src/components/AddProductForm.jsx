import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaCheck } from "react-icons/fa";

const categories = ["TEA", "TEA_BLENDS", "TEA_ACCESSORIES", "GIFT_SETS"];

const AddProductForm = () => {
  const [customFields, setCustomFields] = useState([]);
  const [formData, setFormData] = useState({
    price: "",
    stockQuantity: "",
    name: "",
    category: "",
    imageURL: "",
    description: "",
    brand: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.price <= 0 || formData.stockQuantity <= 0) {
      toast.error("Price and Stock Quantity must be greater than 0");
      return;
    }

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      const customFieldsObject = customFields.reduce((obj, field) => {
        obj[field.key] = field.value;
        return obj;
      }, {});

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, customFields: customFieldsObject }),
      };

      try {
        const response = await fetch(
          "http://localhost:8081/api/products",
          config
        );
        if (response.ok) {
          toast.success("Product Added to Database!!!!");
        } else {
          toast.error("Failed to add product.");
        }
      } catch (error) {
        toast.error("Error submitting form");
        console.error("Error submitting form", error);
      }
    } else {
      toast.error("No token found");
    }
  };

  return (
    <Container className="mt-1">
      <ToastContainer/>
      <Card className="shadow-sm border-0">
        <Card.Body className="">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-success"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="border-success"
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
                    className="border-success"
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
                    className="border-success"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="border-success"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border-success"
                  >
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
              <Form.Control
                type="url"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                required
                className="border-success"
              />
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
                    className="border-success"
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
                    className="border-success"
                  />
                </Col>
              </Row>
            ))}

            <Button
              variant="outline-success"
              className="w-100 mb-3"
              onClick={addCustomField}
            >
              <FaPlus /> Add Custom Field
            </Button>

            <Button type="submit" variant="success" className="w-100">
              <FaCheck /> Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
     
     
    </Container>
  );
};

export default AddProductForm;
