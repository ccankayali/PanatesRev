import React from 'react';
import "./signup.css";
import { useNavigate } from "react-router-dom";


export function SignUp() {
    
    const { navigate } = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/auth/signup_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.name.value,
                email: e.target.email,
                password: e.target.password.value
            })
        }).then(response => {
            navigate('/login')
            response.json()}).catch(error => console.log(error))
    }

    return(
        <div class="container">
        <h1>SignUp</h1>
        <form action="" method="post" onSubmit={handleSubmit}>
            <label for="name">Adınız</label>
            <input type="text" id="logname" name="logname" required/>

            {/* <label for="username">Username</label>
            <input type="text" id="username" name="username" required/> */}

            <label for="email">Email address</label>
            <input type="email" id="logemail" name="logemail" required/>

            <label for="password">Password</label>
                    <input type="password" id="logpass" name="logpass" required />

                    {/* <label for="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" required /> */}

                    <button type="submit">Sign up</button>
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                </form>
            </div>
    )
    

}