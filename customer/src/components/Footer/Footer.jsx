import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/filters">All houses</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
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
