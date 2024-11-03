import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../../../admin/assests/assests';
import Login from '../Login/Login';
import { logout } from '../../../../backend/config/firebase';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleLogin = () => setShowLogin(!showLogin);

  const handleLogout = () => {
    logout().then(() => {
      setLoggedIn(false);
      setShowDropdown(false);
    });
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <li onClick={() => scrollToSection('home')}>Home</li>
        <li onClick={() => scrollToSection('about')}>About Us</li>
        <li onClick={() => scrollToSection('contact')}>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search} alt="" className="search1" />
        {loggedIn ? (
          <div className="account-section" onClick={toggleDropdown}>
            <button>Account</button>
            {showDropdown && (
              <div className="dropdown">
                <p>My Profile</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={toggleLogin}>Sign In</button>
        )}
      </div>
      {showLogin && <Login onClose={toggleLogin} onLogin={() => setLoggedIn(true)} />}
    </div>
  );
};

export default Navbar;
