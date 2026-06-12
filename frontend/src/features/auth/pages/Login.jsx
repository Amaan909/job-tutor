import React from 'react'
import { useState } from 'react';
import '../auth.form.scss'
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from 'react-router'

const Login = () => {
    const {isLoading, handleLogin} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required";
        if (!password.trim()) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            await handleLogin({email, password});
            navigate("/");
        } catch (err) {
            if (err?.response?.status === 400) {
                setServerError(err.response.data.message);
            } else {
                setServerError("Something went wrong. Please try again.");
            }
        }
    }

    if(isLoading){
        return <main className="loading"><h1>Loading...</h1></main>
    }


  return (
    <main>
        <div className="form-container">
            <h1 id="form-title">Login</h1>
            {serverError && (
                <p className="error-banner">{serverError}</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => {setEmail(e.target.value)
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                    }} 
                    
                    type="email" id="email" name="email" placeholder="Enter your email" />
                     {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e) => {setPassword(e.target.value)
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                    }} 
                    type="password" id="password" name="password" placeholder="Enter your password" />
                     {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                <button className="button primary-button">Login</button>
            </form>
            <p className="redirect-link">Don't have an account? <a href="/register">Register here</a></p>
        </div>
    </main>
  )
}

export default Login