import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      <h1>JESUS CITY AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          destination='/services'
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
          onClick={console.log('hey')}
        >
          NAZARETH TOUR <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;