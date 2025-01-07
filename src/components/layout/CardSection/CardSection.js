import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding, faLandmark, faHouseUser, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './CardSection.css';

const CardSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      title: 'PROPERTI',
      items: [
        { name: 'Tanah', isNew: true, icon: faLandmark, link: '/tanah' },
      ],
    },
    {
      title: 'Coming Soon',
      items: [
        { name: 'Rumah Baru', isNew: true, icon: faHome },
        { name: 'Rumah Second', isNew: true, icon: faHouseUser },
        { name: 'Apartemen Baru', isNew: true, icon: faBuilding },
        { name: 'Apartemen Second', isNew: true, icon: faBuilding },
        { name: 'Rumah Kontrakan', isNew: true, icon: faHome },
        { name: 'Apartemen', isNew: true, icon: faBuilding },
        { name: 'Kost', isNew: true, icon: faHouseUser },
        { name: 'Tanpa Perantara', isNew: true, icon: faDollarSign },
        { name: 'Pasang Iklan Jual & Sewa', isNew: true, icon: faDollarSign },
        { name: 'Estimasi Nilai Properti', isNew: true, icon: faDollarSign },
      ],
    },
  ];

  return (
    <div className='card-section'>
      {categories.map((category, index) => (
        <div key={index} className='category'>
          <h3 className={`category-title ${isVisible ? 'visible' : ''}`}>{category.title}</h3>
          <div className='card-container'>
            {category.items.map((item, idx) => (
              // Gunakan Link hanya jika item memiliki properti 'link'
              item.link ? (
                <Link
                  key={idx}
                  to={item.link}
                  className={`card ${isVisible ? 'visible' : ''}`}
                >
                  <div className='card-content'>
                    <FontAwesomeIcon icon={item.icon} className='card-icon' />
                    <span className='title'>{item.name}</span>
                    {item.name ? (
                      <span className='new-badge'>Baru</span> // Ganti Maintenance dengan Baru untuk Tanah
                    ) : item.isNew ? (
                      <span className='maintenance-badge'>Maintenance</span> // Untuk item lainnya
                    ) : null}
                  </div>

                </Link>
              ) : (
                <div
                  key={idx}
                  className={`card ${isVisible ? 'visible' : ''}`}
                >
                  <div className='card-content'>
                    <FontAwesomeIcon icon={item.icon} className='card-icon' />
                    <span>{item.name}</span>
                    {item.isNew && <span className='maintenance-badge'>Maintenance</span>}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
