import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import api from '../api/api'; 
import { useAuth } from '../context/AuthContext'; 
import '../styles/auth.css'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '', username: '', email: '', password: '', confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('http://localhost:3001/api/auth/signup', formData);
      if (response.status === 201) {
        login(response.data.token);
        setSuccess(true);
        setError(null);
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Sign-up error');
      setSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center ">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="login-form p-4 shadow rounded bg-dark text-light centerIt">
            <h3 className="text-center mb-4">Create a BookHub Account</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success"><FaCheckCircle /> Account created successfully! Redirecting...</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label><FaUserPlus className="me-2" />Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <Form.Group controlId="username" className="mb-3">
                <Form.Label><FaUserPlus className="me-2" />Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label><FaLock className="me-2" />Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label><FaLock className="me-2" />Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <Button type="submit" className="w-100 mt-3 btn-primary">
                Sign Up
              </Button>

              <p className="text-center mt-3">
                Already have an account? <Link to="/login" className="text-primary">Log in</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
