import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import Logo from '../../../assets/img/logo-white.png';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const links = [
        { path: '/contact', label: 'Contact' },
        { path: '/profile', label: 'Profile' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className='navbar-container'>
                <Link to='/' className='logo'>
                    <img src={Logo} alt="Propers Logo" />
                    <h1>PROPERS</h1>
                </Link>
                {isLoading && <div className="loading-spinner"></div>}
                <div className={`menu ${menuOpen ? 'open' : ''}`}>
                    {links.map((link, index) => (
                        <Link key={index} to={link.path} onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className='menu-button'>
                        {isAuthenticated ? (
                            <button className='menu-button' onClick={handleLogout}>Logout</button>
                        ) : (
                            <button onClick={handleLogin}>Login</button>
                        )}
                    </div>
                </div>
                <div className='menu-mobile'>
                    <div className='menu-button'>
                        {isAuthenticated ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <button onClick={handleLogin}>Login</button>
                        )}
                    </div>
                    <div
                        className='hamburger'
                        onClick={toggleMenu}
                        aria-label='Toggle Menu'
                        role='button'
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;