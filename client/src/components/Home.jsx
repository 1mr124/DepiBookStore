import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../api/api'; // Your custom Axios instance
import { fetchBooks } from '../api/publicApi'; // Import the fetchBooks function

const HomePage = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openBookId, setOpenBookId] = useState(null); // Track the opened book ID

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await api.get('/user'); // Use the correct API endpoint
        setUserReviews(response.data);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        setError('Failed to fetch user reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  const handleBookClick = async (review) => {
    const bookId = review.bookId; // Assuming bookId is available in the review

    if (openBookId === bookId) {
      // If the book is already open, collapse it
      setOpenBookId(null);
      setBookDetails(null); // Clear book details when collapsed
    } else {
      // Fetch book details
      setOpenBookId(bookId);
      try {
        const books = await fetchBooks(review.bookName); // Fetch book details using public API
        if (books.length > 0) {
          setBookDetails(books[0]); // Set the first book details from the response
        } else {
          setError('No book details found.');
          setBookDetails(null); // Clear previous details
        }
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details.');
        setBookDetails(null); // Clear book details on error
      }
    }
  };

  return (
    <Container className="d-flex flex-column full-height">
      <h2 className="text-center mb-4 p-2">Your Reviews</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          
          {/* Div for Buttons */}
          <div className="mb-4">
            <Row className="d-flex justify-content-center">
              {userReviews.map((review) => (
                <Col xs={12} sm={6} md={4} key={review._id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Button
                        variant="primary"
                        className="w-100 text-left"
                        onClick={() => handleBookClick(review)}
                      >
                        {review.bookName} {/* Displaying book name */}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Div for Book Details */}
          {bookDetails && (
            <div>
              <Card className="mt-2">
                <Card.Img 
                  className='imgResult' 
                  variant="top" 
                  src={bookDetails.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'} 
                  alt={bookDetails.volumeInfo.title} 
                />
                <Card.Body>
                  <Card.Title>{bookDetails.volumeInfo.title}</Card.Title>
                  <Card.Text>
                    <strong>Authors:</strong> {bookDetails.volumeInfo.authors?.join(', ') || 'Unknown'}<br />
                    <strong>Published Date:</strong> {bookDetails.volumeInfo.publishedDate || 'N/A'}<br />
                    <strong>Average Rating:</strong> {bookDetails.volumeInfo.averageRating || 'N/A'}<br />
                    <strong>Page Count:</strong> {bookDetails.volumeInfo.pageCount || 'N/A'}<br />
                    <strong>Description:</strong> {bookDetails.volumeInfo.description || 'No description available.'}<br />
                    <strong>Your Rating:</strong> {userReviews.find(review => review.bookId === openBookId)?.rating || 'No rating provided.'} {/* Display user rating */}
                  </Card.Text>

                  <h5>User Review</h5>
                  <Card.Text>{userReviews.find(review => review.bookId === openBookId)?.review || 'No review provided.'}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
