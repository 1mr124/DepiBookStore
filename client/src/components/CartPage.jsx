import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form, Toast } from "react-bootstrap";
import api from '../api/api'; // Import your API instance

const CartPage = ({ cartItems, onRemoveItem, onCheckout }) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false); // State for showing success toast
  const [selectedBookId, setSelectedBookId] = useState(null); // To store the ID of the book to be purchased
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setShowModal(true); // Show the modal when proceeding to checkout
    } else {
      setErrorMessage("Your cart is empty. Please add items to your cart before checking out.");
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
        const payload = { password };

        // Send the request to validate the password
        const response = await api.post("/books/validate-password", payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // JWT token for authentication
            },
        });

        let responseData = response.data;
        
        if (response.status === 200 && responseData.message === "ok") {
            // Now proceed to update the stock or finalize the purchase
            const stockUpdateResponse = await api.post(`/books/buy/${selectedBookId}`,
                { quantity: 1 }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

            const stockUpdateResult = stockUpdateResponse.data;

            if (stockUpdateResponse.status === 200) {
                console.log("Checkout success:", stockUpdateResult.message);
                setShowModal(false);  // Close the modal on success
                setErrorMessage("");  // Clear any error message
                setShowToast(true); // Show success toast
                onRemoveItem(selectedBookId); // Remove the book from the cart
                onCheckout();  // Call the onCheckout function to refresh the cart or redirect
            } else {
                setErrorMessage(stockUpdateResult.message || "Something went wrong. Please try again.");
            }
        } else if (responseData.message === "Not") {
          setErrorMessage("Invalid password. Please try again.");
        };
    } catch (error) {
        // Handle 401 Unauthorized error specifically (invalid password case)
        if (error.response && error.response.status === 401) {
            console.error("Invalid password:", error.response.data.message);
            setErrorMessage("Invalid password. Please try again.");
        } else {
            console.error("Error during checkout:", error);
            setErrorMessage("Server error. Please try again later.");
        }
    }
  };

  const handleSelectBookForCheckout = (bookId) => {
    setSelectedBookId(bookId);
    setShowModal(true); // Show the modal for password input when a book is selected for checkout
  };

  return (
    <Container className="custom-searchResult-margin primDiv p-4">
      <Row >
        <Col>
          <h3>Your Cart</h3>
          {cartItems.length > 0 ? (
            <>
              <Table className="secondDiv" striped bordered hover >
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
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button className="m-1" variant="danger" onClick={() => onRemoveItem(item._id)}>
                          Remove
                        </Button>
                        <Button className="m-1" variant="success" onClick={() => handleSelectBookForCheckout(item._id)}>
                          Buy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="secondary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Col>
      </Row>

      {/* Password Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header className="secondDiv" closeButton>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="primDiv2">
          <Form onSubmit={handleConfirm}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Ensure state updates correctly
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer className="secondDiv">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Toast for Purchase Confirmation */}
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'absolute', top: '100px', right: '20px' }}>
        <Toast.Body className="primDiv">
          <span role="img" aria-label="check">✅</span> Purchase successful! Thank you for your order.
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default CartPage;
