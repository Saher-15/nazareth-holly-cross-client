import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaLinkedin, FaInstagram } from "react-icons/fa";
import '../styles/Footer.css';
// import logo from '../images/logo.webp'; // Ensure the correct path to your logo

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section about-us">
          <h2>About Us</h2>
          <p>
            We are dedicated to preserving the spirit of Nazareth and spreading the message of hope. Visit our website to explore the journey.
          </p>
          <Link to='/about' className='about-us-link'>
            Learn More
          </Link>
        </div>

        <div className="footer-section contact-us">
          <h2>Contact Us</h2>
          <div className="contact-details">
            <a href="mailto:nazarethholycross@gmail.com" className="email-button">
              <FaRegEnvelope className="icon" />
              <span>nazarethholycross@gmail.com</span>
            </a>
            <a href="https://www.instagram.com/your_instagram_handle/" target="_blank" rel="noopener noreferrer" className="instagram-button">
              <FaInstagram className="icon" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>

        <div className="footer-section credits">
          <h2>Credits</h2>
          <div className="credit-item">
            <a href="https://www.linkedin.com/in/saher-saadi-a637b11b5/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <FaLinkedin className="linkedin-icon" />
              Saher Saadi
            </a>
          </div>
          <div className="credit-item">
            <a href="http://linkedin.com/in/haythamt95" target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <FaLinkedin className="linkedin-icon" />
              Haytham Taweel
            </a>
          </div>
        </div>
      </div>
      <div className="footer-logo">
        <img src='/images/logo.webp' alt="Nazareth Holy Cross Logo" />
      </div>
      <div className="footer-bottom">
        <p className="copyright-text">
          Copyright © 2024 - All rights reserved by NazarethHolyCross
        </p>
      </div>
    </div>
  );
}

export default Footer;
