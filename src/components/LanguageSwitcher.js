import React, { useState } from 'react';
import i18n from '../i18n'; // Adjust the path based on your file structure
import '../styles/LanguageSwitcher.css'; // Import the stylesheet
const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

    const changeLanguage = (lng) => {
        if (i18n && typeof i18n.changeLanguage === 'function') {
            i18n.changeLanguage(lng);
            setIsOpen(false); // Close the dropdown after selecting a language
        } else {
            console.error('i18n is not defined or changeLanguage is not a function');
        }
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev); // Toggle dropdown visibility
    };

    return (
        <div className="language-switcher">
            <button className="language-button" onClick={toggleDropdown}>
                Select Language
            </button>
            {isOpen && (
                <div className="language-options">
                    <div className="language-card" onClick={() => changeLanguage('en')}>
                        <h3>English</h3>
                    </div>
                    <div className="language-card" onClick={() => changeLanguage('fr')}>
                        <h3>French</h3>
                    </div>
                    <div className="language-card" onClick={() => changeLanguage('es')}>
                        <h3>Spanish</h3>
                    </div>
                    {/* Add other languages as needed */}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
