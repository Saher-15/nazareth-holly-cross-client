import React from 'react';
import '../styles/NazarethTour.css'; 

const NazarethTour = () => {
  return (
    <div className="container-tour">
      <p className="video-message">
        Let's take a tour in Nazareth, a city brimming with history and culture. Discover vibrant markets, historic churches, and unique landmarks for an unforgettable experience.
      </p>
      <video className='video-' controls >
        <source src="/videos/tour.mp4" type="video/mp4" />
      </video>

      
    </div>
  );
};

export default NazarethTour;
