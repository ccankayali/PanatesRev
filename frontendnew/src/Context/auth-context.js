import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("userRole");
    if (storedToken) {
      fetchUserData(storedToken);
    }
    if (userRole) {
      setUser(userRole);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/get-user-or-company-by-token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();
      if (data._id) {
        const userRole = data.roles && data.roles.length > 0 ? data.roles[0].toString() : null;
        if (userRole) {
          sessionStorage.setItem("userRole", userRole);
          setIsAuthenticated(true);
          setUser(userRole);
          setToken(token);
          setUserData(data);
          setCartItemCount(data.shopCart ? data.shopCart.length : 0);
        } else {
          console.error("Roles are undefined or empty");
          setToken(null);
          setIsAuthenticated(false);
        }
      } else {
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  const login = (token, userRole) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userRole", userRole);
    setIsAuthenticated(true);
    setUser(userRole);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userData, cartItemCount, setCartItemCount, login, setToken, setUserData, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
