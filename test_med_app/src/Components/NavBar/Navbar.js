import React, { useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ showHeroContent = false }) {
    const navLinksRef = useRef(null);
    const navigate = useNavigate();

    const isLoggedIn = !!sessionStorage.getItem('auth-token');
    const name = sessionStorage.getItem('name') || 'User';

    const handleMobileToggle = () => {
        navLinksRef.current.classList.toggle('active');
    };

    // Removed unused handleNavLinkClick function as it's not being used

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo">
                    <div className="logo-icon">HC</div>
                    Health Cert
                </Link>

                <ul className="nav-links" ref={navLinksRef} role="navigation" aria-label="Main navigation">
                    <li className="nav-item">
                        <Link 
                            to="/instant-consultation" 
                            className="nav-link"
                            aria-label="Book appointments with doctors"
                        >
                            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            Appointments
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" aria-label="View patient reviews and testimonials">
                            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                            Reviews
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" aria-label="Learn about our healthcare services">
                            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            About
                        </Link>
                    </li>
                </ul>

                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <>
                            <span className="welcome" aria-label={`Welcome, ${name}`}>
                                Welcome, {name}
                            </span>
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-outline"
                                aria-label="Logout from your account"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/signup" 
                                className="btn btn-outline"
                                aria-label="Create a new account"
                            >
                                Sign Up
                            </Link>
                            <Link 
                                to="/login" 
                                className="btn btn-primary"
                                aria-label="Sign in to your account"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>

                <button 
                    className="mobile-toggle" 
                    onClick={handleMobileToggle}
                    aria-label="Toggle mobile navigation menu"
                    aria-expanded={navLinksRef.current?.classList.contains('active')}
                >
                    <span className="hamburger-icon">☰</span>
                </button>
            </nav>

            {showHeroContent && (
                    <div className="demo-content">
                      <h1>Your Health. Your Story.</h1>
                      <p>A secure and intuitive platform to log symptoms, track treatments, and document your health journey. Designed for individuals, caregivers, and professionals who value clarity, consistency, and control in personal health care.</p>
                      <Link to="/signup" className="btn btn-get-started">
                        Get Started
                    </Link>
                </div>
            )}
        </>
    );
}

export default Navbar;
