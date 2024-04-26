import React, { useState } from 'react';
import "./CSS/LoginSignup.css";
import { useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'user', // Varsayılan olarak 'user'
        companyName: '', // Şirket adı
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? 'login_user' : 'signup_user';
            const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(formData);
            const data = await response.json();
            console.log(data);

            if (response.status === 201) {
                if (isLogin) {
                    setIsLogin(true);
                    // Navbar'daki oturum durumunu güncelle
                    navigate('/');
                } else {
                    console.log('Signup successful!');
                    navigate('/');
                }
            } else {
                console.error(`${isLogin ? 'Login' : 'Signup'} failed:`, data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{isLogin ? "Login" : "Sign Up"}</h1>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input type='text' name='name' placeholder='Your Name' value={formData.name} onChange={handleChange} />
                    )}
                    <input type='email' name='email' placeholder='Email Address' value={formData.email} onChange={handleChange} />
                    <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                    {/* Company inputunu sadece kayıt esnasında göster */}
                    {!isLogin && (
                        <div>
                            <label>
                                <input type='radio' name='userType' value='user' checked={formData.userType === 'user'} onChange={handleChange} />
                                User
                            </label>
                            <label>
                                <input type='radio' name='userType' value='company' checked={formData.userType === 'company'} onChange={handleChange} />
                                Company
                            </label>
                            {formData.userType === 'company' && (
                                <input type='text' name='companyName' placeholder='Company Name' value={formData.companyName} onChange={handleChange} />
                            )}
                        </div>
                    )}
                    <button type='submit'>{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                <p className='loginsignup-login'>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up here" : "Login here"}</span>
                </p>
                <div className='loginsignup-agree'></div>
            </div>
            
        </div>
    );
};
