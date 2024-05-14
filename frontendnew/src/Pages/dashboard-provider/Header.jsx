import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  const [token] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      {/* <div className='header-left'>
        <BsSearch className='icon' />
      </div> */}
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
