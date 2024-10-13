import React, { useState } from "react";
import { Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import { FaBook, FaDollarSign } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";

const BookPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    publishedYear: "",
    publisher: "",
    rating: "",
    coverImage: "",
    isbn: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/books/post", formData); // API route for posting
      setSuccessMessage("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        publishedYear: "",
        publisher: "",
        rating: "",
        coverImage: "",
        isbn: "",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">
        <FaBook /> Post a Book for Sale
      </h2>
      
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author's name"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>
                Price <FaDollarSign />
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPublishedYear" className="mb-3">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formPublisher" className="mb-3">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formRating" className="mb-3">
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formCoverImage" className="mb-3">
          <Form.Label>Cover Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cover image URL"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formISBN" className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            maxLength="13"
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter book description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="mt-3 w-100"
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Posting...
            </>
          ) : (
            <>
              <AiOutlineCloudUpload /> Post Book
            </>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default BookPostForm;
