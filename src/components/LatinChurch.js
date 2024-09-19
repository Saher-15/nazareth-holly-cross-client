import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";
import "../App.css";

const LatinCurch = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isPinch, setIsPinch] = useState(false);
  const images = [
    "images/latin/latin1.jpg",   
    "images/latin/latin2.jpg",
    "images/latin/latin3.jpg",
    "images/latin/latin4.jpg",
    "images/latin/latin5.jpg",
    "images/latin/latin6.jpg",
    "images/latin/latin7.jpg",
    "images/latin/latin8.jpg",
    "images/latin/latin9.jpg",
    "images/latin/latin10.jpg",
    "images/latin/latin11.jpg",
    "images/latin/latin12.jpg",
    "images/latin/latin13.jpg",
    "images/latin/latin14.jpg",
    "images/latin/latin15.jpg",
    "images/latin/latin16.jpg",
    "images/latin/latin17.jpg",
    "images/latin/latin18.jpg",
    "images/latin/latin19.jpg",
    "images/latin/latin20.jpg",
    "images/latin/latin21.jpg",
    "images/latin/latin22.jpg",
    "images/latin/latin23.jpg",
    "images/latin/latin24.jpg",
    "images/latin/latin25.jpg",
    "images/latin/latin26.jpg",
    "images/latin/latin27.jpg",
    "images/latin/latin28.jpg",
    "images/latin/latin29.jpg",
    "images/latin/latin30.jpg",
    "images/latin/latin31.jpg",
    "images/latin/latin32.jpg",
    "images/latin/latin33.jpg",
    "images/latin/latin34.jpg",
  ];

  const handleClickMap = () => {
    window.open('https://www.google.com/maps/place/Nazareth+City+center/@32.7021997,35.2974033,17z/data=!4m6!3m5!1s0x151c4dd4b3386aef:0x652378b0cec4d358!8m2!3d32.7012442!4d35.2981717!16s%2Fg%2F11c5s6wx03?entry=ttu', '_blank');
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
        <h1>Explore the beauty of the Latin Church
          <SiGooglemaps
            className="map-btn"
            onClick={handleClickMap}
          />
        </h1>
      </div>
      <div className='content'>
        <p>
          The Latin Church, also known as the Basilica of the Annunciation, is a significant religious site located in Nazareth, Israel. It stands as one of the largest churches in the Middle East and holds deep religious significance for Christians worldwide.
        </p>
        <p>
          <strong>Historical Background:</strong> The site is traditionally believed to be the place where the Angel Gabriel announced to the Virgin Mary that she would conceive and give birth to Jesus, an event known as the Annunciation. The basilica has a long history dating back to the early centuries of Christianity, with successive churches built on the site over time.
        </p>
        <p>
          <strong>Architectural Features:</strong> The current basilica, constructed between 1955 and 1969, features a distinctive two-story structure. The upper church is used for worship services, while the lower church encloses the Grotto of the Annunciation, believed to be the actual site of the Annunciation. The basilica's architecture blends modern styles with traditional elements, and its interior is adorned with mosaics, frescoes, and artworks depicting scenes from the life of Christ.
        </p>
        <p>
          <strong>Visiting the Basilica:</strong> The Basilica of the Annunciation is a popular destination for pilgrims and tourists visiting Nazareth. Visitors can explore both the upper and lower churches, admire the artistic and architectural features, and participate in religious ceremonies and events held at the basilica. The site offers a profound spiritual experience and serves as a symbol of faith and heritage.
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

export default LatinCurch;
