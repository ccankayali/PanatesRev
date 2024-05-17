import React, { useState, useEffect } from "react";
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
  const { user, cartItemCount } = React.useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (serviceId) => {
    const newItem = { serviceId };
    setCartItems([...cartItems, newItem]);
  };
  const isProviderRoute = window.location.pathname.startsWith("/provider");
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const ProtectedRoute = ({ role, element: Component, ...rest }) => {
    const isAuthorized = user === role;
    if (!isAuthorized) {
      console.log("Unauthorized access, redirecting to login");
    }

    return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
  };
  return (
    <BrowserRouter>
      <div className="app-container">
      {!isProviderRoute && <Navbar size={cartItemCount}/>}
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Item addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  size={cartItems.length}
                />
              }
            />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/login" element={<LoginSignup />} />

            <Route
              path="/provider"
              element={<ProtectedRoute role={"2"}></ProtectedRoute>}
            >
              <Route
                path=""
                element={
                  <div className="dashboard-container">
                    <span>selm</span>
                    <Header toggleSidebar={toggleSidebar} />
                    <Sidebar
                      openSidebarToggle={openSidebar}
                      OpenSidebar={toggleSidebar}
                    />
                    <Home />
                  </div>
                }
              />
            </Route>
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
