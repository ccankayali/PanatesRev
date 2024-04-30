import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const isLoggedIn = sessionStorage.getItem("token");
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        if (isLoggedIn) {
          try {
            const response = await fetch(
              `http://localhost:3000/auth/get-user-or-company-by-token`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + isLoggedIn, // Burada isLoggedIn muhtemelen token değil, kullanıcı kimliği olmalı
                },
              }
            );

            const data = await response.json();
            console.log(data);
            if (data._id) {
              setToken(true);
            } else {
              setToken(false);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };

      fetchUserData(); // fetchUserData fonksiyonunu çağırın
    }
  }, [isLoggedIn]);
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>PANATES</p>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Hizmetler</Link>
        </li>
        <li>
          <Link to="/şirketler">Şirketler</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {!token ? (
          <Link to="/login">
            <button>login</button>
          </Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
        <Link to="/cart">
          <button>
            {" "}
            <img src={cart_icon} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
