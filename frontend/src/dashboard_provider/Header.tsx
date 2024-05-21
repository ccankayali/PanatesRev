import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsJustify } from 'react-icons/bs';

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const [token, setToken] = useState<boolean>(true); // Assuming user is logged in initially
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Ana sayfaya yonlendiriliyorsunuz.")
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        {!token && (
          <div className='dropdown-container'>
            <BsPersonCircle className='icon' onClick={handleDropdownToggle} />
            {showDropdown && (
              <ul className='dropdown-menu'>
                <React.Fragment>
                  <li key="profile">
                    <button onClick={() => navigate('/profil')}>Profilim</button>
                  </li>
                  <li key="logout">
                    <button onClick={handleLogout}>Çıkış Yap</button>
                  </li>
                </React.Fragment>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
