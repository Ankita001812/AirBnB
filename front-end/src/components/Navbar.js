import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to='/' className="logo-link"><img src="/images/air.png" alt="AirBnB" /></Link></div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/">Property Listing</Link>
        </li> */}
        <li>
          <Link to="/booking">Bookings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
