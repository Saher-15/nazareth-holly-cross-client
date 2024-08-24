import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import '../styles/HeroSection.css';

function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio('/sounds/christians.mp3'));

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Initialize and start playing the audio
    const audio = audioRef.current;
    audio.loop = true;

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='hero-container'>

      {/* <video className='hero-v' src='/videos/video-7.mp4'
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      /> */}
      <video
        className="hero-v"
        src="/videos/video-7.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false} // Try explicitly setting this

      />

      <h1>JESUS CITY AWAITS</h1>
      <p>GRACE IN EVERY CLICK</p>
      <button className='sound-control-btn' onClick={togglePlayPause}>
        <i className={isPlaying ? 'fas fa-volume-mute' : 'fas fa-volume-up'}></i>
      </button>
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
