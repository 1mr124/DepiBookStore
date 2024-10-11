import React, { useState } from 'react';
import Navbar from './components/Navbar'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import Footer from './components/Footer'; 
import BookDetails from './components/BookDetails'; // Import BookDetails
import './App.css'; 
import { Routes, Route, useLocation } from 'react-router-dom'; 

// Dummy components for Books and Courses
const Books = () => <div>Books Page</div>;
const Courses = () => <div>Courses Page</div>;

const App = () => {
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Determine whether to show the footer
  const showFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <Navbar onBookSelect={setSelectedBook} />
      
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<BookDetails selectedBook={selectedBook} />} /> {/* New route for search results */}
        {/* Add other routes as needed */}
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
