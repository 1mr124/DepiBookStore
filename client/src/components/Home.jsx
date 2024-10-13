import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa'; // Import icons
import api from '../api/api';
import { fetchBooks } from '../api/publicApi';

const HomePage = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openBookId, setOpenBookId] = useState(null);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchedReviews, setSearchedReviews] = useState([]);

  // Fetch current user's reviews
  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await api.get('/user');
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

  // Handle search by username
  const handleSearch = async () => {
    try {
      if (searchUsername.trim() === '') {
        setError('Please enter a username to search.');
        return;
      }

      // Make the GET request using the correct endpoint
      const response = await api.get(`/reviews/username/${searchUsername}`);
      
      setSearchedReviews(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching searched reviews:', error);
      setSearchedReviews([]); // Clear the searched reviews on error
      setError('Failed to fetch reviews for that user.');
    }
  };

  // Handle clicking a book to view details
  const handleBookClick = async (review, isFromSearch = false) => {
    const bookId = review.bookId;

    if (openBookId === bookId) {
      setOpenBookId(null);
      setBookDetails(null);
    } else {
      setOpenBookId(bookId);
      try {
        const books = await fetchBooks(review.bookName);
        if (books.length > 0) {
          setBookDetails({ ...books[0], isFromSearch });
        } else {
          setError('No book details found.');
          setBookDetails(null);
        }
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details.');
        setBookDetails(null);
      }
    }
  };

  return (
    <Container className="d-flex flex-column full-height">
      <h2 className="text-center mb-4 p-2">User Dashboard</h2>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Row>
            {/* Section for searching reviews by username */}
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5>
                    <FaSearch className="me-2" /> Search User Reviews
                  </h5>
                </Card.Header>
                <Card.Body>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={searchUsername}
                      onChange={(e) => setSearchUsername(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearch}>
                      Search
                    </Button>
                  </InputGroup>

                  {/* Display searched reviews */}
                  {searchedReviews.length > 0 && (
                    <div className="mt-4">
                      <h6>Reviews by {searchUsername}:</h6>
                      <div className="mb-4 d-flex flex-wrap">
                        {searchedReviews.map((review) => (
                          <Button
                            key={review._id}
                            variant="secondary"
                            className="me-2"
                            onClick={() => handleBookClick(review, true)}
                          >
                            {review.bookName || "Unknown"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Section for current user's reviews */}
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5>Your Reviews</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-4 d-flex flex-wrap">
                    {userReviews.map((review) => (
                      <Button
                        key={review._id}
                        variant="primary"
                        className="me-2"
                        onClick={() => handleBookClick(review)}
                      >
                        {review.bookName || "Unknown"}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Section to display book details */}
          {bookDetails && (
            <Row>
              <Col md={12}>
                <Card className="mt-2">
                  <Card.Img
                    className="imgResult"
                    variant="top"
                    src={bookDetails.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}
                    alt={bookDetails.volumeInfo.title}
                  />
                  <Card.Body>
                    <Card.Title>{bookDetails.volumeInfo.title || "Unknown"}</Card.Title>
                    <Card.Text>
                      <strong>Authors:</strong> {bookDetails.volumeInfo.authors?.join(', ') || 'Unknown'}<br />
                      <strong>Published Date:</strong> {bookDetails.volumeInfo.publishedDate || 'N/A'}<br />
                      <strong>Average Rating:</strong> {bookDetails.volumeInfo.averageRating || 'N/A'}<br />
                      <strong>Page Count:</strong> {bookDetails.volumeInfo.pageCount || 'N/A'}<br />
                      <strong>Description:</strong> {bookDetails.volumeInfo.description || 'No description available.'}<br />
                      {/* Check if the book is from the search results or the user's reviews */}
                      <strong>User's Rating:</strong> {bookDetails.isFromSearch
                        ? searchedReviews.find((review) => review.bookId === openBookId)?.rating || 'No rating provided.'
                        : userReviews.find((review) => review.bookId === openBookId)?.rating || 'No rating provided.'}
                    </Card.Text>
                    <h5>User Review</h5>
                    <Card.Text>{bookDetails.isFromSearch
                      ? searchedReviews.find((review) => review.bookId === openBookId)?.review || 'No review provided.'
                      : userReviews.find((review) => review.bookId === openBookId)?.review || 'No review provided.'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
