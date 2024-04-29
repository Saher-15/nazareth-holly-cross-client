import React from 'react';
import '../styles/Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>

        <div class='social-media-wrap'>

          <div className='contact-info'>
            <p className='contact-item'>Email: example@example.com</p>
            <p className='contact-item'>Phone: +1234567890</p>
          </div>

          <Link to='/privacy-policy' className='privacy-policy-link'>Privacy Policy</Link>

          <small class='website-rights'>NAZARETH HOLLY CROSS © 2024</small>

        </div>
    </div>
  );
}

export default Footer;
