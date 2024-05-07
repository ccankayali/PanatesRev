import React, { useState, useEffect } from "react";

import "./Cart.css";
export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemDetails, setCartItemDetails] = useState([]);
  const token = sessionStorage.getItem("token");
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  useEffect(() => {
    const fetchCartItemDetails = async (productId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/services/getService/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Error fetching cart item details:", error);
        return null;
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/providers/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCartItems(data);
        const details = await Promise.all(
          data.map((item) => fetchCartItemDetails(item))
        );
        setCartItemDetails(details.filter(Boolean)); // Filter out null values
        setIsCartEmpty(details.length === 0);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [token]);
  const handleBuy = async (serviceId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/providers/services/${serviceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // If successful, clear the cart
      setCartItems(cartItems.filter((item) => item._id !== serviceId));
      setCartItemDetails(
        cartItemDetails.filter((item) => item._id !== serviceId)
      );

      alert("Ürünler başarıyla satın alındı!");
    } catch (error) {
      console.error("Error buying items:", error);
      alert("Ürünleri satın alırken bir hata oluştu.");
    }
  };
  const handleBuyAll = async () => {
    try {
      // Tüm ürünlerin Id'lerini bir diziye topla
      const productIds = cartItemDetails.map((item) => item._id);

      // Her bir ürün için satın alma işlemini gerçekleştir
      for (const productId of productIds) {
        const response = await fetch(
          `http://localhost:3000/providers/services/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      }

      // Tüm ürünler başarıyla satın alındığında, sepeti temizle
      setCartItems([]);
      setCartItemDetails([]);

      // Kullanıcıya başarı mesajı göster
      alert("Tüm ürünler başarıyla satın alındı!");
    } catch (error) {
      console.error("Error buying items:", error);
      alert("Ürünleri satın alırken bir hata oluştu.");
    }
  };
  // const removeService = async (productId) => {
  //   try {
  //     // Tüm ürünlerin Id'lerini bir diziye topla

  //     // Her bir ürün için satın alma işlemini gerçekleştir

  //     const response = await fetch(
  //       `http://localhost:3000/providers/removeService/${productId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     // Tüm ürünler başarıyla satın alındığında, sepeti temizle
  //     const newCartItems = cartItems.filter(
  //       (item) => item._id !== productId
  //     );
  //     const newCartItemDetails = cartItemDetails.filter(
  //       (item) => item._id !== productId
  //     );
  //     setCartItems(newCartItems);
  //     setCartItemDetails(newCartItemDetails);

  //     // Kullanıcıya başarı mesajı göster
  //     alert("ürün başarıyla kaldırıldı!");
  //   } catch (error) {
  //     console.error("Error buying items:", error);
  //     alert("Ürünleri satın alırken bir hata oluştu.");
  //   }
  // };
  const handleRemoveItem = (productId) => {
    const newCartItems = cartItems.filter((item) => item._id !== productId);
    const newCartItemDetails = cartItemDetails.filter(
      (item) => item._id !== productId
    );
    setCartItems(newCartItems);
    setCartItemDetails(newCartItemDetails);
  };

  return (
    <div>
      {isCartEmpty ? (
        <p>Üzgünüm, sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Açıklama</th>
              <th>Kategori</th>
            </tr>
          </thead>
          <tbody>
            {cartItemDetails.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>
                  <button >Ürünü Kaldır</button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isCartEmpty && <button onClick={() => handleBuyAll()}>Satın Al</button>}
    </div>
  );
};
