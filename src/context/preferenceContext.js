import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosConfig';
import PreferenceService from '../services/preferenceService';

const PreferenceContext = createContext();

export const PreferenceProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState([]);
    const [category, setCategory] = useState([]);
    const [userPreferenceData, setUserPreferenceData] = useState([]);
    
    useEffect(() => {
        fetchPrice();
        fetchCategory();
        checkPreference();
    },[]);

    const checkPreference = async () => {
        try {
            const response = await axiosInstance.get('/profile');
            // Check if preference is null or an empty array
            if (!response.data.preference || response.data.preference.length === 0) {
                setUserPreferenceData(null);
            } else {
                setUserPreferenceData(response.data.preference);
            }
    
        } catch (error) {
            console.error('Preference Error:', error.response || error);
            if (error.response?.status === 404) {
                setUserPreferenceData(null);
            } else {
                setMessage(error.response?.data?.message || 'Failed to fetch User Preferences');
                setUserPreferenceData(null);
            }
        }
    };

    const fetchPrice = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/preference/price');
            setPrice(response.data);
        } catch (error) {
            setMessage(error.message || 'Failed to fetch price category');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategory = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/preference/category');
            setCategory(response.data);
        } catch (error) {
            setMessage(error.message || 'Failed to fetch provences');
        } finally {
            setIsLoading(false);
        }
    };

    const newPreference = async (userData) => {
        setIsLoading(true);
        try {
            const response = await PreferenceService.addPreference(userData);
            setTimeout(() => {
                setMessage(response.message || 'Preferences has been saved successfully.');
                setIsLoading(false);
            }, 1500)
        } catch (error) {
            setTimeout(() => {
                setMessage(error.message || 'Failed to save Preference...');
                setIsLoading(false);
            }, 1000)
        }
    }

    const value = {
        userPreferenceData,
        price,
        category,
        message,
        isLoading,
        setIsLoading,
        newPreference, 
        setMessage,
    };

    return (
        <PreferenceContext.Provider value={value}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreference = () => {
    const context = useContext(PreferenceContext);
    if (!context) {
        throw new Error('usePreference must be used within an PreferenceProvider');
    }
    return context;
};

export default PreferenceProvider;