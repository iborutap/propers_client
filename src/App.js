import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/layout/Home/Home';
import Navbar from './components/layout/Navbar/Navbar';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import ProfilePreferences from './components/layout/Profile/Preferences/ProfilePreferences';
import Profile from './components/layout/Profile/Profile';
import Advertise from './components/layout/Advertise/Advertise';
import Contact from './components/layout/Contact/Contact';
import TanahPage from './components/layout/Tanah/Tanah';
import PageNotFound from './components/auth/PageNotFound/PageNotFound'; 
import { AuthProvider } from './context/authContext';
import AddressProvider from './context/addressContext';
import PreferenceProvider from './context/preferenceContext';
import AdvertiseProvider from './context/advertiseContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            index
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/contact'
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <Navbar />
                <PreferenceProvider>
                <Profile />
                </PreferenceProvider>
              </>
            }
          />
          <Route
            path='/profile/preferences'
            element={
              <>
                <Navbar />
                <AddressProvider>
                  <PreferenceProvider>
                    <ProfilePreferences />
                  </PreferenceProvider>
                </AddressProvider>
              </>
            }
          />
          <Route
            path='/advertise'
            element={
              <>
                <Navbar />
                <AdvertiseProvider>
                  <Advertise />
                </AdvertiseProvider>
              </>
            }
          />
          <Route
            path='/tanah'
            element={
              <>
                <Navbar />
                <TanahPage />
              </>
            }
          />
          <Route
            path='*'
            element={
              <>
                <Navbar />
                <PageNotFound />
  
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
