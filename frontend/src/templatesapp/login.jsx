import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login() {
    
    const { navigate } = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/auth/login_user', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        }).then(response => {
            navigate('/signup');
            return response.json();
        }).catch(error => console.log(error));
    };
    return (
        <div className="container">
            <h1>PANATES</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="email">E-posta</label>
                <input type="text" id="email" name="email" required/>
    
                <label htmlFor="password">Parola</label>
                <input type="password" id="password" name="password" required/>
    
                <button type="submit">Oturum Aç</button>
                {/* <a href="#">Parolayı mı unuttunuz?</a> */}
                <input type="checkbox" id="remember_me" name="remember_me"/>
                <label htmlFor="remember_me">Beni hatırla</label>
            </form>
            <div className="signup">
                <p>PANATES'e katılmak ister misiniz? <a href="/signup">Şimdi kaydolun.</a></p>
            </div>
        </div>
    )
}
