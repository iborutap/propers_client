import React, { useState, useEffect } from 'react';
import CardSection from '../CardSection/CardSection';
import './Home.css';
import axiosInstance from '../../../utils/axiosConfig';
import { useAuth } from '../../../context/authContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Lightbox from 'react-image-lightbox'; // Import pustaka Lightbox
import 'react-image-lightbox/style.css'; // Import gaya Lightbox

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { message, setMessage } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  const [selectedListing, setSelectedListing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // State untuk lightbox
  const [photoIndex, setPhotoIndex] = useState(0); // Indeks gambar aktif untuk lightbox

  const openModal = (listing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedListing(null);
  };

  const generateWhatsappLink = (listing) => {
    const productImageUrl = `https://example.com/path-to-image/${listing.product_image}`;
    const message = `Halo, saya tertarik dengan produk "${listing.product_name}". Berikut adalah gambar produk:\n\n${productImageUrl}\n\nDeskripsi: ${listing.product_desc}`;
    return `https://wa.me/${listing.mobile}?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecommendedProperties();
    }
  }, []);

  const fetchRecommendedProperties = async () => {
    try {
      const response = await axiosInstance.get('/recommended-properties');
      setRecommendedProperties(response.data.recommend);
      setIsExist(true);
    } catch (error) {
      console.error('Error fetching recommended properties:', error);
    }
  };

  const searchProperties = async (term) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/search?q=${term}`);
      setProperties(response.data.product);
      setIsSearchSubmitted(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchProperties(searchTerm);
      setMessage(`Properti berdasarkan pencarian "${searchTerm}"`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/send-email', formData);
      if (response.status === 200) {
        alert('Email berhasil dikirim!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Gagal mengirim email. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsLightboxOpen(true);
};

  const PropertyGrid = ({ items }) => (
    <div className='listing-body'>
      {items.map((property, index) => (
        <div key={index} className="listing">
          <img 
                        src={`https://cdn1.vectorstock.com/i/1000x1000/91/60/land-plot-for-sale-isometric-3d-icon-isolated-vector-36559160.jpg`} // Ganti dengan URL gambar Anda
                        alt={property.product_name}
                        className="product-image"
                        onClick={() => openLightbox(index)} // Buka lightbox saat gambar diklik
                    />
          <h2>{property.product_name}</h2>
          <p>{property.product_desc}</p>
          <p>Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(property.product_price)}</p>
          <p>Street: {property.street}</p>
          <p>Penjual: {property.seller_name}</p>
          <button onClick={() => openModal(property)}>See Details</button>
        </div>
      ))}
      
{/* Lightbox */}
{isLightboxOpen &&  (
                <Lightbox
                    mainSrc={`https://cdn1.vectorstock.com/i/1000x1000/91/60/land-plot-for-sale-isometric-3d-icon-isolated-vector-36559160.jpg`} // Gambar aktif
                    nextSrc={`https://i.pinimg.com/236x/93/34/5e/93345e80f56308c62ae15f44326144f7.jpg$`} // Gambar berikutnya
                    prevSrc={`https://i.pinimg.com/236x/c4/06/92/c4069218f6b231e46c33d393cbb93f7d.jpg$`} // Gambar sebelumnya
                    onCloseRequest={() => setIsLightboxOpen(false)} // Tutup lightbox
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex - 1)) // Navigasi ke gambar sebelumnya
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1)) // Navigasi ke gambar berikutnya
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
                Chat Saya
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className='home'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-content'>
          <h1>Temukan Properti Impianmu</h1>
          <p>Cari properti terbaik di area favorit Anda dengan mudah dan cepat.</p>
          <form className='search-bar' onSubmit={handleSearchSubmit}>
            <input
              type='text'
              placeholder='Cari lokasi atau nama properti...'
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
            <button type='submit'>Cari</button>
          </form>
        </div>
      </section>

      {/* Properties Section */}
      {isSearchSubmitted ? (
        <section className="listings">
          <h2 className="message">{message}</h2>
          <div className="property-grid">
            {loading ? (
              <p>Loading...</p>
            ) : properties.length > 0 ? (
              <PropertyGrid items={properties} />
            ) : (
              <p>Tidak ada properti yang ditemukan</p>
            )}
          </div>
        </section>
      ) : isExist && recommendedProperties ? (
        <section className="listings">
          <h2 className="message">Rekomendasi Properti</h2>
          <div className="property-grid">
            <PropertyGrid items={recommendedProperties} />
          </div>
        </section>
      ) : null}

      {/* Welcome Section */}
      <div className='home-container'>
        <h1 className='welcome-text'>Selamat Datang di Properti Kami</h1>
        <CardSection />
      </div>

      {/* About Section */}
      <section className='about'>
        <h2>Tentang Kami</h2>
        <p>PROPERS adalah platform pencarian properti terpercaya untuk membantu Anda menemukan hunian impian Anda.</p>
      </section>

      {/* Contact Section */}
      <section className='contact'>
        <h2>Hubungi Kami</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Nama'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name='message'
            placeholder='Pesan'
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type='submit'>Kirim</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 PROPERS. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
};

export default Home;
