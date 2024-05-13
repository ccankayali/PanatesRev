// AuthHandler.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import AuthUserDropdown from "../Components/Navbar/AuthUserDropdown";
import Navbar from "../Components/Navbar/Navbar";
const AuthHandler = () => {
  const { login, logout } = React.useContext(AuthContext);
  const isLoggedIn = sessionStorage.getItem("token");
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    navigate("/");
    window.location.reload();
  };

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


};

export default AuthHandler;
