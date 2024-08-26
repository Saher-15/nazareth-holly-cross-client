import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";

const GreekChurch = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isPinch, setIsPinch] = useState(false);
  const images = [
    "images/jesus.png",
    "images/img-4.jpg",
    "images/img-9.jpg",
    "images/img-8.jpg"
  ];

  
  const handleClickMap = () => {
    window.open('https://www.google.com/maps/place/Nazareth+City+center/@32.7012442,35.2981717,17z/data=!3m1!4b1!4m6!3m5!1s0x151c4dd4b3386aef:0x652378b0cec4d358!8m2!3d32.7012442!4d35.2981717!16s%2Fg%2F11c5s6wx03?entry=ttu', '_blank');
  };
  

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only once, on mount


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImageIndex !== null) {
        if (event.key === 'ArrowRight') {
          handleNextImage();
        } else if (event.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (event.key === 'Escape') {
          handleCloseModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, handleNextImage, handlePrevImage, handleCloseModal]);

  useEffect(() => {
    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        setTouchStartX(event.touches[0].clientX);
        setIsPinch(false);
      } else {
        setIsPinch(true); // Pinch detected
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length === 1) {
        setTouchEndX(event.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      if (touchStartX !== null && touchEndX !== null && !isPinch) {
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
            handleNextImage(); // Swipe left
          } else {
            handlePrevImage(); // Swipe right
          }
        }
      }

      // Reset touch states
      setTouchStartX(null);
      setTouchEndX(null);
      setIsPinch(false);
    };

    if (selectedImageIndex !== null) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedImageIndex, touchStartX, touchEndX, isPinch, handleNextImage, handlePrevImage]);

  return (
    <div className='mypage'>
      <div className='header'>
        <h1>Explore the beauty of Nazareth City
          <SiGooglemaps
            className="map-btn"
            onClick={handleClickMap}
          />
        </h1>
      </div>
      <div className='content'>
        <p>
          Nazareth’s Old City is most famous for its shuk (outdoor market) which attracts Israelis from across the country looking for traditional Arabic produce. This in itself is an experience, and a great contrast to the air-conditioned malls dotted around the country. For those interested in Christianity, the Old City and surrounds are filled with important Christian sites, including the Church of the Annunciation.
        </p>
        <h2>Historical and Religious Significance</h2>
        <p>
          Nazareth is prominently mentioned in the New Testament. According to Christian tradition, it is the site where the Angel Gabriel announced to Mary that she would bear Jesus, an event commemorated by the Basilica of the Annunciation. Archaeological evidence indicates that Nazareth was a small Jewish village during the time of Jesus. It has been continuously inhabited since antiquity.
        </p>
        <h2>Modern Nazareth</h2>
        <p>
          The city has a diverse population, predominantly Arab Muslims and Christians. As of recent estimates, Nazareth has around 77,000 residents. Nazareth is a vibrant cultural center with various religious, cultural, and educational institutions. It hosts festivals and events that reflect its rich heritage and diverse community. Tourism is a significant part of Nazareth's economy, driven by its religious sites and historical landmarks. Additionally, the city has a mix of small businesses, shops, and markets contributing to its local economy.
        </p>
        <h2>Accessibility and Tourism</h2>
        <p>
          Nazareth is well-connected by road, with frequent bus services from major cities like Tel Aviv, Haifa, and Jerusalem. The city offers various accommodation options, from hotels to guesthouses, catering to the needs of tourists and pilgrims.
        </p>
      </div>
      <div className="gallery">
        <div className="gallery-queue">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Greek Church ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>


      {selectedImageIndex !== null && (
        <div className="modal" onClick={handleCloseModal}>
          <span className="close">&times;</span>
          <img
            className="modal-content"
            src={images[selectedImageIndex]}
            alt={`Enlarged view ${selectedImageIndex + 1}`}
          />
          <button
            className="prev"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from closing the modal
              handlePrevImage();
            }}
          >
            &#10094;
          </button>
          <button
            className="next"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from closing the modal
              handleNextImage();
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export default GreekChurch;
