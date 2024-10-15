import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import Footer from './components/Footer'; 
import AboutPage from './components/AboutPage'; 
import ContactUs from './components/ContactUs'; 
import Home from './components/Home'; 
import CartPage from './components/CartPage'; 
import Profile from './components/Profile';
import Book from './components/Book'; 


import BookDetails from './components/BookDetails'; 
import './App.css'; 
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; 
import EditBook from './components/EditBook';


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
          <Route path="/books" element={<PrivateRoute element={<Book />} />} />
          <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
          <Route path="/search" element={<PrivateRoute element={<BookDetails selectedBook={selectedBook} />} />} /> {/* Pass selectedBook */}
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/edit-book/:id" element={<PrivateRoute element={<EditBook />} />} />
          

        </Routes>

        {showFooter && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
