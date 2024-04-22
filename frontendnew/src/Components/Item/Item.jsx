import React, { useState, useEffect } from 'react';

export const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Nest.js backend'den verileri getir
    fetch('http://localhost:3000/services') // uygun endpoint'i kullanın
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data); // Gelen verileri state'e set et
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []); // useEffect sadece bir kere çalışsın, boş bağımlılık array'i kullanılır

  const addToCart = (itemId) => {
    // Sepete ekleme işlemleri burada gerçekleştirilir
    console.log(`Item with ID ${itemId} added to cart`);
  };

  return (
    <div>
      <h2>Items</h2>
      <div className="card-container">
        {items.map(item => (
          <div className="card" key={item.id}>
            <img src="/cloud_computing.svg" alt="Cloud Computing" className="cloud-image" />
            <div className="info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.category}</p>
            </div>
            <button onClick={() => addToCart(item.id)}>Sepete Ekle</button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .card {
          width: 300px;
          margin: 10px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: hidden; /* Resmin kartın sınırlarını aşmasını engellemek için */
        }

        .cloud-image {
          width: 100%; /* Resmi kart genişliğine sığdırmak için */
        }

        .info {
          padding: 20px;
        }

        h3 {
          margin-top: 0;
        }

        p {
          margin: 5px 0;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};
