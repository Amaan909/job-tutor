import React from 'react'
import {Link} from 'react-router'
import { useState } from 'react';
import {useAuth} from '../hooks/useAuth';
import {useNavigate} from 'react-router'

const Register = () => {
    const {isLoading, handleRegister} = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle login logic here
        await handleRegister({username, email, password});
        navigate("/login");

    }

    if(isLoading){
        return <main><h1>Loading...</h1></main>
    }

  return (
    <main>
        <div className="form-container">
            <h1 id="form-title">Register your account</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    onChange={(e) => {setUsername(e.target.value)}}
                    type="text" id="username" name="username" placeholder="Enter your username" />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e) => {setEmail(e.target.value)}}
                    type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e) => {setPassword(e.target.value)}}
                    type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button className="button primary-button">Register</button>
            </form>
            <p className="redirect-link">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    </main>
  )
}

export default Register