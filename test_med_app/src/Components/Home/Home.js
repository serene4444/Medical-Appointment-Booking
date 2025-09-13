import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const isLoggedIn = !!sessionStorage.getItem('auth-token');
    const userName = sessionStorage.getItem('name') || 'User';

    const features = [
        {
            icon: "🏥",
            title: "Find Doctors",
            description: "Search and book appointments with qualified healthcare professionals in your area.",
            link: "/instant-consultation"
        },
        {
            icon: "📅",
            title: "Easy Booking",
            description: "Schedule appointments quickly with our streamlined booking system.",
            link: "/instant-consultation"
        },
        {
            icon: "💊",
            title: "Health Records",
            description: "Keep track of your medical history and appointments in one place.",
            link: "#"
        },
        {
            icon: "🔒",
            title: "Secure & Private",
            description: "Your health information is protected with enterprise-grade security.",
            link: "#"
        }
    ];

    const stats = [
        { number: "10,000+", label: "Happy Patients" },
        { number: "500+", label: "Expert Doctors" },
        { number: "50+", label: "Specialties" },
        { number: "24/7", label: "Support" }
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            {isLoggedIn ? `Welcome back, ${userName}!` : "Your Health, Our Priority"}
                        </h1>
                        <p className="hero-subtitle">
                            {isLoggedIn 
                                ? "Ready to book your next appointment? Find the perfect healthcare provider for your needs."
                                : "Connect with trusted healthcare professionals and take control of your health journey. Book appointments, track your health, and get the care you deserve."
                            }
                        </p>
                        <div className="hero-actions">
                            {isLoggedIn ? (
                                <Link to="/instant-consultation" className="btn btn-primary btn-large">
                                    Book Appointment
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" className="btn btn-primary btn-large">
                                        Get Started
                                    </Link>
                                    <Link to="/login" className="btn btn-outline btn-large">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="hero-illustration">
                            <div className="medical-icon">🏥</div>
                            <div className="floating-elements">
                                <div className="floating-icon">💊</div>
                                <div className="floating-icon">❤️</div>
                                <div className="floating-icon">🩺</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Our Platform?</h2>
                        <p className="section-subtitle">
                            We're committed to making healthcare accessible, convenient, and reliable for everyone.
                        </p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <Link to={feature.link} className="feature-link">
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-subtitle">
                        Join thousands of patients who trust us with their healthcare needs.
                    </p>
                    {!isLoggedIn && (
                        <div className="cta-actions">
                            <Link to="/signup" className="btn btn-primary btn-large">
                                Create Account
                            </Link>
                            <Link to="/instant-consultation" className="btn btn-outline btn-large">
                                Browse Doctors
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
