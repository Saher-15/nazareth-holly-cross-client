import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { useNavigate } from "react-router-dom";
import '../styles/HeroSection.css';

function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');
  const audioRef = useRef(new Audio('/sounds/christians.mp3'));
  const navigate = useNavigate();

  const handleShopClick = () => {
    // Reset filters before navigating
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('sortOrder');
    localStorage.setItem('currentPage', 1);

    // Navigate to the shop page
    navigate('/shop');
  };

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) {
      setFormError('Please fill out all required fields.');
      setTimeout(() => setFormError(''), 3000);
      return;
    }
    navigate("/checkoutdonation", { state: { name: name , amount : amount} });

    // navigate(`/payment?name=${encodeURIComponent(name)}&amount=${amount}`);
  };

  return (
    <div className='hero-container'>
      <video id="video-field" className='hero-v' src='https://firebasestorage.googleapis.com/v0/b/nazareth-holy-cross.appspot.com/o/videos%2Fvideo-7.mp4?alt=media&token=b0173721-21a1-46d0-b15b-f2001b912e72' autoPlay loop muted playsInline controls={false} />
      
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
          className='btns'
          onClick={handleShopClick}
          destination='shop'
          buttonStyle='btn--half'
          buttonSize='btn--large'
        >
          Shop<i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </Button>
        <Button
          destination='/tour'
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          NAZARETH TOUR <i className='far fa-play-circle' />
        </Button>
        <button className='donate-btn' onClick={openModal}>
          <i className='fas fa-donate'></i>
        </button>
      </div>

      {isModalOpen && (
        <div className='donation-modal show'>
          <div className='donation-content'>
            <button className='close-btn' onClick={closeModal}>×</button>
            <h2>Donation Form</h2>
            {formError && <p className='form-error'>{formError}</p>}
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input 
                  type='text' 
                  id='name' 
                  name='name' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className='form-group'>
                <label htmlFor='amount'>Amount:</label>
                <input 
                  type='number' 
                  id='amount' 
                  name='amount' 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required 
                />
              </div>
              <button 
                type='submit'
                disabled={!name || !amount}
              >
                Donate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
