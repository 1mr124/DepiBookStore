import React, { useState } from "react";
import {
  Container, Row, Col, Form, Button, Card, Spinner, Alert, Modal
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import BookPostForm from "./BookPostForm";
import api from '../api/api'; // Import your API instance

const Book = ({ cartItems, setCartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookData, setBookData] = useState([]); // Change to an array
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Track success message
  const [showPostForm, setShowPostForm] = useState(false); // For toggling book post form

  // Handle book search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setBookData([]); // Reset bookData to an empty array

    try {
      const response = await api.get(`/books/search?query=${encodeURIComponent(searchQuery)}`);

      if (response.status === 200) {
        const data = await response.data;

        if (Array.isArray(data) && data.length > 0) {
          setBookData(data);
        } else {
          setErrorMessage("No books found.");
          setBookData([]);
        }
      } else {
        throw new Error("Book not found");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during search");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding book to cart
  const handleAddToCart = (bookId) => {
    const selectedBook = bookData.find(book => book._id === bookId);
    
    if (selectedBook) {
      // Check if the book is already in the cart
      const existingBook = cartItems.find(item => item._id === selectedBook._id);
      if (existingBook) {
        // Update the quantity if the book already exists in the cart
        setCartItems(cartItems.map(item => 
          item._id === selectedBook._id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        // Add the book to the cart with quantity 1
        setCartItems([...cartItems, { ...selectedBook, quantity: 1 }]);
      }
      
      // Show success message
      setSuccessMessage(`"${selectedBook.title}" has been added to the cart.`);
      
      // Hide the success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // Toggle Post Book Form
  const togglePostForm = () => setShowPostForm(!showPostForm);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="p-4 custom-searchResult-margin">
            <h3 className="text-center mb-4">Search and Buy a Book</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Success alert */}

            <Form onSubmit={handleSearch} className="mb-4">
              <Row>
                <Col md={9}>
                  <Form.Group controlId="formSearch" className="mb-3">
                    <Form.Label>Search by Title, Author <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search for a book by title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button 
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <FaSearch /> Search
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>

            {bookData.length > 0 ? (
              bookData.map((book) => (
                <Card className="mb-4" key={book._id}>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Card.Subtitle className="mb-1 text-muted">
                          <strong>Author:</strong> {book.author}
                        </Card.Subtitle>
                      </Col>
                      <Col md={6}>
                        <Card.Text className="mb-0">
                          <strong>Price:</strong> ${book.price}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Card.Text>
                      <strong>Description:</strong>
                    </Card.Text>
                    <Card.Text className="text-muted">{book.description}</Card.Text>

                    <Button 
                      variant="success"
                      className="mt-2"
                      onClick={() => handleAddToCart(book._id)} // Trigger add to cart
                    >
                      <FaShoppingCart /> Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-muted">No books to display</p>
            )}
          </Card>

          <Button 
            variant="primary"
            className="mt-3"
            onClick={togglePostForm}
          >
            <FaPlusCircle /> Post a Book
          </Button>

          <Modal show={showPostForm} onHide={togglePostForm}>
            <Modal.Header closeButton>
              <Modal.Title>Post a New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BookPostForm onClose={togglePostForm} />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Book;
