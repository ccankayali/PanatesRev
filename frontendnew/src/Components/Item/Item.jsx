import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { AuthContext } from "../../Context/auth-context";
import "./Item.css"

export const Item = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = sessionStorage.getItem("token");
  const { cartItemCount, setCartItemCount } = React.useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const addToCartHandler = (serviceId) => {
    fetch(`http://localhost:3000/providers/addToCart/${serviceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLoggedIn,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        addToCart(data.shopCart[data.shopCart.length - 1]);
        setCartItemCount(prevCount => prevCount + 1);
        toast.success("Ürün sepete eklendi");
      })
      .catch((error) => {
        toast.error("Ürün sepette mevcut");
      });
  };

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  return (
    <div>
      
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Ürün adıyla ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-container">
        {filteredItems.map((item) => (
          <div className="card" key={item._id}>
            <div className="info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.category}</p>
            </div>
            <div>
              {!isLoggedIn ? (
                <Link to="/login"><button>Sepete Ekle</button></Link>
              ) : (
                <><Toaster /><button onClick={() => addToCartHandler(item._id)}>Sepete Ekle</button></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
