import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Form, FormControl, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import logo from '../static/imgs/Logo.png'; // Adjust the path as per your project
import '../styles/apiSearch.css';

const NavigationBar = ({ onBookSelect }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleLinkClick = () => {
    setExpanded(false);
    setSearchResults([]); // Clear search results on link click
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    if (searchTerm.length > 2) {
      fetchBooks(searchTerm);
      navigate('/search'); // Redirect to the /search route
    } else {
      setSearchResults([]);
    }
  };

  const fetchBooks = async (searchTerm) => {
    try {
      const res = await api.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      setSearchResults(res.data.items || []);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleBookSelect = (book) => {
    setSearchResults([]);
    setQuery('');
    onBookSelect(book);
  };

  // Handle clicks outside of the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResults([]); // Clear search results when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Navbar variant="dark" expand="xl" fixed="top" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="BookHub" className="center-logo" />
        </Navbar.Brand>

        <Form className="d-flex ms-3" ref={dropdownRef}> {/* Attach ref to Form */}
          <FormControl
            type="search"
            placeholder="Search books or authors"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={handleInputChange}
          />
          {searchResults.length > 0 && (
            <ListGroup className="search-dropdown">
              {searchResults.map(book => (
                <ListGroup.Item key={book.id} onClick={() => handleBookSelect(book)}>
                  <img 
                    src={book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'} 
                    alt={book.volumeInfo.title} 
                    className="search-book-image" 
                  />
                  <div>
                    <h5>{book.volumeInfo.title}</h5>
                    <p>By: {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
                    <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form>

        <Navbar.Toggle 
          aria-controls="navbarNav" 
          onClick={() => setExpanded(expanded ? false : "expanded")} 
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
