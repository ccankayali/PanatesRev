import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo2.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth-context";
const Navbar = () => {
  const { login } = React.useContext(AuthContext);
  const isLoggedIn = sessionStorage.getItem("token");
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        if (isLoggedIn) {
          try {
            const response = await fetch(
              "http://localhost:3000/auth/get-user-or-company-by-token",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + isLoggedIn,
                },
              }
            );

            const data = await response.json();

            if (data._id) {
              sessionStorage.setItem("userRole", data.roles[0].toString() || 0);
              login(data.roles[0].toString());
              
              setToken(true);
              console.log("token",token);
              setUserData(data);
            } else {
              setToken(false);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, login]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
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
        {!token ? (
          <Link to="/login">
            <button>Giriş Yap</button>
          </Link>
        ) : (
          <div className="nav-dropdown">
            <button onClick={handleLogout}>Çıkış Yap</button>
          </div>
        )}
        <Link to="/cart">
          <button>
            <img src={cart_icon} alt="" />
          </button>
        </Link>
        {token && (
          <div className="nav-dropdown">
            <button>{userData.name}</button>
            <ul className="nav-dropdown-content">
              <li>
                <Link to="/sepetim">Hizmetlerim</Link>
              </li>
              <li>
                <Link to="/profil">Profilim</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
