import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MyForm from './components/MyForm'; 
import AddMovie from './components/AddMovie'; 
import HomePage from './components/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
