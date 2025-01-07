import axios from 'axios';

// Select base URL based on environment
const baseURL =
    process.env.REACT_APP_ENV === 'development'
        ? process.env.REACT_APP_API_BASE_URL_DEV
        : process.env.REACT_APP_API_BASE_URL_PROD;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)') ? 
            document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)').pop() : 
            localStorage.getItem('propers_sid');
            
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Instead of forcefully clearing all sessions, notify the user
            console.warn('Session expired.');

        } else if (error.response?.status === 403) {
            console.error('Forbidden request. You do not have access.');
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;