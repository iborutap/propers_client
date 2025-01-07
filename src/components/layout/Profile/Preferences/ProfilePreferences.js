import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePreferences.css';
import { useAddress } from '../../../../context/addressContext';
import { usePreference } from '../../../../context/preferenceContext';
import { useAuth } from '../../../../context/authContext';
import './ProfilePreferences.css'

const ProfilePreferences = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const {
        provence,
        district,
        subdistrict,
        village,
        handleAddressChange,
    } = useAddress();


    const { 
        message,
        setMessage,
        isLoading,
        setIsLoading, price, category, newPreference } = usePreference();

    const [formData, setFormData] = useState({
        provence: '',
        district: '',
        subdistrict: '',
        village: '',
        price: '',
        category: '',
        mobile: '',
        street: '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validasi input nomor HP hanya angka
        if (name === 'mobile' && !/^\d*$/.test(value)) {
            return; // Hanya memperbolehkan angka
        }

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Hanya panggil handleAddressChange untuk dropdown lokasi
        if (['provence', 'district', 'subdistrict'].includes(name)) {
            handleAddressChange(name, value);
        }
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setMessage('');
        await newPreference(formData);

    };

    return (
        <div className="preference-form">
            <h2>Lengkapi Profil Anda</h2>
            <form onSubmit={handleSubmit}>
                <label>Provinsi</label>
                <select
                    name="provence"
                    value={formData.provence}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                >
                    <option value="">Pilih Provinsi</option>
                    {provence.map(prov => (
                        <option key={prov.id} value={prov.id}>{prov.name}</option>
                    ))}
                </select>

                <label>Kota</label>
                <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={isLoading || !formData.provence}
                    required
                >
                    <option value="">Pilih Kota</option>
                    {district.map(dist => (
                        <option key={dist.id} value={dist.id}>{dist.name}</option>
                    ))}
                </select>

                <label>Kecamatan</label>
                <select
                    name="subdistrict"
                    value={formData.subdistrict}
                    onChange={handleChange}
                    disabled={isLoading || !formData.district}
                    required
                >
                    <option value="">Pilih Kecamatan</option>
                    {subdistrict.map(subdist => (
                        <option key={subdist.id} value={subdist.id}>{subdist.name}</option>
                    ))}
                </select>

                <label>Kelurahan</label>
                <select
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    disabled={isLoading || !formData.subdistrict}
                    required
                >
                    <option value="">Pilih Kelurahan</option>
                    {village.map(vil => (
                        <option key={vil.id} value={vil.id}>{vil.name}</option>
                    ))}
                </select>

                <label>Nama Jalan</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="Masukkan Nama Jalan"
                    required
                />
                
                <label>Harga</label>
                <select
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                >
                    <option value="">Pilih Harga</option>
                    {price.map(p => (
                        <option key={p.id} value={p.id}>{p.price_range}</option>
                    ))}
                </select>

                <label>Kategori</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                >
                    <option value="">Pilih Kategori</option>
                    {category.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                    ))}
                </select>

                <label>Nomor HP</label>
                <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="Masukkan Nomor HP"
                    required
                />


                <button type="submit" disabled={isLoading && <div className="loading-spinner"></div>}>
                    {isLoading ? 'Sedang Memproses...' : 'Kirim'}
                </button>
            </form>
            {isLoading && <div className="loading-spinner"></div>}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ProfilePreferences;
