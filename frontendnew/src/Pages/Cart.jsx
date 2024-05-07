import React, { useState, useEffect } from "react";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const isLoggedIn = sessionStorage.getItem("token");
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/providers/cart",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + isLoggedIn,
          },
        }); // Örnek endpoint'i kullanın
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setCartItems(data); // Gelen verileri state'e set et
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems(); // useEffect içinde fetchCartItems fonksiyonunu çağırın
  }, [isLoggedIn]); // useEffect sadece bir kere çalışsın, boş bağımlılık array'i kullanılır

  return (
    <div>
      <h2>Sepet</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
