import React from 'react';
import Navbar from './components/Navbar'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import Footer from './components/Footer'; 
import './App.css'; 

import { Routes, Route, useLocation } from 'react-router-dom'; 


const Books = () => <div>Books Page</div>;
const Courses = () => <div>Courses Page</div>;

const App = () => {
  const location = useLocation();
  
  // Determine whether to show the footer
  const showFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* Add other routes as needed */}
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
