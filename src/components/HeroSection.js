import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
<video src='/videos/video-7.mp4' autoPlay loop muted playsInline controls />
      <h1>JESUS CITY AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          destination='/candle'
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          LIGHT A CANDLE
        </Button>
        <Button
          destination='/tour'
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          NAZARETH TOUR <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
