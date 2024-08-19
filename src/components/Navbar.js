import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>

      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu} >
        <i className="fas fa-cross" style={{ color: "rgba(255, 0, 0, 0.5)", fontSize: "2em", marginRight: "10px"}}></i>
        <span>NAZARETH HOLY CROSS</span>
        </Link>
        <div className='navbar-container'>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/tour' className='nav-links' onClick={closeMobileMenu}>
                Tour
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/candle'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Candle
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/shop'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact-us'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;