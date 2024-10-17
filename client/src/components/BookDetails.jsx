import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Rating from 'react-rating'; // Import the rating package
import { FaStar } from 'react-icons/fa'; // Import star icons from react-icons
import api from '../api/api'; // Import the custom Axios instance
import '../styles/apiSearch.css'; 

const BookDetails = ({ selectedBook }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when the selectedBook changes
  useEffect(() => {
    setRating(0);
    setReview('');
    setSuccessMessage('');
    setErrorMessage('');
  }, [selectedBook]);

  if (!selectedBook) {
    return <p>Please select a book to see details.</p>;
  }

  const { title, authors, description, imageLinks, averageRating, pageCount, publishedDate } = selectedBook.volumeInfo;

  const submitReview = async (e) => {
    e.preventDefault();
    
    // Prepare the review data
    const reviewData = {
      bookId: selectedBook.id, // Assuming you have a unique ID for the book
      rating,
      review,
      bookName: title
    };

    try {
      // Make a POST request to the backend to submit the review using the custom api instance
      const response = await api.post('/reviews', reviewData);

      // Handle successful submission
      setSuccessMessage(response.data.message);
      setErrorMessage(''); // Clear any previous error messages
      setRating(0); // Reset the rating
      setReview(''); // Clear the review text
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response ? error.response.data.msg : 'Server error');
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  return (
    <Container >
      <Row className="justify-content-md-center custom-searchResult-margin ">
        <Col md={8}>
          {/* Book Information */}
          <Card className="p-3 primDiv">
            <Card.Img className='imgResult' variant="top" src={imageLinks?.thumbnail || 'placeholder.jpg'} alt={title} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                <strong>Authors:</strong> {authors?.join(', ') || 'Unknown'}
              </Card.Text>
              <Card.Text>
                <strong>Published Date:</strong> {publishedDate || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Average Rating:</strong> {averageRating || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Page Count:</strong> {pageCount || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {description || 'No description available.'}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Review Form */}
          <Card className='noBorder'>
            <Card.Body className='primDiv'>
              <h5>Submit Your Review</h5>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={submitReview}>
                <Form.Group controlId="rating" className="mb-3">
                  <Form.Label>Rating (out of 5)</Form.Label>
                  <Rating
                    emptySymbol={<FaStar color="lightgray" />} // Empty stars
                    fullSymbol={<FaStar color="gold" />} // Filled stars
                    fractions={2} // Allow half-star ratings
                    initialRating={rating}
                    onChange={(rate) => setRating(rate)} // Update rating on change
                  />
                </Form.Group>

                <Form.Group controlId="review" className="mb-3">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
