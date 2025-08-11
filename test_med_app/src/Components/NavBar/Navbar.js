import React, { useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navLinksRef = useRef(null);
    const navigate = useNavigate();

    const isLoggedIn = !!sessionStorage.getItem('auth-token');
    const name = sessionStorage.getItem('name') || 'User';

    const handleMobileToggle = () => {
        navLinksRef.current.classList.toggle('active');
    };

    const handleNavLinkClick = (e) => {
        e.preventDefault();
        const navLinksElements = navLinksRef.current.querySelectorAll('.nav-link');
        navLinksElements.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

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

                <ul className="nav-links" ref={navLinksRef}>
                    <li className="nav-item">
                        <a href="#appointments" className="nav-link active" onClick={handleNavLinkClick}>
                            Appointments
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#reviews" className="nav-link" onClick={handleNavLinkClick}>
                            Reviews
                        </a>
                    </li>
                </ul>

                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <>
                            <span className="welcome">Welcome, {name}</span>
                            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="btn btn-outline">Sign Up</Link>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </>
                    )}
                </div>

                <button className="mobile-toggle" onClick={handleMobileToggle}>☰</button>
            </nav>

            <div className="demo-content">
                <h1>Your Health. Your Story.</h1>
                <p>A secure and intuitive platform to log symptoms, track treatments, and document your health journey.</p>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </div>
        </>
    );
}

export default Navbar;
