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
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <span>NAZARETH HOLY CROSS</span> {/* Wrap the text in a span */}
            <i className="fas fa-cross"></i>
          </Link>


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
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;