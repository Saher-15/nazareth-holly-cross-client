import React from 'react';
import '../App.css';
import './HeroSection.css';

function NazarethTour() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
    </div>
  );
}

export default NazarethTour;