import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Tanah.css';
import axiosInstance from '../../../utils/axiosConfig';
import Lightbox from 'react-image-lightbox'; // Import pustaka Lightbox
import 'react-image-lightbox/style.css'; // Import gaya Lightbox

const Tanah = () => {

    const [landListings, setLandListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null); // State untuk modal
    const [modalOpen, setModalOpen] = useState(false); // State untuk mengatur apakah modal terbuka atau tidak
    const [isLightboxOpen, setIsLightboxOpen] = useState(false); // State untuk lightbox
    const [photoIndex, setPhotoIndex] = useState(0); // Indeks gambar aktif untuk lightbox

    useEffect(() => {
        const fetchLandListings = async () => {
            try {
                const response = await axiosInstance.get('/product/tanah');
                setLandListings(response.data.product);
            } catch (error) {
                console.error('Error fetching land listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLandListings();
    }, []);

    const openModal = (listing) => {
        setSelectedListing(listing); // Set listing yang dipilih untuk modal
        setModalOpen(true); // Buka modal
    };

    const closeModal = () => {
        setModalOpen(false); // Tutup modal
        setSelectedListing(null); // Reset listing yang dipilih
    };

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsLightboxOpen(true);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const generateWhatsappLink = (listing) => {
        const productImageUrl = `https://example.com/path-to-image/${listing.product_image}`;
        const message = `Halo, saya tertarik dengan produk "${listing.product_name}". Berikut adalah gambar produk:\n\n${productImageUrl}\n\nDeskripsi: ${listing.product_desc}`;
        return `https://wa.me/${listing.mobile}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="land-listings">
            {landListings.map((listing, index) => (
                <div key={index} className="listing">
                    <img 
                        src={`https://cdn1.vectorstock.com/i/1000x1000/91/60/land-plot-for-sale-isometric-3d-icon-isolated-vector-36559160.jpg`} // Ganti dengan URL gambar Anda
                        alt={listing.product_name}
                        className="product-image"
                        onClick={() => openLightbox(index)} // Buka lightbox saat gambar diklik
                    />
                    <h2>{listing.product_name}</h2>
                    <p>{listing.product_desc}</p>
                    <p>Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(listing.product_price)}</p>
                    <p>Street: {listing.street}</p>
                    <p>Penjual: {listing.seller_name}</p>

                    <button onClick={() => openModal(listing)}>See Details</button>
                </div>
            ))}

{/* Lightbox */}
{isLightboxOpen && (
                <Lightbox
                    mainSrc={`https://cdn1.vectorstock.com/i/1000x1000/91/60/land-plot-for-sale-isometric-3d-icon-isolated-vector-36559160.jpg`} // Gambar aktif
                    nextSrc={`https://i.pinimg.com/236x/93/34/5e/93345e80f56308c62ae15f44326144f7.jpg${landListings[(photoIndex + 1) % landListings.length].product_image}`} // Gambar berikutnya
                    prevSrc={`https://i.pinimg.com/236x/c4/06/92/c4069218f6b231e46c33d393cbb93f7d.jpg${landListings[(photoIndex + landListings.length - 1) % landListings.length].product_image}`} // Gambar sebelumnya
                    onCloseRequest={() => setIsLightboxOpen(false)} // Tutup lightbox
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + landListings.length - 1) % landListings.length) // Navigasi ke gambar sebelumnya
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % landListings.length) // Navigasi ke gambar berikutnya
                    }
                />
            )}

            {/* Modal */}
            {modalOpen && selectedListing && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedListing.product_name}</h2>
                        <p>{selectedListing.product_desc}</p>
                        <p>Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedListing.product_price)}</p>
                        <p>Street: {selectedListing.street}</p>
                        <p>Details: {selectedListing.product_details}</p>



                        <div className="penjual-container">
                            <Link to="#" className="penjual">
                                <FontAwesomeIcon icon={faUserCircle} className="penjual-icon" />
                                <span>{selectedListing.seller_name}</span>
                            </Link>
                        </div>


                        <div className="modal-buttons">
                            <button onClick={closeModal}>Close</button>
                            <a
                                href={generateWhatsappLink(selectedListing)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-chat-button"
                            >
                                <FontAwesomeIcon icon="fa-brands fa-whatsapp" /> Chat Saya
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tanah;
