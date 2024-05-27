import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Main() {
  return (
    <div className='bg-gray-900 min-h-screen text-white flex flex-col'>
        <Navbar />
      <div className='flex-grow flex flex-col justify-center items-center mb-7'>
        <h1 className='text-4xl font-bold mb-8'>Hoşgeldiniz</h1>
        <img src='https://avatars.githubusercontent.com/u/27950435?s=200&v=4' alt='panates' className='w-1/2 mb-3 h-10 w-10 mx-auto animate-pulse' />
        <div className='flex space-x-4 text-center justify-center items-center'>
          <p className='m-5 w-72'>
            Panates firmalar ve bireyler için hizmetler sunmaktadır.
          </p>
        </div>
        <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-3'>
          <Link to='/Services' className=''>Hizmetler</Link>
        </button>
        <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-3'>
          <Link to='/Services' className=''>Hizmet Ver</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
