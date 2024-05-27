import React, { ReactNode, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 const renderWithLink=useCallback((element:ReactNode,url:string)=>{
  toggleMenu()
 return <Link to={url}>{element}
 {window.location.href=url}
 </Link>
 },[])

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center ">
      {/* Logo ve Başlık */}
      <div className="flex items-center">
        <img src="https://avatars.githubusercontent.com/u/27950435?s=200&v=4" alt="Panates" className="h-8 w-8 mr-3" />
        <h1 className="text-white text-lg font-semibold">Panates <span className='text-yellow-500'>T</span></h1>
      </div>

      {/* Masaüstü Menüsü */}
      <div className="hidden md:flex flex-1 justify-center mr-32">
        <ul className='flex space-x-10'>
          <li>
            <Link to='/Services' className='text-white hover:text-yellow-500 font-medium'>Services</Link>
          </li>
          <li>
            <Link to="/LoginPage" className="text-white hover:text-yellow-500 font-medium">Login</Link>
          </li>
          <li>
            <Link to="/SignupPage" className="text-white hover:text-yellow-500 font-medium">Signup</Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Menü Butonu */}
      <div className='md:hidden flex items-center'>
        <button onClick={toggleMenu} className='text-white focus:outline-none'>
          <svg className='h-6 w-6 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5H4v2h16v-2z' clipRule='evenodd' />
          </svg>
        </button>
      </div>

      {/* Mobil Menüsü */}
      {isOpen && (
        <div className='md:hidden absolute top-16 right-0 bg-gray-800 min-w-[200px] border-t-2 border-solid border-gray-900 rounded-xl'>
          <ul className='flex flex-col items-start space-y-4 px-4 py-2'>
            <li className='text-white hover:text-yellow-500 font-medium w-full cursor-pointer' onClick={()=>renderWithLink("","service")}>
              <span>Services</span>
            </li>
            <li  className='text-white hover:text-yellow-500 font-medium w-full cursor-pointer' onClick={()=>renderWithLink("","LoginPage")}>
              <span>Login</span>
            </li>
            <li  className='text-white hover:text-yellow-500 font-medium w-full cursor-pointer' onClick={()=>renderWithLink("","SignupPage")}>
              <span>Signup</span>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
