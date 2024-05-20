import React, { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { Shop } from "./Pages/Shop";
import { Product } from "./Pages/Product";
import { LoginSignup } from "./Pages/LoginSignup";
import { Cart } from "./Pages/Cart";
import { Item } from "./Components/Item/Item";
import Header from "./Pages/dashboard-provider/Header";
import Home from "./Pages/dashboard-provider/Home";
import Sidebar from "./Pages/dashboard-provider/Sidebar";
import { AuthContext } from "./Context/auth-context";
import "./App.css"; // import your combined CSS file
import Services from "./Pages/services";

function App() {
  const { user } = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemName) => {
    console.log(`Item with name ${itemName} added to cart`);
    const newItem = { name: itemName };
    setCartItems([...cartItems, newItem]);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const isProviderRoute = window.location.pathname.startsWith("/provider");

  const ProtectedRoute = ({ role }) => {
    const { user } = useContext(AuthContext);
    const isAuthorized = user?.role === role;

    if (!isAuthorized) {
      console.log("Unauthorized access, redirecting to login");
    }

    return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {!isProviderRoute && <Navbar />}
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Item addToCart={addToCart} />} />
            <Route path="/şirketler" element={<Shop category="şirketler" />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route
              path="/provider"
              element={
                <ProtectedRoute role="provider">
                  <div className="dashboard-container">
                    <Header toggleSidebar={toggleSidebar} />
                    <Sidebar
                      openSidebarToggle={openSidebar}
                      OpenSidebar={toggleSidebar}
                    />
                    <Home />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
