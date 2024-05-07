import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { user } = React.useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "", // Başlangıçta varsayılan değer "individual" olarak ayarlandı
    companyName: "", // Şirket adı varsayılan olarak boş olarak ayarlandı
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "login_provider" : "signup_provider";
      const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Giriş Bilgileri", formData);
      const data = await response.json();
      console.log("asdasdasd", data);

      if (response.status === 201) {
        if (isLogin) {
          sessionStorage.setItem("token", data.token);
          //sessionStorage.setItem("userRole", data.roles[0] || 0)
          // todo: login(data.roles[0]);
          //login(2);
          // login(data.roles[0]);
          // Navbar'daki oturum durumunu güncelle
          console.log(user);
          user === "2" ? navigate("/provider") : navigate("/");
        } else {
          console.log("Signup successful!");
          setIsLogin(true);
        }
      } else {
        console.error(
          `${isLogin ? "Login" : "Signup"} failed:`,
          data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {/* Company inputunu sadece kayıt esnasında göster */}
          {!isLogin && (
            <div>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="individual"
                  checked={formData.userType === "individual"}
                  onChange={handleChange}
                />
                Individual
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="company"
                  checked={formData.userType === "company"}
                  onChange={handleChange}
                />
                Company
              </label>
              {formData.userType === "company" && (
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              )}
            </div>
          )}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="loginsignup-login">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up here" : "Login here"}
          </span>
        </p>
        <div className="loginsignup-agree"></div>
      </div>
    </div>
  );
};
