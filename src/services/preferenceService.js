import axiosInstance from "../utils/axiosConfig";

const PreferenceService = {
    async addPreference(userData) {
        try {
            const response = await axiosInstance.post('/profile/preference', userData);
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
    }
    
}

export default PreferenceService;