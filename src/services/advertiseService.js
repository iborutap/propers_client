import axiosInstance from "../utils/axiosConfig";

const AdvertiseService = {
    async addProduct(productData) {
        try {
            const response = await axiosInstance.post('/advertise', productData);
            return response.data
        } catch (error) {
            throw this.handleError(error);
        }
    },

    handleError(error) {
        if (error.response?.data?.message) {
            return new Error(error.response.data.message);
        }
        return new Error(error.message || 'An unexpected error occured');
    }
}

export default AdvertiseService;