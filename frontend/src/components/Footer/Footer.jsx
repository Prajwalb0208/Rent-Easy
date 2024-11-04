import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
const Footer = () => {
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-center">
          <ul className="footer-links">
            <li><a href="/" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="/filters" onClick={(e) => { e.preventDefault(); scrollToSection('all-houses'); }}>All Houses</a></li>
            <li><a href="/contact-us" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-right">
          <p>Follow us on:</p>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RentEasy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
