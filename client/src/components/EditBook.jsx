// src/components/EditBook.js

import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';


const EditBook = () => {
  const { id } = useParams(); // Get book ID from URL parameters
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    publishedYear: '',
    publisher: '',
    rating: '',
    coverImage: '',
    isbn: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the current book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`http://localhost:3001/api/books/new/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'coverImage') {
      setBook({
        ...book,
        coverImage: e.target.files[0], // Set the selected file
      });
    } else {
      setBook({
        ...book,
        [name]: value,
      });
    }
    // setBook((prevBook) => ({
    //   ...prevBook,
    //   [name]: value,
    // }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', book.title);
    formDataToSubmit.append('description', book.description);
    formDataToSubmit.append('price', book.price);
    formDataToSubmit.append('stock', book.stock);

    // If a new cover image is provided, append it
    if (book.coverImage) {
      formDataToSubmit.append('coverImage', book.coverImage);
    }

    try {
      await api.put(`http://localhost:3001/profile/${id}`, formDataToSubmit, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',  // Ensure multipart data is being sent
        }
      });
      alert('Book updated successfully!');
      navigate('/profile'); // Redirect to My Posts after updating
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update book. Please try again.');
    }
  };

  return (
    <Container className="p-4 custom-searchResult-margin primDiv">

      <h2>Edit Book</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author's name"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter book description"
                name="description"
                value={book.description}
                onChange={handleChange}
              />
            </Form.Group>



            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter book price"
                name="price"
                value={book.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter available stock"
                name="stock"
                value={book.stock}
                onChange={handleChange}
              />
            </Form.Group>



            <Form.Group controlId="formCoverImage" className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="file" 
                name="coverImage" 
                accept="image/*" 
                onChange={handleChange}
              />
            </Form.Group>


            <Button variant="outline-light" type="submit">
              Update Book
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default EditBook;
