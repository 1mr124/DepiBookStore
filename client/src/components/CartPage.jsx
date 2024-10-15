import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";

const CartPage = ({ cartItems, onRemoveItem, onCheckout }) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    // Call the onCheckout function with the password
    const success = await onCheckout(password);
    if (success) {
      setShowModal(false);  // Close modal if password is correct
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  return (
    <Container className="custom-searchResult-margin">
      <Row>
        <Col>
          <h3>Your Cart</h3>
          {cartItems.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                      <td>
                        <Button variant="danger" onClick={() => onRemoveItem(item._id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="success" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Col>
      </Row>

      {/* Password Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Form.Group>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
