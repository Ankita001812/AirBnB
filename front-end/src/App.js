import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
// import BookingPage from './components/BookingPage'; 
import Confirmation from './components/Confirmation'; 
import BookingSum from './components/BookingSum';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/booking" element={<BookingPage />} />
         */}
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/all-bookings" element={<BookingSum />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
