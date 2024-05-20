import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Main() {
  return (
    <div>
      <Navbar />
      <div>
        <Link color="primary" to="/login">Login</Link>
        <Link color="primary" to="/signup">Signup</Link>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
