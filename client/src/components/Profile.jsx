

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons for editing and deleting
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the user's books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('http://localhost:3001/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          }
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch your books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle book deletion
  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await api.delete(`http://localhost:3001/profile/${bookId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
        setError('Failed to delete the book.');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="display-4 mt-5 text-center font-weight-bold" >My Books</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            {books.map((book) => (
              <Col md={4} key={book._id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={book.coverImage || 'placeholder.jpg'} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {book.author}<br />
                      <strong>Price:</strong> ${book.price}<br />
                      <strong>Stock:</strong> {book.stock || 'N/A'}<br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(book._id)} className="ms-2">Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Profile;



// const MyPosts = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   // Fetch current user's books (posts)
//   useEffect(() => {
//     const fetchUserBooks = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Token fetched from local storage
//         const response = await api.get('/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setBooks(response.data); // Set fetched books to state
//       } catch (error) {
//         console.error('Error fetching books:', error);
//         setError('Failed to fetch your posts.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserBooks();
//   }, []);

//   // Handle delete book
//   const deleteBook = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await api.delete(`/profile/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('Book deleted successfully!');
//       setBooks(books.filter((book) => book._id !== id)); // Update UI after deletion
//     } catch (error) {
//       console.error('Error deleting book:', error);
//       setError('Failed to delete the book.');
//     }
//   };

//   // Handle edit book
//   const editBook = (id) => {
//     // Redirect to the edit page for the book
//     window.location.href = `/edit-book/${id}`;
//   };

//   return (
//     <Container className="d-flex flex-column full-height">
//       <h2 className="text-center mb-4 p-2">My Posts</h2>

//       {loading ? (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       ) : (
//         <>
//           {error && <Alert variant="danger">{error}</Alert>}
//           {message && <Alert variant="success">{message}</Alert>}

//           <Row>
//             {/* Display user books/posts */}
//             {books.length > 0 ? (
//               books.map((book) => (
//                 <Col md={4} className="mb-4" key={book._id}>
//                   <Card>
//                     <Card.Img
//                       variant="top"
//                       src={book.coverImage || 'placeholder.jpg'}
//                       alt={book.title}
//                     />
//                     <Card.Body>
//                       <Card.Title>{book.title}</Card.Title>
//                       <Card.Text>
//                         <strong>Author:</strong> {book.author || 'Unknown'}<br />
//                         <strong>Category:</strong> {book.category || 'Uncategorized'}<br />
//                         <strong>Price:</strong> ${book.price || 'N/A'}<br />
//                         <strong>Published:</strong> {book.publishedYear || 'N/A'}
//                       </Card.Text>
//                       <div className="d-flex justify-content-between">
//                         <Button variant="primary" onClick={() => editBook(book._id)}>
//                           <FaEdit /> Edit
//                         </Button>
//                         <Button variant="danger" onClick={() => deleteBook(book._id)}>
//                           <FaTrashAlt /> Delete
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))
//             ) : (
//               <Col md={12}>
//                 <Alert variant="info">You have no posts yet.</Alert>
//               </Col>
//             )}
//           </Row>
//         </>
//       )}
//     </Container>
//   );
// };

// export default MyPosts;
