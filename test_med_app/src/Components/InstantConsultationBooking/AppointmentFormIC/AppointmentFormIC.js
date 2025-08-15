import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './AppointmentFormIC.css';

const AppointmentFormIC = () => {
    const location = useLocation();
    const doctorInfo = location.state || {};
    
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log('Appointment booked:', { 
        name, 
        phoneNumber, 
        doctor: doctorInfo.doctorName, 
        specialty: doctorInfo.doctorSpecialty,
        selectedSlot 
      });
      // Here you could add actual booking logic
      alert(`Appointment booked with ${doctorInfo.doctorName}`);
      setName('');
      setPhoneNumber('');
      setSelectedSlot(null);
    };
  
    return (
      <div className="appointment-form-container">
        {doctorInfo.doctorName && (
          <div className="doctor-info-summary">
            <h2>Book Appointment with {doctorInfo.doctorName}</h2>
            <p><strong>Specialty:</strong> {doctorInfo.doctorSpecialty}</p>
            <p><strong>Location:</strong> {doctorInfo.doctorLocation}</p>
            <p><strong>Experience:</strong> {doctorInfo.doctorExperience} years</p>
            <p><strong>Rating:</strong> {doctorInfo.doctorRating}/5</p>
          </div>
        )}
        
        <form onSubmit={handleFormSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">Book Now</button>
        </form>
      </div>
    );
  };

export default AppointmentFormIC
