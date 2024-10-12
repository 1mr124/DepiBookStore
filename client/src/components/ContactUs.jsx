import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col md={6}>
          <h1 className="text-center mb-4">Contact Us</h1>
          <h3>Get in Touch</h3>
          <p>If you have any questions, feel free to reach out to us using the form below.</p>
        </Col>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Your message" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
