import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosConfig";
import AdvertiseService from '../services/advertiseService';

const AdvertiseContext = createContext();

export const AdvertiseProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState([]);
    const [category, setCategory] = useState([]);
    const [provence, setProvence] = useState([]);
    const [district, setDistrict] = useState([]);
    const [subdistrict, setSubdistrict] = useState([]);
    const [village, setVillage] = useState([]);

    useEffect(() => {
        fetchPrice();
        fetchCategory();
        fetchProvences();
    }, [])

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

    const fetchProvences = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/locations/provence');
            setProvence(response.data);
        } catch (error) {
            setMessage(error.message || 'Failed to fetch provences');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressChange = async (name, value) => {
        try {
            setIsLoading(true);

            switch (name) {
                case 'provence':
                    const districtResponse = await axiosInstance.get(`/locations/district?provence=${value}`);
                    setDistrict(districtResponse.data);
                    setSubdistrict([]);
                    setVillage([]);
                    break;

                case 'district':
                    const subdistrictResponse = await axiosInstance.get(`/locations/subdistrict?district=${value}`);
                    setSubdistrict(subdistrictResponse.data);
                    setVillage([]);
                    break;

                case 'subdistrict':
                    const villageResponse = await axiosInstance.get(`/locations/village?subdistrict=${value}`);
                    setVillage(villageResponse.data);
                    break;

                default:
                    break;
            }
        } catch (error) {
            setMessage(error.message || `Failed to fetch ${name} data`);
        } finally {
            setIsLoading(false);
        }
    };

    const newProduct = async (productData) => {
        setIsLoading(true);
        try {
            const response = await AdvertiseService.addProduct(productData);
            setTimeout(() => {
                setMessage(response.message || 'Product has been published successfully.');
                setIsLoading(false);
            }, 1500)
        } catch (error) {
            setTimeout(() => {
                setMessage(error.message || 'Failed to publish Product...');
                setIsLoading(false);
            }, 1000)
        }
    }

    const value = {
        price,
        category,
        provence,
        district,
        subdistrict,
        village,
        message,
        isLoading,
        handleAddressChange,
        setIsLoading,
        newProduct,
        setMessage,
    };

    return (
        <AdvertiseContext.Provider value={value}>
            {children}
        </AdvertiseContext.Provider>
    );
};

export const useAdvertise = () => {
    const context = useContext(AdvertiseContext);
    if (!context) {
        throw new Error('useAdvertise must be used within an AdvertiseProvider')
    }
    return context;
};

export default AdvertiseProvider;