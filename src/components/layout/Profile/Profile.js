import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { useAuth } from '../../../context/authContext';
import { usePreference } from '../../../context/preferenceContext';

const ProfileDetail = ({ label, value }) => (
  <div className="profile-detail">
    <span className="detail-label">{label}:</span>
    <span className="detail-value">{value}</span>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { userPreferenceData } = usePreference();
  const buttonRef = useRef();

  // Detect mousemove for dynamic button hover effect
  useEffect(() => {
    const button = buttonRef.current;
    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPos = (x / rect.width) * 100;
      const yPos = (y / rect.height) * 100;

      button.style.backgroundPosition = `${xPos}% ${yPos}%`;
    };

    const handleMouseLeave = () => {
      button.style.backgroundPosition = 'center'; // Reset position
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (userPreferenceData===null) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h1>Profile</h1>
          <div className="profile-content">
            <h2>Complete Your Preference for better experience!</h2>
            <div className="profile-actions">
              <Link to="preferences">
                <button className="button button-primary" ref={buttonRef}>Preferences</button>
              </Link>
              <Link to="/advertise">
                <button className="button button-secondary">Want to sell props?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const profileDetails = [
    { label: "Name", value: `${userPreferenceData.first_name} ${userPreferenceData.last_name}` },
    { label: "Location", value: `${userPreferenceData.provence_name}, ${userPreferenceData.district_name}` },
    { label: "Area", value: `${userPreferenceData.subdistrict_name}, ${userPreferenceData.village_name}` },
    { label: "Street", value: userPreferenceData.street },
    { label: "Price Range Prefer", value: userPreferenceData.price },
    { label: "Category Prefer", value: userPreferenceData.category },
    { label: "Mobile", value: userPreferenceData.mobile }
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        <div className="profile-content">
          <div className="profile-details">
            {profileDetails.map((detail, index) => (
              <ProfileDetail key={index} {...detail} />
            ))}
          </div>
          <div className="profile-actions">
            <Link to="preferences">
              <button className="button button-primary" ref={buttonRef}>Edit Preferences</button>
            </Link>
            <Link to="/advertise">
              <button className="button button-secondary">Want to sell props?</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
