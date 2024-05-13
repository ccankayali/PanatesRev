// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo2.png";
import cart_icon from "../Assets/cart_icon.png";
import { AuthContext } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import AuthHandler from "../../Context/AuthHandler";
import "./Navbar.css";
const Navbar = ({ data }) => {
  const { isAuthenticated, user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Hizmetlerimiz</Link>
        </li>
        <li>
          <Link to="/şirketler">Şirketler</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {!isAuthenticated ? (
          <Link to="/login">
            <button>Giriş Yap</button>
          </Link>
        ) : (
          <div className="nav-dropdown">
            <button onClick={handleLogout}>Çıkış Yap</button>
            <div className="nav-dropdown">
              {data && data.name && <button>{data.name}</button>}
              <ul>
                <li>
                  <Link to="/services">Hizmetlerim</Link>
                </li>
                <li>
                  <Link to="/profil">Profilim</Link>
                </li>
              </ul>
              <div className="nav-dropdown-content"></div>
            </div>
          </div>
        )}
        <Link to="/cart">
          <button>
            <img src={cart_icon} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
