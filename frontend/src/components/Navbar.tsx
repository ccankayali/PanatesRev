import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="https://avatars.githubusercontent.com/u/27950435?s=200&v=4" alt="Panates" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-lg font-semibold">Panates</h1>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <a href="/login" className="text-white hover:text-gray-300 font-medium">Login</a>
          </li>
          <li>
            <a href="/signup" className="text-white hover:text-gray-300 font-medium">Signup</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
