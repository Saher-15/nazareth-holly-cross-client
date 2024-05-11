import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>

      <div className='social-media-wrap'>
        <div className='contact-info'>
          <p className='contact-item'>Email: nazarethhollycross@gmail.com</p>
          <p className='contact-item'>Phone: +1234567890</p>
        </div>
        <div className="footer-links">
          <Link to='/about' className='about-us-link'>About Us</Link>
        </div>
        <small className='website-rights'>NAZARETH HOLY CROSS © 2024</small>
      </div>
    </div>
  );
}

export default Footer;
