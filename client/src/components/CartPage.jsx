  
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

//Test 2
const CartPage = ({ cartItems = [] }) => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="my-4 text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <BsCart4 size={50} />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/books">
            <Button variant="primary">Browse Books</Button>
          </Link>
        </div>
      ) : (
        <>
          <Row>
            {cartItems.map((item, index) => (
              <Col key={index} md={4} lg={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.image} alt={item.title} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {item.author}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${item.price}
                    </Card.Text>
                    <Button variant="danger">Remove from Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center my-4">
            <Button variant="success" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
