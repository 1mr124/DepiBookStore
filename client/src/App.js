import React from 'react';
import Navbar from './components/Navbar'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';

import { Routes, Route } from 'react-router-dom'; 

const Consulting = () => <div>Consulting Page</div>;
const Subscriptions = () => <div>Subscriptions Page</div>;
const Books = () => <div>Books Page</div>;
const Courses = () => <div>Courses Page</div>;

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
