import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";
import "../App.css";

const GreekChurch = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isPinch, setIsPinch] = useState(false);
  const images = [
    "images/greek/greek1.jpg",
    "images/greek/greek2.jpg",
    "images/greek/greek3.jpg",
    "images/greek/greek4.jpg",
    "images/greek/greek5.jpg",
    "images/greek/greek6.jpg",
    "images/greek/greek7.jpg",
    "images/greek/greek8.jpg",
    "images/greek/greek9.jpg",
    "images/greek/greek10.jpg",
    "images/greek/greek11.jpg",
    "images/greek/greek12.jpg",

  ];

  const handleClickMap = () => {
    window.open('https://www.google.com/maps/place/The+Greek+Orthodox+Church+of+the+Annunciation/@32.7070723,35.3016619,17z/data=!3m1!4b1!4m6!3m5!1s0x151c4c29d17b5477:0xc7296709e9a3ab85!8m2!3d32.7070723!4d35.3016619!16s%2Fm%2F03gtxsl?entry=ttu', '_blank');
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
    window.scrollTo(0, 0);
  }, []);

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
        <h1>
          Explore the beauty of Greek Church
          <SiGooglemaps
            className="map-btn"
            onClick={handleClickMap}
          />
        </h1>
      </div>

      <div className='content'>
        <p>
          The Greek Orthodox Church of the Annunciation sits above the spring where Orthodox Christians believe the Annunciation took place. As the Virgin Mary went to draw water from the spring, the Archangel Gabriel appeared and informed her that she would conceive and give birth to a son who she would name Jesus. The current church dates back to 1750, when Daher al-Omar, the Bedouin ruler of the Galilee, gave the Greek Orthodox community permission to build it.
        </p>
        <p>
          The church has a central nave with two aisles and contains a beautiful wooden iconostasis donated by a Greek merchant in 1767. The church was redecorated by Romanian artists from 1977 to 1978. An arched passageway leads down to a small chapel, which is decorated with Armenian tiles and has seven steps leading to the spring, believed to have been built by the Crusaders in the 12th century.
        </p>
        <p>
          About 140 meters from the church is Mary’s Well, which was once fed by the spring and served as a local source of water for several centuries. The fountain was repaired in 1967 and again in 2000 but does not function today.
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
