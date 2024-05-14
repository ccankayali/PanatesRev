import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Item.css"
export const Item = ({ addToCart }) => {
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
        console.log(data);
        setItems(data); // Gelen verileri state'e set et
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []); // useEffect sadece bir kere çalışsın, boş bağımlılık array'i kullanılır
  const addToCartHandler = (serviceId) => {
    fetch(`http://localhost:3000/providers/addToCart/${serviceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLoggedIn,
        // Giriş durumuna göre gerekirse diğer başlıkları ekleyebilirsiniz (örneğin, yetkilendirme başlığı)
      },
      // Gönderilecek veri olmadığı için body kısmı boş bırakıldı
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // İsteğin başarılı olması durumunda isteğin yanıtını işleyebilirsiniz
        console.log("Response data:", data);
        // Eğer addToCart fonksiyonu ile ilgili bir işlem yapmak gerekiyorsa burada çağırabilirsiniz
        addToCart(data.serviceId); // Örnek olarak, servis ID'sini addToCart fonksiyonuna eklemek
      })
      .catch((error) => {
        alert("Ürün sepette mevcut");
      });
  };

  return (
    <div>
      <div className="card-container">
        {items.map((items) => (
          <div className="card" key={items._id}>
            <div className="info">
              <h3>{items.name}</h3>
              <p>{items.description}</p>
              <p>{items.category}</p>
            </div>
            <div>{!isLoggedIn ? (
                    <Link to="/login"><button>Sepete Ekle</button ></Link>
                ) : (
                    <button onClick={() => addToCartHandler(items._id)}>Sepete Ekle</button >
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
