import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Components/Sign_Up/signup';
import Login from './Components/login/login';
import Navbar from './Components/NavBar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/Medical-Appointment-Booking">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
