import axiosInstance from '../utils/axiosConfig';

const AuthService = {
    async register(userData) {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async login(credentials) {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async logout() {
        try {
            await axiosInstance.post('/auth/logout');
            document.cookie = 'propers_sid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    },

    async getCurrentUser() {
        try {
            const response = await axiosInstance.get('/auth/me');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    handleError(error) {
        if (error.response?.data?.message) {
            return new Error(error.response.data.message);
        }
        return new Error(error.message || 'An unexpected error occurred');
    },
};

export default AuthService;
