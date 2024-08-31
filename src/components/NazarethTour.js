import React, { useEffect } from 'react';
import '../styles/NazarethTour.css'; 

const NazarethTour = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-tour">
      <h1 className="page-heading">Explore Nazareth</h1>
      <p className="video-message">
        Let's take a tour in Nazareth, a city brimming with history and culture. Discover vibrant markets, historic churches, and unique landmarks for an unforgettable experience.
      </p>
      <div className="video-container">
        <video src="/videos/tour.mp4" type="video/mp4" className='video-' controls poster='images/jesus_city_tour.png'>
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="video-description">
        Enjoy the sights and sounds of Nazareth in this immersive video tour. From bustling marketplaces to serene historical sites, get a glimpse of the beauty and charm of this ancient city.
      </p>
      <a href="/" className="cta-button">Learn More About Nazareth</a>
    </div>
  );
};

export default NazarethTour;
