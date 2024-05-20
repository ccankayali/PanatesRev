import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Main() {
  return (
    <div className='bg-gray-900 min-h-screen text-white flex flex-col r'>
        <Navbar />
      <div className='text-center justify-center items-center'>
        <h1 className='text-4xl font-bold mb-8'>Panates</h1>
        <img src='https://avatars.githubusercontent.com/u/27950435?s=200&v=4' alt='panates' className='w-1/2 mb-8 h-10 w-10 mx-auto' />
        <div className='flex space-x-4 text-center justify-center items-center'>
          <Link to="/login" className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold transition duration-300'>Login</Link>
          <Link to="/signup" className='bg-white hover:bg-gray-400 px-4 py-2 rounded-md text-black font-semibold transition duration-300'>Signup</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
