import React, { useState, useRef, useEffect } from "react";
// import { Navbar, Nav, Container, Form, FormControl, ListGroup } from 'react-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/publicApi"; // Import the fetchBooks function
import logo from "../static/imgs/Logo.png";
import { useAuth } from "../context/AuthContext";
import "../styles/apiSearch.css";

const NavigationBar = ({ onBookSelect }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, logout } = useAuth();

  const handleLinkClick = () => {
    setExpanded(false);
    setSearchResults([]);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
    setQuery("");
    onBookSelect(book); // Set the selected book
    navigate("/search"); // Navigate to the search page
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar
      expand="xl"
      fixed="top"
      expanded={expanded}
      className="nav-color py-0"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center "
      >
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="BookHub" className="center-logo" />
        </Navbar.Brand>

        {/* Centered Nav Links */}
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto nav-size text-light">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLinkClick}
              className="px-3"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/books"
              onClick={handleLinkClick}
              className="px-3"
            >
              Books
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              onClick={handleLinkClick}
              className="px-3"
            >
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" onClick={handleLinkClick}>Profile</Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={handleLinkClick}
              className="px-3"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              onClick={handleLinkClick}
              className="px-3"
            >
              Contact Us
            </Nav.Link>
            {user ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={handleLinkClick}
                  className="px-3"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  className="red"
                  as={Link}
                  to="/signup"
                  onClick={handleLinkClick}
                  className="px-3"
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Search Form on the right */}
          <Form
            className="d-flex ms-3"
            ref={dropdownRef}
            onSubmit={handleSubmit}
          >
            <FormControl
              type="search"
              placeholder="Search books or authors"
              className="me-4"
              aria-label="Search"
              value={query}
              onChange={handleInputChange}
            />
            {/* Search Dropdown */}
            {searchResults.length > 0 && (
              <ListGroup className="search-dropdown">
                {searchResults.map((book) => (
                  <ListGroup.Item
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                  >
                    <img
                      src={
                        book.volumeInfo?.imageLinks?.thumbnail ||
                        "placeholder.jpg"
                      }
                      alt={book.volumeInfo?.title}
                      className="search-book-image"
                    />
                    <div>
                      <h5>{book.volumeInfo?.title}</h5>
                      <p>
                        By: {book.volumeInfo?.authors?.join(", ") || "Unknown"}
                      </p>
                      <p>Rating: {book.volumeInfo?.averageRating || "N/A"}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
