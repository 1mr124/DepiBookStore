import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Rating from 'react-rating'; // Import the rating package
import { FaStar } from 'react-icons/fa'; // Import star icons from react-icons
import '../styles/apiSearch.css'; 

const BookDetails = ({ selectedBook }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!selectedBook) {
    return <p>Please select a book to see details.</p>;
  }

  const { title, authors, description, imageLinks, averageRating, pageCount, publishedDate } = selectedBook.volumeInfo;

  const submitReview = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log('Submitting review:', { rating, review });
    setSuccessMessage('Review submitted successfully!');
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center custom-searchResult-margin">
        <Col md={8}>
          {/* Book Information */}
          <Card className="mb-4">
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
          <Card>
            <Card.Body>
              <h5>Submit Your Review</h5>
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
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>

              {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
