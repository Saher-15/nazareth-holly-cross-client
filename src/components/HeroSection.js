import React from 'react';
import { Button } from './Button';
import '../styles/HeroSection.css';


function HeroSection() {


  return (
    <div className='hero-container'>
      <video src='/videos/video-7.mp4' autoPlay loop muted playsInline controls />
      <h1>JESUS CITY AWAITS</h1>
      <p>GRACE IN EVERY CLICK</p>
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
          destination='/shop'
          className='btns'
          buttonStyle='btn--half'
          buttonSize='btn--large'
        >
          SHOP <i className="fa fa-shopping-cart" aria-hidden="true"></i>
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
