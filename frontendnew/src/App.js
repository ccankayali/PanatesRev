import React, { useState } from "react";
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
import Header from "./Pages/dashboard-provider/Header";
import Home from "./Pages/dashboard-provider/Home";
import Sidebar from "./Pages/dashboard-provider/Sidebar";
import { AuthContext } from "./Context/auth-context";
import "./App.css"; // import your combined CSS file

function App() {
  const {  user } = React.useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);

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
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/shops" element={<Shop category="companies" />} />
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
