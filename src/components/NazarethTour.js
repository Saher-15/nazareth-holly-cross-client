import React from 'react';
import '../styles/NazarethTour.css'; // Ensure this CSS file exists

const NazarethTour = () => {
  return (
    <div className="container-tour">
      <p className="prayer-message">
        Let's take a tour in Nazareth, a city brimming with history and culture. Discover vibrant markets, historic churches, and unique landmarks for an unforgettable experience.
      </p>
      <video className='video-' controls poster="/images/jesus_city_tour.png">
        <source src="/videos/tour.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default NazarethTour;
