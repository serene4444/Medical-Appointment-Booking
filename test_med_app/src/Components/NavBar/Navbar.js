import React, { useRef } from 'react';
import './Navbar.css';

function Navbar() {
    const navLinksRef = useRef(null);

    // Mobile menu toggle handler
    const handleMobileToggle = () => {
        navLinksRef.current.classList.toggle('active');
    };

    // Active link handler
    const handleNavLinkClick = (e) => {
        e.preventDefault();
        const navLinksElements = navLinksRef.current.querySelectorAll('.nav-link');
        navLinksElements.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
        // Smooth scroll
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Main Navigation Bar */}
            <nav className="navbar">
                <a href="../NavBar/Navbar.html" className="logo">
                    <div className="logo-icon">HC</div>
                    Health Cert
                </a>

                <ul className="nav-links" id="navLinks" ref={navLinksRef}>
                    <li className="nav-item">
                        <a
                            href="#appointments"
                            className="nav-link active"
                            onClick={handleNavLinkClick}
                        >
                            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            Appointments
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#reviews"
                            className="nav-link"
                            onClick={handleNavLinkClick}
                        >
                            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                            Reviews
                        </a>
                    </li>
                </ul>

                <div className="auth-buttons">
                    <a href="../Sign_Up/signup.html" className="btn btn-outline">
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                        </svg>
                        Sign Up
                    </a>
                    <a href="../login/login.html" className="btn btn-primary">
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                        </svg>
                        Login
                    </a>
                </div>

                <button className="mobile-toggle" id="mobileToggle" onClick={handleMobileToggle}>☰</button>
            </nav>

            {/* Demo Content */}
            <div className="demo-content">
                <h1>Your Health. Your Story.</h1>
                <p>A secure and intuitive platform to log symptoms, track treatments, and document your health journey. Designed for individuals, caregivers, and professionals who value clarity, consistency, and control in personal health care.</p>
                <a href="../Sign_Up/signup.html" className="btn btn-primary">Get Started</a>
            </div>
        </>
    );
}

export default Navbar;