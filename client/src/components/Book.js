import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Form, Button, Card, Spinner, Alert, Modal
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import BookPostForm from "./BookPostForm";
import api from '../api/api'; // Import your API instance

const Book = ({ cartItems, setCartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookData, setBookData] = useState([]); // Example books
  const [searchResults, setSearchResults] = useState([]); // Search results
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);
  const [showBooks, setShowBooks] = useState(false); // State to toggle books listed

  // Fetch books for sale when the component mounts
  useEffect(() => {
    const fetchBooksForSale = async () => {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response = await api.get(`/books/for-sale`);

        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data) && data.length > 0) {
            setBookData(data);
          } else {
            setErrorMessage("No books have been posted for sale.");
            setBookData([]);
          }
        } else {
          throw new Error("Error fetching books for sale");
        }
      } catch (error) {
        setErrorMessage(error.message || "An error occurred during fetching");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksForSale();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setSearchResults([]); // Clear previous search results

    try {
      const response = await api.get(`/books/search?query=${encodeURIComponent(searchQuery)}`);

      if (response.status === 200) {
        const data = await response.data;

        if (Array.isArray(data) && data.length > 0) {
          setSearchResults(data); // Set the search results
        } else {
          setErrorMessage("No books found.");
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

  const handleAddToCart = (bookId) => {
    const selectedBook = bookData.find(book => book._id === bookId);

    if (selectedBook) {
      const existingBook = cartItems.find(item => item._id === selectedBook._id);
      if (existingBook) {
        setCartItems(cartItems.map(item => 
          item._id === selectedBook._id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCartItems([...cartItems, { ...selectedBook, quantity: 1 }]);
      }
      setSuccessMessage(`"${selectedBook.title}" has been added to the cart.`);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const togglePostForm = () => setShowPostForm(!showPostForm);
  const toggleShowBooks = () => setShowBooks(!showBooks); // Toggle function for showing books

  return (
    <Container>
      <Row>
        <Col>
          {/* Post Book Button */}
          <Button variant="outline-light" className="mb-3" onClick={togglePostForm}>
            <FaPlusCircle /> Post a Book
          </Button>
          {/* Show Books Button */}
          <Button variant="secondary" className="mb-3 ms-2" onClick={toggleShowBooks}>
            {showBooks ? 'Hide Books Listed for Sale' : 'Show Books Listed for Sale'}
          </Button>
          
          {/* Search Section */}
          <Card className="p-4 primDiv3">
            <h3 className="text-center mb-4">Search for a Book</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSearch} className="mb-4">
              <Row>
                <Col md={9}>
                  <Form.Group controlId="formSearch" className="m-3">
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
                    variant="secondary"
                    type="submit"
                    className="w-100 mt-5"
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
          </Card>

          {/* Search Results Section */}
          {searchResults.length > 0 && (
            <Card className="p-4 custom-searchResult-margin mt-4 primDiv">
              <h3 className="text-center mb-4">Search Results</h3>
              {searchResults.map((book) => (
                <Card className="mb-4 secondDiv" key={book._id} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Card.Subtitle className="mb-1">
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
                    <Card.Text>{book.description}</Card.Text>

                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={() => handleAddToCart(book._id)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Card>
          )}

          {/* Example Books for Sale Section */}
          {showBooks && ( // Conditionally render based on showBooks state
            <Card className="p-4 custom-searchResult-margin mt-4 primDiv">
              <h3 className="text-center mb-4">Books Listed for Sale</h3>
              {loading ? (
                <Spinner animation="border" />
              ) : bookData.length > 0 ? (
                <Row>
                  {bookData.map((book) => (
                    <Col md={6} key={book._id} className="mb-4"> {/* 2 cards per row on medium and larger screens */}
                      <Card className="secondDiv">
                        <Card.Body>
                          <Card.Title>{book.title}</Card.Title>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Card.Subtitle className="mb-1">
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
                          <Card.Text>{book.description}</Card.Text>

                          <Button
                            variant="success"
                            className="mt-2"
                            onClick={() => handleAddToCart(book._id)}
                          >
                            <FaShoppingCart /> Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No books available for sale.</p>
              )}
            </Card>
          )}

          <Modal show={showPostForm} onHide={togglePostForm}>
            <Modal.Header className="primDiv" closeButton>
              <Modal.Title>Post a New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body className="primDiv">
              <BookPostForm onClose={togglePostForm} />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Book;
