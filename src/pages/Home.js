import React, { useEffect } from 'react';
import '../App.css';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection';

function Home() {
  const soundUrl = '/sounds/christians.mp3'; // Provide the URL of your sound file

  useEffect(() => {
    const audio = new Audio(soundUrl);
    audio.loop = true; // Set loop to true to continuously play the sound
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <>
      <HeroSection />
      <Cards />
    </>
  );
}

export default Home;
