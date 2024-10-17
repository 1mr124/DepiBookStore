import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Form, FormControl, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/publicApi'; 
import { useAuth } from '../context/AuthContext'; 
import { FaUser, FaShoppingCart, FaSearch, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import logo from '../static/imgs/Logo.png';
import '../styles/apiSearch.css';

const NavigationBar = ({ onBookSelect }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { user, logout } = useAuth();

  const handleLinkClick = () => {
    setExpanded(false);
    setSearchResults([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  const handleInputChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      const timer = setTimeout(async () => {
        const results = await fetchBooks(searchTerm);
        setSearchResults(results);
      }, 300);
  
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  };

  const handleBookSelect = (book) => {
    setSearchResults([]);
    setQuery('');
    onBookSelect(book);
    navigate('/search');
  };
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Navbar 
      variant="dark" 
      expand="xl" 
      fixed="top" 
      expanded={expanded} 
      style={{ backgroundColor: '#1a1a1a', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" onClick={handleLinkClick}>
          <img src={logo} alt="BookHub" className="center-logo" style={{ height: '40px' }} />
        </Navbar.Brand>

        <Form className="d-flex ms-3 position-relative search-input" ref={dropdownRef} onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Search books or authors"
            className="me-2 search-input"
            aria-label="Search"
            value={query}
            onChange={handleInputChange}
          />
          {searchResults.length > 0 && (
            <ListGroup className="search-dropdown JustNoBorder">
              {searchResults.map(book => (
                <ListGroup.Item 
                  key={book.id} 
                  onClick={() => handleBookSelect(book)}
                  className="search-result-item primDiv JustNoBorder"
                >
                  <img 
                    src={book.volumeInfo?.imageLinks?.thumbnail || 'placeholder.jpg'} 
                    alt={book.volumeInfo?.title} 
                    className="search-book-image" 
                  />
                  <div>
                    <h5>{book.volumeInfo?.title}</h5>
                    <p className="search-author">By: {book.volumeInfo?.authors?.join(', ') || 'Unknown'}</p>
                    <p className="search-rating">Rating: {book.volumeInfo?.averageRating || 'N/A'}</p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form>

        <Navbar.Toggle 
          aria-controls="navbarNav" 
          onClick={() => setExpanded(expanded ? false : "expanded")} 
          style={{ borderColor: '#555' }}
        />
        
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleLinkClick} className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/books" onClick={handleLinkClick} className="text-white">Books</Nav.Link>
            <Nav.Link as={Link} to="/cart" onClick={handleLinkClick} className="text-white">
              <FaShoppingCart style={{ marginRight: '5px' }} />Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" onClick={handleLinkClick} className="text-white">
              <FaUser style={{ marginRight: '5px' }} />Profile
            </Nav.Link>
            {user ? (
              <Nav.Link onClick={handleLogout} className="text-danger">
                <FaSignOutAlt style={{ marginRight: '5px' }} />Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleLinkClick} className="text-white">
                  <FaSignInAlt style={{ marginRight: '5px' }} />Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={handleLinkClick} className="text-danger">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
