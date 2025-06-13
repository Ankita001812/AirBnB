// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyForm from './components/MyForm'; // Adjust the path as necessary
import AddMovie from './components/AddMovie'; // Adjust the path as necessary

// function Home() {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h2>Welcome to the App</h2>
//       <Link to="/form">
//         <button>Go to Form</button>
//       </Link>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<MyForm />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
