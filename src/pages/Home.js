import React, {useEffect } from 'react';
import '../App.css';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection';

function Home() {
  const soundUrl = '/sounds/christians.mp3';

  useEffect(() => {
    const audio = new Audio(soundUrl);
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return (
    <>
      <HeroSection />
      <Cards />
    </>
  );
}

export default Home;
