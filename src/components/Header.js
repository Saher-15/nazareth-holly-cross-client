import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/Header.css";

function Header() {
    return (
        <>
            <div className="topbar border-b border-gray-800">
                <ul>
                    <li>
                        <div className="flex-none">
                            <Link to="/cart" className="cart-icon">
                                <FaShoppingCart className="text-2xl max-sm:text-lg text-white" />
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex-none">
                            <Link to="/shop">shop</Link>
                        </div>
                    </li>
                </ul>
            </div>

        </>
    );
}

export default Header;
