import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './AppointmentFormIC.css';

const AppointmentFormIC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const doctorInfo = location.state || {};
    
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        date: '',
        time: '',
        reason: '',
        notes: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-()]/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.date) {
            newErrors.date = 'Please select a date';
        } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = 'Please select a future date';
            }
        }
        
        if (!formData.time) {
            newErrors.time = 'Please select a time slot';
        }
        
        if (!formData.reason.trim()) {
            newErrors.reason = 'Please provide a reason for the appointment';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
  
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Appointment booked:', { 
                ...formData,
                doctor: doctorInfo.doctorName, 
                specialty: doctorInfo.doctorSpecialty,
                location: doctorInfo.doctorLocation
            });
            
            setShowSuccess(true);
            
            // Reset form after success
            setTimeout(() => {
                setFormData({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    date: '',
                    time: '',
                    reason: '',
                    notes: ''
                });
                setShowSuccess(false);
                navigate('/instant-consultation');
            }, 3000);
            
        } catch (error) {
            console.error('Booking failed:', error);
            setErrors({ submit: 'Failed to book appointment. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };
  
    if (showSuccess) {
        return (
            <div className="appointment-form-container">
                <div className="success-message">
                    <div className="success-icon">✅</div>
                    <h2>Appointment Booked Successfully!</h2>
                    <p>Your appointment with {doctorInfo.doctorName} has been confirmed.</p>
                    <div className="appointment-details">
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Time:</strong> {formData.time}</p>
                        <p><strong>Doctor:</strong> {doctorInfo.doctorName}</p>
                        <p><strong>Specialty:</strong> {doctorInfo.doctorSpecialty}</p>
                    </div>
                    <p className="confirmation-note">
                        You will receive a confirmation email shortly. Please arrive 15 minutes early for your appointment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="appointment-form-container">
            {doctorInfo.doctorName && (
                <div className="doctor-info-summary">
                    <h2>Book Appointment with {doctorInfo.doctorName}</h2>
                    <div className="doctor-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Specialty:</span>
                            <span className="detail-value">{doctorInfo.doctorSpecialty}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{doctorInfo.doctorLocation}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Experience:</span>
                            <span className="detail-value">{doctorInfo.doctorExperience} years</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Rating:</span>
                            <span className="detail-value">{doctorInfo.doctorRating}/5 ⭐</span>
                        </div>
                    </div>
                </div>
            )}
            
            <form onSubmit={handleFormSubmit} className="appointment-form">
                <div className="form-section">
                    <h3 className="section-title">Personal Information</h3>
                    
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Full Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="Enter your full name"
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">
                            Phone Number <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                            placeholder="Enter your phone number"
                            aria-describedby={errors.phoneNumber ? 'phone-error' : undefined}
                        />
                        {errors.phoneNumber && <span id="phone-error" className="error-message">{errors.phoneNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="Enter your email address"
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Appointment Details</h3>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date" className="form-label">
                                Preferred Date <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className={`form-input ${errors.date ? 'error' : ''}`}
                                min={new Date().toISOString().split('T')[0]}
                                aria-describedby={errors.date ? 'date-error' : undefined}
                            />
                            {errors.date && <span id="date-error" className="error-message">{errors.date}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="time" className="form-label">
                                Preferred Time <span className="required">*</span>
                            </label>
                            <select
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className={`form-input ${errors.time ? 'error' : ''}`}
                                aria-describedby={errors.time ? 'time-error' : undefined}
                            >
                                <option value="">Select a time slot</option>
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                            {errors.time && <span id="time-error" className="error-message">{errors.time}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reason" className="form-label">
                            Reason for Visit <span className="required">*</span>
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            className={`form-input ${errors.reason ? 'error' : ''}`}
                            placeholder="Please describe the reason for your appointment"
                            rows="3"
                            aria-describedby={errors.reason ? 'reason-error' : undefined}
                        />
                        {errors.reason && <span id="reason-error" className="error-message">{errors.reason}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes" className="form-label">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Any additional information you'd like to share"
                            rows="3"
                        />
                    </div>
                </div>

                {errors.submit && (
                    <div className="error-message submit-error">{errors.submit}</div>
                )}

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                        aria-describedby="submit-status"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Booking Appointment...
                            </>
                        ) : (
                            'Book Appointment'
                        )}
                    </button>
                    <div id="submit-status" className="sr-only" aria-live="polite">
                        {isSubmitting ? 'Submitting appointment request...' : 'Ready to submit'}
                    </div>
                </div>
            </form>
        </div>
    );
  };

export default AppointmentFormIC
