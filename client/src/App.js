import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import Footer from './components/Footer'; 
import AboutPage from './components/AboutPage'; 
import ContactUs from './components/ContactUs'; 

import BookDetails from './components/BookDetails'; 
import './App.css'; 
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; 

const Books = () => <div>Books Page</div>;
const Home = () => <div>Home Page</div>; 
const Cart = () => <div>Cart Page</div>; 
// const About = () => <div>About</div>; 
const Contact = () => <div>Contact</div>; 

const App = () => {
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null); // Manage selected book state
  
  // Determine whether to show the footer
  const showFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <div>
        <NavigationBar onBookSelect={setSelectedBook} /> {/* Pass setSelectedBook to NavigationBar */}
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/books" element={<PrivateRoute element={<Books />} />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/search" element={<PrivateRoute element={<BookDetails selectedBook={selectedBook} />} />} /> {/* Pass selectedBook */}
        </Routes>

        {showFooter && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
