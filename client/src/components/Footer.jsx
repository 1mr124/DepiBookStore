import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/Footer.css'; // Ensure the correct path to Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="text-center">
        <Row>
          <Col md={4}>
            <p>© BookHub | 2024</p>
            <p>Terms of Use and Guarantee</p>
            <p>Privacy Policy</p>
          </Col>
          <Col md={4} className="social-icons">
            <button aria-label="YouTube" className="btn-link"><i className="fa fa-youtube"></i></button>
            <button aria-label="Facebook" className="btn-link"><i className="fa fa-facebook-f"></i></button>
            <button aria-label="Twitter" className="btn-link"><i className="fa fa-twitter"></i></button>
            <button aria-label="Instagram" className="btn-link"><i className="fa fa-instagram"></i></button>
            <button aria-label="LinkedIn" className="btn-link"><i className="fa fa-linkedin"></i></button>
            <button aria-label="WhatsApp" className="btn-link"><i className="fa fa-whatsapp"></i></button>
          </Col>
          <Col md={4}>
            <Nav className="footer-nav">
              <Nav.Link as={Link} to="/contact">Help</Nav.Link>
              <Nav.Link href="#">Payment Methods</Nav.Link>
              <Nav.Link href="#">How to Use and Purchase</Nav.Link>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
