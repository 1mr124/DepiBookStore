import React, { useState } from 'react';
import { Container, Form, Button, Navbar, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api'; 
import logo from '../static/imgs/logo.png';
import '../styles/auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '', // Add name to the initial state
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook for redirecting after successful registration

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('http://localhost:3001/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      
      // If sign-up is successful
      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        
        // Redirect after a delay
        setTimeout(() => {
          navigate('/'); // Redirect to home page
        }, 2000);
      }
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || 'An error occurred during sign-up');
      setSuccess(false);
    }
  };

  return (
    <div>
 

      <Container className="d-flex align-items-center justify-content-center full-height">
        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">إنشاء حساب جديد</h2>
            <br />

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">تم إنشاء الحساب بنجاح! سيتم توجيهك إلى الصفحة الرئيسية...</Alert>}

            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              إنشاء حساب
            </Button>

            <p className="text-center mt-3">
              لديك حساب بالفعل؟ <Link to="/login">تسجيل دخول</Link>
            </p>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
