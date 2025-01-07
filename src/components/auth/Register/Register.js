import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext';
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const { resetAuthState, register, message, isLoading, setIsLoading, setMessage } = useAuth();
    

    useEffect(() => {
            resetAuthState();
        }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setMessage('');
        
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        await register(formData);
        
    };

    return (
        <div className='register-body'>
            <div className="register-container">
                <Link to="/login" className="back-button">↩</Link>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="E.g. Udin" />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="E.g. Sihombing" />
                    </div>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
                    </div>
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
                </form>

                {message && (
                    <p className="message">{message}</p>
                )}
                {isLoading && <div className='loading-spinner'></div>}

                <p>
                    Already have an account? <Link to="/login" className='regis-container'>Login here</Link>
                </p>
            </div>
        </div>
    )
}

export default Register