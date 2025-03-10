import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const tokenHeader = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return config;
};

const ProductUpdate = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/products/filter-and-search", {}, tokenHeader());
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/api/products/${productId}`, tokenHeader());
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      try {
        await axios.patch(`http://localhost:8081/api/products/update/${currentProduct.id}`, currentProduct, tokenHeader());
        fetchProducts();
        setShowModal(false);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!currentProduct.name) errors.name = "Name is required";
    if (!currentProduct.description) errors.description = "Description is required";
    if (!currentProduct.price || currentProduct.price <= 0) errors.price = "Price must be greater than 0";
    if (!currentProduct.stockQuantity || currentProduct.stockQuantity < 1) errors.stockQuantity = "Stock quantity must be at least 1";
    if (!currentProduct.category) errors.category = "Category is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const openModal = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const data = React.useMemo(() => products, [products]);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Stock Quantity', accessor: 'stockQuantity' },
      { Header: 'Category', accessor: 'category' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
           <Button variant="warning" onClick={() => openModal(row.original)}>
              <FaEdit /> 
            </Button>
            <Button variant="danger" onClick={() => handleDelete(row.original.id)}>
              <FaTrash /> 
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter);

  return (
    <div className="container mt-5">
       <Form.Control
        type="text"
        placeholder="Search"
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-3"
      />
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentProduct.name}
                 onClick={handleChange}
                  isInvalid={!!formErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleChange}
                  isInvalid={!!formErrors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  isInvalid={!!formErrors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formProductStockQuantity">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="stockQuantity"
                  value={currentProduct.stockQuantity}
                  onChange={handleChange}
                  isInvalid={!!formErrors.stockQuantity}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.stockQuantity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                  isInvalid={!!formErrors.category}
                >
                  <option value="">Select Category</option>
                  <option value="TEA">TEA</option>
                  <option value="TEA_BLENDS">TEA_BLENDS</option>
                  <option value="TEA_ACCESSORIES">TEA_ACCESSORIES</option>
                  <option value="GIFT_SETS">GIFT_SETS</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductUpdate;