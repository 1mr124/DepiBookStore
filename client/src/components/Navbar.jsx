import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../static/imgs/BookLogo.png'; // Adjust the path as per your project

const NavigationBar = () => {
  // State to manage navbar collapse
  const [expanded, setExpanded] = useState(false);

  // Function to handle link click
  const handleLinkClick = () => {
    setExpanded(false); // Collapse the navbar
  };

  return (
    <Navbar variant="dark" expand="xl" fixed="top" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="BookHub" className="center-logo" />
        </Navbar.Brand>
        <Form className="d-flex ms-3">
          <FormControl
            type="search"
            placeholder="Search books or authors"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Navbar.Toggle 
          aria-controls="navbarNav" 
          onClick={() => setExpanded(expanded ? false : "expanded")} // Toggle expansion on click
        />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
            <Nav.Link as={Link} to="/books" onClick={handleLinkClick}>My Books</Nav.Link>
            <Nav.Link as={Link} to="/cart" onClick={handleLinkClick}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleLinkClick}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>Login</Nav.Link>
            <Nav.Link className="red" as={Link} to="/signup" onClick={handleLinkClick}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
