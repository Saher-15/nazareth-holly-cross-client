import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Navbar = ({ size, setShow }) => {
    return (
        <nav>
            <div className="nav_box">

                <div className="search">
                    <input type="text" placeholder="Search products..." />
                </div>
                <div className="search">
                    <button type="submit"><i className="fas fa-search"></i></button>
                </div>
                <div >
                    <Link to="/cart" className="cart_link">
                        <i className="fas fa-cart-plus"></i>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
