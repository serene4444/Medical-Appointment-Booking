import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const navigate = useNavigate();
    
    const specialties = [
        'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 
        'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
    ];

    const locations = ['Downtown', 'Midtown', 'Uptown', 'Suburbs'];
    
    // Mock doctor data since the external API is down
    const mockDoctors = [
        {
            name: "Dr. Sarah Johnson",
            speciality: "General Physician",
            experience: "8 years",
            ratings: 4.9,
            location: "Downtown Medical Center"
        },
        {
            name: "Dr. Michael Chen",
            speciality: "Dermatologist", 
            experience: "12 years",
            ratings: 4.8,
            location: "Midtown Clinic"
        },
        {
            name: "Dr. Emily Rodriguez",
            speciality: "Gynecologist/obstetrician",
            experience: "10 years", 
            ratings: 4.7,
            location: "Women's Health Center"
        },
        {
            name: "Dr. James Wilson",
            speciality: "Dentist",
            experience: "15 years",
            ratings: 4.9,
            location: "Dental Care Plus"
        },
        {
            name: "Dr. Lisa Thompson",
            speciality: "Ear-nose-throat (ent) Specialist",
            experience: "9 years",
            ratings: 4.6,
            location: "ENT Specialists Clinic"
        },
        {
            name: "Dr. David Kumar",
            speciality: "Homeopath",
            experience: "7 years",
            ratings: 4.5,
            location: "Natural Healing Center"
        },
        {
            name: "Dr. Priya Sharma",
            speciality: "Ayurveda",
            experience: "11 years",
            ratings: 4.8,
            location: "Ayurvedic Wellness Clinic"
        },
        {
            name: "Dr. Robert Martinez",
            speciality: "General Physician",
            experience: "14 years",
            ratings: 4.7,
            location: "Family Medical Center"
        }
    ];
    
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            setDoctors(data);
            if (searchParams.get('speciality')) {
                const filtered = data.filter(doctor => 
                    doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
                );
                setFilteredDoctors(filtered);
                setIsSearched(true);
            }
        })
        .catch(err => {
            console.log('API failed, using mock data:', err);
            // Fallback to mock data if API fails
            setDoctors(mockDoctors);
            if (searchParams.get('speciality')) {
                const filtered = mockDoctors.filter(doctor => 
                    doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
                );
                setFilteredDoctors(filtered);
                setIsSearched(true);
            }
        });
    }

    const handleSearch = () => {
        let filtered = doctors;
        
        if (searchText) {
            filtered = filtered.filter(doctor =>
                doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        
        if (specialtyFilter) {
            filtered = filtered.filter(doctor =>
                doctor.speciality.toLowerCase().includes(specialtyFilter.toLowerCase())
            );
        }
        
        setFilteredDoctors(filtered);
        setIsSearched(true);
    };

    const handleBookAppointment = (doctor) => {
        navigate('/appointment', { 
            state: { 
                doctorName: doctor.name,
                doctorSpecialty: doctor.speciality,
                doctorLocation: doctor.location || 'Location Available',
                doctorRating: doctor.rating,
                doctorExperience: doctor.experience
            }
        });
    };

    const handleSpecialtyTag = (specialty) => {
        setSpecialtyFilter(specialty);
        let filtered = doctors.filter(doctor =>
            doctor.speciality.toLowerCase().includes(specialty.toLowerCase())
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
    };

    useEffect(() => {
        getDoctorsDetails();
    }, [searchParams]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg key={i} className={`star ${i <= rating ? '' : 'empty'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="container">
            {/* Section Header */}
            <div className="section-header">
                <h1 className="section-title">Book Your Appointment</h1>
                <p className="section-subtitle">Find and book appointments with qualified healthcare professionals in your area. Search by specialty, location, and availability.</p>
            </div>

            {/* Search Doctor Section */}
            <div className="search-doctor-frame">
                <div className="search-header">
                    <h2 className="search-title">
                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        Search Doctors
                    </h2>
                    <p className="search-description">Search for healthcare providers by specialty, name, location, or medical condition</p>
                </div>

                <div className="search-container">
                    <div className="search-input-group">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search by doctor name, specialty, or condition..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <svg className="search-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>

                    <div className="filter-group">
                        <select 
                            className="filter-select" 
                            value={specialtyFilter} 
                            onChange={(e) => setSpecialtyFilter(e.target.value)}
                        >
                            <option value="">All Specialties</option>
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>{specialty}</option>
                            ))}
                        </select>

                        <select 
                            className="filter-select" 
                            value={locationFilter} 
                            onChange={(e) => setLocationFilter(e.target.value)}
                        >
                            <option value="">Location</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>

                        <button className="search-button" onClick={handleSearch}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            Search
                        </button>
                    </div>
                </div>

                <div className="quick-filters">
                    <div className="filter-label">Popular Specialties:</div>
                    <div className="filter-tags">
                        {specialties.slice(0, 6).map(specialty => (
                            <div 
                                key={specialty}
                                className={`filter-tag ${specialtyFilter === specialty ? 'active' : ''}`}
                                onClick={() => handleSpecialtyTag(specialty)}
                            >
                                {specialty}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Doctor Cards Section */}
            {isSearched && (
                <div className="doctors-section">
                    <h2 className="results-title">{filteredDoctors.length} doctors available</h2>
                    <div className="doctors-grid">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor, index) => (
                                <div key={doctor.name} className="doctor-card">
                                    <div className="status-badge status-available">Available</div>
                                    
                                    <div className="doctor-card-header">
                                        <div className="doctor-avatar">
                                            {doctor.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="doctor-info">
                                            <h3 className="doctor-name">{doctor.name}</h3>
                                            <p className="doctor-specialty">{doctor.speciality}</p>
                                            <div className="doctor-experience">
                                                <svg className="experience-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                </svg>
                                                {doctor.experience || '10+'} years experience
                                            </div>
                                            <div className="doctor-rating">
                                                <div className="rating-stars">
                                                    {renderStars(doctor.ratings || 5)}
                                                </div>
                                                <span className="rating-text">{doctor.ratings || '4.9'}</span>
                                                <span className="rating-count">(127 reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="doctor-details">
                                        <div className="detail-row">
                                            <div className="detail-label">
                                                <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                                Location
                                            </div>
                                            <div className="detail-value">Medical Center</div>
                                        </div>
                                        <div className="detail-row">
                                            <div className="detail-label">
                                                <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                                                </svg>
                                                Consultation Fee
                                            </div>
                                            <div className="detail-value">$150</div>
                                        </div>
                                        <div className="detail-row">
                                            <div className="detail-label">
                                                <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                Next Available
                                            </div>
                                            <div className="detail-value">Today, 2:00 PM</div>
                                        </div>
                                    </div>

                                    <div className="available-times">
                                        <div className="times-label">Available Time Slots:</div>
                                        <div className="time-slots">
                                            <div className="time-slot">10:00 AM</div>
                                            <div className="time-slot">11:30 AM</div>
                                            <div className="time-slot selected">2:00 PM</div>
                                            <div className="time-slot">3:30 PM</div>
                                            <div className="time-slot">4:45 PM</div>
                                        </div>
                                    </div>

                                    <div className="doctor-actions">
                                        <button className="btn-primary" onClick={() => handleBookAppointment(doctor)}>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                            Book Appointment
                                        </button>
                                        <button className="btn-secondary">
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No doctors found matching your criteria.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default InstantConsultation