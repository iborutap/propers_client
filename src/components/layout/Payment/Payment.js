// components/Payment/Payment.js
import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ listing, onPaymentSuccess }) => {
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/payment', {
                ...paymentInfo,
                amount: listing.product_price,
            });
            setMessage('Payment successful!');
            onPaymentSuccess(); // Panggil callback jika pembayaran berhasil
        } catch (error) {
            setMessage('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Payment for {listing.product_name}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={paymentInfo.expiryDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Payment;