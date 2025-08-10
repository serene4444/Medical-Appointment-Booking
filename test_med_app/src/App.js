import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/NavBar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/Medical-Appointment-Booking">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
