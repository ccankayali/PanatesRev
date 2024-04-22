import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Oturum durumu

    // Çıkış işlemi
    const handleLogout = () => {
        setIsLoggedIn(false); // Oturum durumunu false yaparak çıkış yap
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>PANATES</p>
            </div>
            <ul className="nav-menu">
                <li><Link to="/">Hizmetler</Link></li>
                <li><Link to="/şirketler">Şirketler</Link></li>
            </ul>
            <div className="nav-login-cart">
                {/* Oturum durumuna göre butonu ayarla */}
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login"><button>Login</button></Link>
                )}
                <Link to="/cart"><button> <img src={cart_icon} alt="" /></button></Link>
                <div className="nav-cart-count"></div>
            </div>
        </div>
    );
};

export default Navbar;
