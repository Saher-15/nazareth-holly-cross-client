import React, { useState } from 'react';
import '../styles/PageTransition.css'; // Import CSS file for styling transitions

const PageTransitionExample = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const goToNewPage = () => {
    setCurrentPage('newPage');
  };

  return (
    <div className="page-container">
      {currentPage === 'home' && (
        <div className="page home">
          <h1>Welcome to the Home Page!</h1>
          <button onClick={goToNewPage}>Go to New Page</button>
        </div>
      )}
      {currentPage === 'newPage' && (
        <div className="page newPage">
          <h1>Welcome to the New Page!</h1>
          {/* Content for the new page */}
        </div>
      )}
    </div>
  );
};

export default PageTransitionExample;
