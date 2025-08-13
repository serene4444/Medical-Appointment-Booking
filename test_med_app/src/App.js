import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignUp from './Components/Sign_Up/signup';
import Login from './Components/login/login';
import Navbar from './Components/NavBar/Navbar';
import Home from './Components/Home/Home';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'; 

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
