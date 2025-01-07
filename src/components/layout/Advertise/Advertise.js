import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { useAdvertise } from '../../../context/advertiseContext';
import './Advertise.css';


const Advertise = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const {
        isLoading,
        setIsLoading,
        message,
        category,
        price,
        provence,
        district,
        subdistrict,
        village,
        setMessage,
        handleAddressChange,
        newProduct,
    } = useAdvertise();


    const [formData, setFormData] = useState({
        product_name: '',
        product_desc: '',
        product_price: '',
        price: '',
        street: '',
        category: '',
        provence: '',
        district: '',
        subdistrict: '',
        village: '',

    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;


        if (name === 'product_price') {
            // Remove non-numeric characters except digits
            const numericValue = value.replace(/[^0-9]/g, '');
    
            // Format as currency
            const formattedValue = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }).format(numericValue);
    
            setFormData({ ...formData, [name]: numericValue }); // Store numeric value
            e.target.value = formattedValue; // Update input display
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }

        if (['provence', 'district', 'subdistrict'].includes(name)) {
            handleAddressChange(name, value);
        }
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setMessage('');
        await newProduct(formData);
    }


    return (
        <div className="preference-container">
            <div className="profile-form">
                <h2>Complete Your Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">

                        {/* Property Name */}
                        <label>Property Name</label>
                        <input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            placeholder="Enter Property Name"
                            disabled={isLoading}
                            required
                        />

                        {/* Property Description */}
                        <label>Property Description</label>
                        <input
                            type="text"
                            name="product_desc"
                            value={formData.product_desc}
                            onChange={handleChange}
                            placeholder="Enter Description"
                            disabled={isLoading}
                            required
                        />

                        {/* Price */}
                        <label>Price</label>
                        <input
                            type="text"
                            name="product_price"
                            value={formData.product_price}
                            onChange={handleChange}
                            placeholder="Enter Price"
                            disabled={isLoading}
                            required
                        />


                        {/* Category */}
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        >
                            <option value="">Select Category</option>
                            {category.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>

                        {/* Province */}
                        <label>Province</label>
                        <select
                            name="provence"
                            value={formData.provence}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        >
                            <option value="">Select Province</option>
                            {provence.map((prov) => (
                                <option key={prov.id} value={prov.id}>
                                    {prov.name}
                                </option>
                            ))}
                        </select>

                        {/* District */}
                        <label>District</label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            disabled={isLoading || !formData.provence}
                            required
                        >
                            <option value="">Select District</option>
                            {district.map((dist) => (
                                <option key={dist.id} value={dist.id}>
                                    {dist.name}
                                </option>
                            ))}
                        </select>

                        {/* Subdistrict */}
                        <label>Subdistrict</label>
                        <select
                            name="subdistrict"
                            value={formData.subdistrict}
                            onChange={handleChange}
                            disabled={isLoading || !formData.district}
                            required
                        >
                            <option value="">Select Subdistrict</option>
                            {subdistrict.map((subdist) => (
                                <option key={subdist.id} value={subdist.id}>
                                    {subdist.name}
                                </option>
                            ))}
                        </select>

                        {/* Village */}
                        <label>Village</label>
                        <select
                            name="village"
                            value={formData.village}
                            onChange={handleChange}
                            disabled={isLoading || !formData.subdistrict}
                            required
                        >
                            <option value="">Select Village</option>
                            {village.map((vil) => (
                                <option key={vil.id} value={vil.id}>
                                    {vil.name}
                                </option>
                            ))}
                        </select>

                        {/* Street Name */}
                        <label>Street Name</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="Enter Street Name"
                            disabled={isLoading}
                            required
                        />

                        {/* Price Range */}
                        <label>Price Range</label>
                        <select
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        >
                            <option value="">Select Price Range</option>
                            {price.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.price_range}
                                </option>
                            ))}
                        </select>

                        {/* Phone Number */}
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Enter Phone Number"
                            required
                        />
                    </div>

                    <div className="button-container">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </form>
                {isLoading && <div className="loading-spinner"></div>}
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Advertise;