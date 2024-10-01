import React from 'react';
import { Container, Form, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../static/imgs/logo.png'; // Adjust path as necessary
import '../styles/auth.css'; // Adjust path as necessary

const SignUp = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar className="justify-content-center">
        <Navbar.Brand href="#">
          <img src={logo} alt="easyT.online" className="center-logo" />
        </Navbar.Brand>
      </Navbar>

      {/* Sign Up Form */}
      <Container className="d-flex align-items-center justify-content-center" >
        <div className="login-form">
          <Form>
            <h2 className="text-center">إنشاء حساب جديد</h2>
            <br />
            <Form.Group controlId="name">
              <Form.Control type="text" placeholder="الاسم الكامل" />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="الايميل" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="كلمة المرور (باللغة الانجليزية)" />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Control type="password" placeholder="تأكيد كلمة المرور" />
            </Form.Group>

            <Button type="submit" variant="danger" block>إنشاء حساب</Button>

            <p className="text-center mt-3">
              لديك حساب بالفعل؟ <Link to="/login">تسجيل دخول</Link>
            </p>
          </Form>
        </div>
      </Container>

      {/* Footer */}
      <footer className="text-center py-3">
        © easyT.online | 2024
      </footer>
    </div>
  );
};

export default SignUp;
