import React from "react";
import { Link } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import '../styles/Footer.css';

function Footer() {
  return (
    <div className='footer-container'>

      <div className="topbar border-b border-gray-800">
        <ul>
          <li>
            <FaHeadphones className="text-white text-2xl max-sm:text-lg text-accent-content" />{" "}
            <span className="text-white text-2xl max-sm:text-lg text-accent-content">
              +972 504368748
            </span>
          </li>
          <li>
            <FaRegEnvelope className="text-white text-2xl max-sm:text-lg text-accent-content" />{" "}
            <span className="text-white text-2xl max-sm:text-lg text-accent-content">
              nazarethholycross@gmail.com
            </span>
          </li>
        </ul>
      </div>
      <br />
      <div className="footer-links">
        <Link to='/about' className='about-us-link'>About Us</Link>
      </div>
      <aside>
        <p className="text-white text-2xl max-sm:text-sm text-accent-content">
          Copyright © 2024 - All right reserved by NazarethHolyCross<br />Created by Saher Saadi
        </p>
      </aside>
    </div>

  );
}

export default Footer;
