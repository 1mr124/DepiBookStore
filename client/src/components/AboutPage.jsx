import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="custom-searchResult-margin mb-5">
      <h1 className="text-center mb-4">About BookHub</h1>
      <p className="text-center mb-5">
        Welcome to BookHub, your ultimate online bookstore! Our mission is to create a community where book lovers can buy, sell, and review books while connecting with others who share their passion for reading.
      </p>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1600181982553-ce7d36051c01?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book Community" />
            <Card.Body>
              <Card.Title>Join Our Community</Card.Title>
              <Card.Text>
                At BookHub, we believe in the power of sharing knowledge and experiences. Join our vibrant community of readers and authors, and discover new books, authors, and genres.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book Reviews" />
            <Card.Body>
              <Card.Title>Share Your Thoughts</Card.Title>
              <Card.Text>
                We encourage our users to leave reviews and ratings for the books they read. Your opinions help fellow readers make informed decisions and foster a rich dialogue about literature.
              </Card.Text>
              <Button variant="primary">Share a Review</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h2 className="mt-5">Sell Your Books</h2>
          <p>
            Have books you no longer need? Sell them to fellow BookHub users and make some extra cash while helping others discover great reads.
          </p>
          <Button variant="success">Start Selling</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
