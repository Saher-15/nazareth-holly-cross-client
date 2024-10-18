import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { useNavigate } from "react-router-dom";
// import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import '../styles/HeroSection.css';

function HeroSection() {
  const { t } = useTranslation(); // Initialize translation hook
  const [isPlaying, setIsPlaying] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [name, setName] = useState('');
  // const [amount, setAmount] = useState('');
  // const [formError, setFormError] = useState('');
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

  return (
    <div className='hero-container'>
      <video
        id="video-field"
        className='hero-v'
        src='https://firebasestorage.googleapis.com/v0/b/nazareth-holy-cross.appspot.com/o/videos%2Fvideo-7.mp4?alt=media&token=b0173721-21a1-46d0-b15b-f2001b912e72'
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      />

      <h1>{t('heroSection.heading')}</h1>  {/* Translated Heading */}
      <p>{t('heroSection.subHeading')}</p>  {/* Translated Subheading */}
      
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
          {t('heroSection.lightCandle')}  {/* Translated Button Text */}
        </Button>

        <Button
          className='btns'
          onClick={handleShopClick}
          destination='shop'
          buttonStyle='btn--half'
          buttonSize='btn--large'
        >
          {t('heroSection.shopButton')}<i className={t('heroSection.shopIcon')} aria-hidden="true"></i> {/* Translated Shop Button with Icon */}
        </Button>

        <Button
          destination='/tour'
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          {t('heroSection.tourButton')} <i className={t('heroSection.tourIcon')} /> {/* Translated Tour Button with Icon */}
        </Button>
      </div>

      {/* The donation modal code is commented out for now */}
      {/* 
      <p className='duty-in-naz'>{t('heroSection.dutyInNaz')}</p>
      <button className='donate-btn' onClick={openModal}>
        <i className='fas fa-donate'></i>
      </button>
      {isModalOpen && (
        <div className='donation-modal show'>
          <div className='donation-content'>
            <button className='close-btn' onClick={closeModal}>×</button>
            {formError && <p className='form-error'>{formError}</p>}
            <form onSubmit={handleSubmit}>
              <h3>{t('heroSection.supportNazareth')}</h3>
              <div className='form-group'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder={t('heroSection.namePlaceholder')}
                />
              </div>
              <div className='form-group'>
                <input
                  type='number'
                  id='amount'
                  name='amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder={t('heroSection.amountPlaceholder')}
                />
              </div>
              <button
                className='donation-submit'
                type='submit'
                disabled={!name || !amount}
              >
                {t('heroSection.donateButton')}
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default HeroSection;
