import React from 'react';
import { Container, Form, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../static/imgs/logo.png'; // Adjust path as necessary
import googleLogo from '../static/imgs/GoogleLogo.svg'; // Adjust path as necessary
import '../styles/auth.css'; // Adjust path as necessary

const Login = () => {
  return (
    <div>
      {/* Login Form */}
      <Container className="d-flex align-items-center justify-content-center" >
        <div className="login-form">
          <Form>
            <h2 className="text-center">دخول</h2>
            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="الايميل" required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="كلمة المرور (باللغة الانجليزية)" required />
              <Form.Text className="text-right">
                <Link to="/resetPass" className="forgot-password">نسيت كلمة المرور؟</Link>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="rememberMe" className="customRememberMe">
              <Form.Check type="checkbox" label="تذكرني" />
            </Form.Group>

            <Button type="submit" variant="danger" block>دخول</Button>

            <div className="text-center mt-3">
              <Button variant="light" block>
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
