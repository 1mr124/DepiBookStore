import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../static/imgs/logo.png'; // Adjust the path as per your project

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="xl" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="#">
          <img src={logo} alt="easyT.online" className="center-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/consulting">الاستشارات</Nav.Link>
            <Nav.Link as={Link} to="/subscriptions">الاشتركات</Nav.Link>
            <Nav.Link as={Link} to="/books">الكتب والملحقات</Nav.Link>
            <Nav.Link as={Link} to="#">كورسات الشهر</Nav.Link>
            <Nav.Link as={Link} to="/courses">جميع الكورسات</Nav.Link>
            <Nav.Link as={Link} to="#">كورسات ليف</Nav.Link>
            <Nav.Link as={Link} to="#">الدبلومات</Nav.Link>
            <Nav.Link as={Link} to="/login">تسجيل دخول</Nav.Link>
            <Nav.Link className="red" as={Link} to="/signup">إنشاء حساب</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
