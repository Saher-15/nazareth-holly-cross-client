import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaLinkedin } from "react-icons/fa";
import '../styles/Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <div className="footer-links">
        <Link to='/about' className='about-us-link'>About Us</Link>
      </div>

      <div className="topbar">
        <ul>
          <li>
            <FaRegEnvelope className="icon" />
            <span className="contact-info">nazarethholycross@gmail.com</span>
          </li>
        </ul>
      </div>

      <aside className="footer-credits">
        <p className="copyright-text">
          Copyright © 2024 - All rights reserved by NazarethHolyCross
        </p>
        <div className="credits">
          <div className="credit-item">
            <a
              href="https://www.linkedin.com/in/saher-saadi-a637b11b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <FaLinkedin className="linkedin-icon" />
              Saher Saadi
            </a>
          </div>
          <div className="credit-item">
            <a
              href="http://linkedin.com/in/haythamt95"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <FaLinkedin className="linkedin-icon" />
              Haytham Taweel
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Footer;
