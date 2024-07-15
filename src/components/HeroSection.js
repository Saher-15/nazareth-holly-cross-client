import React, { useEffect } from 'react';
import { Button } from './Button';
import '../styles/HeroSection.css';

function HeroSection() {
  // const soundUrl = '/sounds/christians.mp3';
  // const audioRef = useRef(new Audio(soundUrl));

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Initialize and start playing the audio
    // const audio = audioRef.current;
    // audio.loop = true;
    // audio.play();

    // // Cleanup on unmount
    // return () => {
    //   audio.pause();
    //   audio.currentTime = 0;
    // };
  }, []);

  // const togglePlayPause = () => {
  //   const audio = audioRef.current;
  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  return (
    <div className='hero-container'>
      <video src='/videos/video-7.mp4' autoPlay loop muted playsInline controls={false} />
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
        {/* <Button
          onClick={togglePlayPause}
          className='btns btn--sound-control'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
        </Button> */}
      </div>
    </div>
  );
}

export default HeroSection;
