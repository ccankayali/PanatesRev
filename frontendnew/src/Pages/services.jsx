import React, { useEffect, useState } from "react";
import "../Pages/CSS/services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/providers/services",
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
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [token]);
  useEffect(()=>{
    const checkComment = async () =>{
      const commentControl = await fetch(
        `http://localhost:3000/providers/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!commentControl.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await commentControl.json()
      setSubmittedComments(data)
    }
    checkComment()
  },[token])

  const handleOpenCommentPopup = (serviceId) => {
    setCurrentServiceId(serviceId);
    setShowCommentPopup(true);
  };

  const handleCloseCommentPopup = () => {
    setShowCommentPopup(false);
    setCurrentServiceId(null);
    setComment("");
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
 
  
  const handleSubmitComment = async () => {
    try {
      
      if (submittedComments.includes(currentServiceId)) {
        alert("Bu hizmete daha önce yorum yaptınız.");
        return;
      }

      const commentData = {
        service: currentServiceId,
        commit_details: comment,
      };

      const response = await fetch(
        `http://localhost:3000/comments/userComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error("Yorum gönderme işlemi başarısız oldu");
      }

      alert("Yorumunuz başarıyla gönderildi!");

      setSubmittedComments((prevComments) => [
        ...prevComments,
        currentServiceId,
      ]);

      handleCloseCommentPopup();
    } catch (error) {
      console.error("Error while submitting comment:", error);

      alert("Yorum gönderme işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="services-container">
      <table className="services-table">
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Açıklama</th>
            <th>Yorum Yap</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan={3}>Şu anda herhangi bir hizmet bulunmuyor.</td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>
                  <button
                    disabled={submittedComments.includes(service._id)}
                    className={
                      submittedComments.includes(service._id)
                        ? "comment-submitted"
                        : ""
                    } // Disable button if comment submitted
                    onClick={() => handleOpenCommentPopup(service._id)}
                  >
                    {submittedComments.includes(service._id)
                      ? "Yorum Yapıldı"
                      : "Yorum Yap"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showCommentPopup && currentServiceId && (
        <div className="comment-popup">
          <div className="comment-popup-header">
            <h2>
              {services.find((item) => item._id === currentServiceId)?.name} için
              Yorum Yap
            </h2>
            <button onClick={handleCloseCommentPopup}>X</button>
          </div>

          <div className="comment-popup-content">
            <textarea
              value={comment}
              onChange={handleChangeComment}
              placeholder="Yorumunuzu yazın..."
            />
            <button onClick={handleSubmitComment}>Gönder</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
