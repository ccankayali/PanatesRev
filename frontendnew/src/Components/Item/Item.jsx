import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Item.css"
export const Item = () => {
  const [items, setItems] = useState([]);
  const isLoggedIn = sessionStorage.getItem("token");

  useEffect(() => {
    // Nest.js backend'den verileri getir
    fetch("http://localhost:3000/services") // uygun endpoint'i kullanın
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data); // Gelen verileri state'e set et
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []); // useEffect sadece bir kere çalışsın, boş bağımlılık array'i kullanılır
  const addToCart = (itemId) => {
    // Sepete ekleme işlemleri burada gerçekleştirilir
    console.log(`Item with ID ${itemId} added to cart`);
  };

  return (
    <div>
      <div className="card-container">
        {items.map((items) => (
          <div className="card" key={items._id}>
            <img
              src="/cloud_computing.svg"
              alt="Cloud Computing"
              className="cloud-image"
            />
            <div className="info">
              <h3>{items.name}</h3>
              <p>{items.description}</p>
              <p>{items.category}</p>
            </div>
            <div>{!isLoggedIn ? (
                    <Link to="/login"><button>Sepete Ekle</button ></Link>
                ) : (
                    <button onClick={() => addToCart(items.name)}>Sepete Ekle</button >
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
