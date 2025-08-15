import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignUp from './Components/Sign_Up/signup';
import Login from './Components/login/login';
import Navbar from './Components/NavBar/Navbar';
import Home from './Components/Home/Home';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'; 
import AppointmentFormIC from './Components/InstantConsultationBooking/AppointmentFormIC/AppointmentFormIC'; 

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar showHeroContent={isHomePage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route path="/appointment" element={<AppointmentFormIC />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
