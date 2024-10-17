import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert , Modal } from 'react-bootstrap';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import BookPostForm from "./BookPostForm";

const Profile = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('http://localhost:3001/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await api.get(`http://localhost:3001/api/books/${bookId}`, {
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const togglePostForm = () => setShowPostForm(!showPostForm);

  return (
    <Container className="mt-4 custom-searchResult-margin ">
      {/* <h1 className="display-4 mt-5 text-center font-weight-bold" >My Books</h1> */}
      <Row className="mb-5 custom-searchResult-margin">
        <Col className="text-center">
          <Button
            variant="primary"
            onClick={togglePostForm}
            className="mb-4"
          >
            <FaPlusCircle /> Post a Book for Sale
          </Button>

          <Modal show={showPostForm} onHide={togglePostForm} centered>
            <Modal.Header closeButton>
              <Modal.Title>Post a Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BookPostForm />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={togglePostForm}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
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
                  <Card.Img style={{width: '100%',height: '200px',objectFit: 'cover'}} variant="top" src={`http://localhost:3001/${book.coverImage}`} alt={book.title}/>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {book.author}<br />
                      <strong>Price:</strong> ${book.price}<br />
                      <strong>Stock:</strong> {book.stock || 'N/A'}<br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => fetchBookDetails(book._id)}>View Details</Button>
                    <Button variant="primary" onClick={() => navigate(`/edit-book/${book._id}`)} className="ms-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(book._id)} className="ms-2">Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedBook?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedBook && (
                <>
                  <img 
                   src={`http://localhost:3001/${selectedBook.coverImage}`}
                   alt={selectedBook.title}
                    className="img-fluid mb-3"
                  />
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Description:</strong> {selectedBook.description}</p>
                  <p><strong>Stock:</strong> {selectedBook.stock}</p>
                  <p><strong>Price:</strong> {selectedBook.price}</p>


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
