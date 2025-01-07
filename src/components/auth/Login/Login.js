/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import './Login.css';
import Logo from '../../../assets/img/logo-white.png';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { 
        resetAuthState, 
        login,
        isLoading,
        message, 
        setMessage,
        isFadingOut, 
        isAuthenticated } = useAuth();

    useEffect(() => {
        resetAuthState();
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setMessage('');

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        await login(formData);

    }

    return (
        <div className={`login-body ${isFadingOut ? 'fade-out' : ''}`}>
            <div className='login-body-fit'>
                <div className='login-title-container'>
                    <Link to='/'>
                        <img src={Logo} alt="Logo" className='login-logo' />
                    </Link>
                </div>
                <div className='login-container'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    {isLoading && <div className="loading-spinner"></div>}
                    <p>
                        Don't have an account? <Link to="/register" className='regis-container'>Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;