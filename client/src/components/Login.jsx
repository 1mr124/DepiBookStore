import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api'; 
import googleLogo from '../static/imgs/GoogleLogo.svg'; // Adjust path as necessary
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import '../styles/auth.css'; // Adjust path as necessary

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook for redirecting after successful login
  const { login } = useAuth(); // Correctly call useAuth to get login function

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('http://localhost:3001/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // If login is successful
      if (response.status === 200) {
        login(response.data.token); // Call the login function with the token
        setSuccess(true);
        setError(null);
        navigate('/'); // Redirect to home page or dashboard
      }
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || 'An error occurred during login');
      setSuccess(false);
    }
  };

  return (
    <div>
      {/* Login Form */}
      <Container className="d-flex align-items-center justify-content-center full-height">
        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">دخول</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">تم تسجيل الدخول بنجاح!</Alert>}

            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="الايميل"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="كلمة المرور (باللغة الانجليزية)"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-right">
                <Link to="/resetPass" className="forgot-password">نسيت كلمة المرور؟</Link>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="rememberMe" className="customRememberMe">
              <Form.Check type="checkbox" label="تذكرني" />
            </Form.Group>

            <Button type="submit" className="w-100 buttonColor">دخول</Button>

            <div className="text-center mt-3">
              <Button variant="light" className="w-100">
                <img src={googleLogo} alt="Google" /> الدخول باستخدام حساب جوجل
              </Button>
            </div>

            <p className="text-center mt-3">
              هل تريد تسجيل حساب جديد؟ <Link to="/signup">إنشاء حساب جديد</Link>
            </p>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
