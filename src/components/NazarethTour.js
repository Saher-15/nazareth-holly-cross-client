import React from 'react';
import '../styles/NazarethTour.css'; // Ensure this CSS file exists

const NazarethTour = () => {
  return (
      <div className="video-wrapper">
        <video controls>
          <source src="/videos/tour.mp4" type="video/mp4" />
        </video>
    </div>
  );
};

export default NazarethTour;
