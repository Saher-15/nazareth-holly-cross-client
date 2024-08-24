import React from 'react';
import '../App.css';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection';
import LiveVideo from '../components/LiveVideo';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <LiveVideo />

    </>
  );
}

export default Home;
