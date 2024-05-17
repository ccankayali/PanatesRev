import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const isLoggedIn = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");
  const [cartItemCount, setCartItemCount] = useState(0); 

  useEffect(() => {
    const fetchUserData = async () => {
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
        console.log( data);
        if (data._id) {
          const userRole = data.roles[0].toString();
          sessionStorage.setItem("userRole", userRole);
          setIsAuthenticated(true);
          setUser(userRole);
          setToken(true);
          setUserData(data);
          setCartItemCount(data.shopCart.length);
        } else {
          setToken(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userRole) {
      setIsAuthenticated(true);
      setUser(userRole);
    }
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userData,cartItemCount,setCartItemCount }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
