import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User data
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth status
    const [message, setMessage] = useState(''); // Response messages
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [isFadingOut, setIsFadingOut] = useState(false);

    const navigate = useNavigate(); // For navigation

    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Check if the user is authenticated (persistent session)
    const checkAuthStatus = async () => {
        try {
            // Validate the JWT token (via AuthService)
            const response = await AuthService.getCurrentUser();
            if (response.data.id) {
                setUser(response.data); // Set user data
                setIsAuthenticated(true); // Mark as authenticated
            } else {
                setIsAuthenticated(false); // Not authenticated
                setUser(null); // Clear user data
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        } 
    };

    // Register user
    const register = async (userData) => {
        setIsLoading(true);
        try {
            const response = await AuthService.register(userData);
            setTimeout(() => {
                setMessage(response.message || 'Registration successful');
                setIsLoading(false);
            }, 1500)
            setTimeout(() => {
                navigate('/login'); // Redirect to login after registration
            }, 2000)
        } catch (error) {
            setTimeout(() => {
                setMessage(error.message || 'Registration failed');
                setIsLoading(false);
            }, 1000)
        } 
    };

    // Login user
    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await AuthService.login(credentials);
            setUser(response.user); // Set user data
            setTimeout(() => {
                setMessage(response.message || 'Login successful');
                navigate('/'); // Redirect to homepage
                setIsLoading(false);
                setIsAuthenticated(true); // Mark as authenticated
            }, 1500) 
        } catch (error) {
            setTimeout(() => {
                setMessage(error.message || 'Login failed');
                setIsLoading(false);
            }, 1000)
        }
    };

    // Logout user
    const logout = async () => {
        setIsLoading(true);
        try {
            await AuthService.logout();
            setUser(null); // Clear user data
            setIsAuthenticated(false); // Mark as unauthenticated
            setTimeout(() => {
            navigate('/login'); // Redirect to login
            setIsLoading(false);
            }, 1500)
        } catch (error) {
            setMessage('Logout failed.');
        }
    };

    // Reset auth state messages
    const resetAuthState = () => {
        setMessage('');
    };

    // Context value
    const value = {
        user,
        isAuthenticated,
        message,
        isLoading,
        isFadingOut,
        setIsFadingOut,
        setMessage,
        setIsLoading,
        register,
        login,
        logout,
        resetAuthState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
