import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosConfig';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [provence, setProvence] = useState([]);
    const [district, setDistrict] = useState([]);
    const [subdistrict, setSubdistrict] = useState([]);
    const [village, setVillage] = useState([]);

    useEffect(() => {
        fetchProvences();
    }, []);

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

    const resetAddressState = () => {
        setMessage('');
        setIsLoading(false);
        setDistrict([]);
        setSubdistrict([]);
        setVillage([]);
    };

    const value = {
        provence,
        district,
        subdistrict,
        village,
        message,
        isLoading,
        setMessage,
        setIsLoading,
        handleAddressChange,
        resetAddressState
    };

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddress must be used within an AddressProvider');
    }
    return context;
};

export default AddressProvider;