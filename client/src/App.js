import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import Footer from './components/Footer'; 
import BookDetails from './components/BookDetails'; 
import './App.css'; 
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

// Dummy components for Books and Courses
const Books = () => <div>Books Page</div>;
const Home = () => <div>Home Page</div>; // Assuming you have a Home component
const Cart = () => <div>Cart Page</div>; 
const About = () => <div>About</div>; 
const Contact = () => <div>Contact</div>; 

const App = () => {
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null); // Make sure this is defined
  
  // Determine whether to show the footer
  const showFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <div>
        <NavigationBar setSelectedBook={setSelectedBook}  />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/books" element={<PrivateRoute element={<Books />} />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/search" element={<PrivateRoute><BookDetails selectedBook={selectedBook} /></PrivateRoute>} />
          {/* Add other routes as needed */}
        </Routes>

        {showFooter && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
