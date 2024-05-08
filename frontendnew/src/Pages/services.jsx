import React, { useEffect, useState } from "react";
import "../Pages/CSS/services.css";

const Services = () => {
    const [services, setServices] = useState([]);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await fetch("http://localhost:3000/providers/services", {
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
          setServices(data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
  
      fetchServices();
    }, [token]);

  return (
    <div className="services-container">
      <h1>Şirketin Hizmetleri</h1>
      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-item">
            <h2>{service.name}</h2>
            <p>Açıklama: {service.description}</p>
            <p>Kategori: {service.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
