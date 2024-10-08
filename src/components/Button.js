import React from 'react';
import '../styles/Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--half'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize, destination }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={destination} className='btn-web1'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} type={type} onClick={onClick}>
                {children}
            </button>
        </Link>
    );
};
