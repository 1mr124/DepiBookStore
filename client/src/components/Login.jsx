import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {  FaUser, FaLock, FaCheckCircle } from 'react-icons/fa';
import api from '../api/api'; 
import { useAuth } from '../context/AuthContext'; 
import '../styles/auth.css'; // Adjust path as necessary

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    try {
      const response = await api.post('http://localhost:3001/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        login(response.data.token);
        setSuccess(true);
        setError(null);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error during login');
      setSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="login-form p-4 shadow rounded bg-dark text-light centerIt">
            <h3 className="text-center mb-4">Login to BookHub</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success"><FaCheckCircle /> Login successful!</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label><FaUser className="me-2" />Email</Form.Label>
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Form.Check type="checkbox" label="Remember me" />
                <Link to="/resetPass" className="text-light small">Forgot Password?</Link>
              </div>

              <Button type="submit" className="w-100 mt-3 btn-primary">
                Login
              </Button>

              <p className="text-center mt-3">
                New to BookHub? <Link to="/signup" className="text-primary">Create an account</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
