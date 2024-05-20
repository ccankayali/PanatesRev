import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import "./Cart.css";
import { AuthContext } from "../Context/auth-context";
export const Cart = ({ cartItems, setCartItems, size }) => {
  const [cartItemDetails, setCartItemDetails] = useState([]);
  const [loading,setLoading]=useState(false)
  const token = sessionStorage.getItem("token");
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const { cartItemCount,setCartItemCount } =
  React.useContext(AuthContext);
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
  }, [token,loading]);
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
          throw new Error(
            `Sepetiniz de daha önce satın alınan hizmet tespit edilmiştir.`
          );
        }
      }

      // Tüm ürünler başarıyla satın alındığında, sepeti temizle
      setCartItems([]);
      setCartItemDetails([]);

      // Kullanıcıya başarı mesajı göster
      toast.success("Tüm ürünler başarıyla satın alındı!");
    } catch (error) {
      console.error("Error buying items:", error);
      alert("Ürünleri satın alırken bir hata oluştu: " + error.message);
    }
  };

  const removeService = async (productId) => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://localhost:3000/providers/removeService/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
        
      );
      if (!response.ok) {
        setLoading(false)
        throw new Error("Network response was not ok");
      }

      const newCartItems = cartItems.filter((item) => item._id !== productId);
      const newCartItemDetails = cartItemDetails.filter(
        (item) => item._id !== productId
      );
      //burası 1
      setCartItems(newCartItems);
      setCartItemCount(prevCount => prevCount - 1)
      console.log(cartItemCount);
      setCartItemDetails(newCartItemDetails);
      toast.success("ürün başarıyla kaldırıldı!");
      setLoading(false)
    } catch (error) {
      console.error("Error buying items:", error);
      setLoading(false)
      alert("Ürün kaldırılırken bir hata oluştu.");
    }
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
                  <Toaster />
                  <button onClick={() => removeService(item._id)}>
                    Ürünü Kaldır
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster />
      {!isCartEmpty && <button onClick={() => handleBuyAll()}>Satın Al</button>}
    </div>
  );
};
