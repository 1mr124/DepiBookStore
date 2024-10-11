import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/apiSearch.css'; // Ensure the CSS file is linked

const BookDetails = ({ selectedBook }) => {
  if (!selectedBook) {
    return <p>Please select a book to see details.</p>;
  }

  const { title, authors, description, imageLinks, averageRating, pageCount, publishedDate } = selectedBook.volumeInfo;

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center custom-searchResult-margin">
        <Col md={8}>
          <Card>
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
                <strong>Rating:</strong> {averageRating || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Page Count:</strong> {pageCount || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {description || 'No description available.'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
