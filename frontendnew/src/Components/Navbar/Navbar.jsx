import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../Assets/logo2.png";
import { AuthContext } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ size }) => {
  const { isAuthenticated, userData, cartItemCount } =
    React.useContext(AuthContext);

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
              login(data.roles[0]);

              setToken(true);
              console.log("token", token);
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    navigate("/");
    window.location.reload();
  };

  const handleUserClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };
  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const menu = (
    <Menu>
      {isAuthenticated ? (
        <>
          <Menu.Item key="1" onClick={() => navigate("/services")}>
            Hizmetlerim
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate("/profil")}>
            Profilim
          </Menu.Item>
          <Menu.Item key="3" onClick={handleLogout}>
            Çıkış Yap
          </Menu.Item>
        </>
      ) : null}
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Hizmetlerimiz</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <Dropdown.Button
          overlay={menu}
          placement="bottomRight"
          icon={<UserOutlined />}
          onClick={handleClick}
        >
          {isAuthenticated
            ? userData && userData.name
              ? userData.name
              : "Kullanıcı"
            : "Giriş Yap"}
        </Dropdown.Button>
        <Badge count={size} className="cart-badge">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={handleUserClick}
          >
            Sepet
          </Button>
        </Badge>
      </div>
    </div>
  );
};

export default Navbar;
