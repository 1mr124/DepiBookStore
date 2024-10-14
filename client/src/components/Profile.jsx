

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert , Modal } from 'react-bootstrap';
import axios from 'axios';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons for editing and deleting
import api from '../api/api';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  

  // Fetch the user's books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('http://localhost:3001/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          }
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch your books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle book deletion
  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await api.delete(`http://localhost:3001/profile/${bookId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
        setError('Failed to delete the book.');
      }
    }
  };

  // Fetch book details by id
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await api.get(`http://localhost:3001/books/${bookId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setSelectedBook(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError('Failed to fetch book details.');
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <Container className="mt-4">
      <h1 className="display-4 mt-5 text-center font-weight-bold" >My Books</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            {books.map((book) => (
              <Col md={4} key={book._id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={book.coverImage || 'placeholder.jpg'} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {book.author}<br />
                      <strong>Price:</strong> ${book.price}<br />
                      <strong>Stock:</strong> {book.stock || 'N/A'}<br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => fetchBookDetails(book._id)}  >View Details</Button>
                    <Button variant="primary" onClick={() => navigate(`/edit-book/${book._id}`)} className="ms-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(book._id)} className="ms-2">Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Display selected book details */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedBook?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedBook && (
                <>
                  <img 
                    src={selectedBook.coverImage || 'placeholder.jpg'} 
                    alt={selectedBook.title} 
                    className="img-fluid mb-3"
                  />
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Description:</strong> {selectedBook.description}</p>
                  <p><strong>Category:</strong> {selectedBook.category}</p>
                  <p><strong>Published Year:</strong> {selectedBook.publishedYear}</p>
                  <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
                  <p><strong>Rating:</strong> {selectedBook.rating || 'N/A'}</p>
                  <p><strong>ISBN:</strong> {selectedBook.isbn || 'N/A'}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Profile;


