import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";

const GreekChurch = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const images = [
"images/jesus.png",
"images/img-4.jpg",
"images/img-9.jpg",
"images/img-8.jpg"
  ];

  const handleClickMap = () => {
    window.location.href = 'https://www.google.com/maps/place/The+Greek+Orthodox+Church+of+the+Annunciation/@32.7070723,35.3016619,17z/data=!3m1!4b1!4m6!3m5!1s0x151c4c29d17b5477:0xc7296709e9a3ab85!8m2!3d32.7070723!4d35.3016619!16s%2Fm%2F03gtxsl?entry=ttu';
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

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
  }, [selectedImageIndex, handleNextImage, handlePrevImage]);

  return (
    <div className='mypage'>
      <div className='header'>
        <h1>Welcome to Nazareth
          <SiGooglemaps
            className="custom-icon-size text-blue-500 hover:text-red-500 absolute top-0 left-0 m-4"
            onClick={handleClickMap}
          />
        </h1>
        <p>
          Explore the beauty of Greek Church
        </p>
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
        <h2>Gallery</h2>
        <div className="gallery-grid">
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
          <a
            className="prev"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from closing the modal
              handlePrevImage();
            }}
          >
            &#10094;
          </a>
          <a
            className="next"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from closing the modal
              handleNextImage();
            }}
          >
            &#10095;
          </a>
        </div>
      )}
    </div>
  );
}

export default GreekChurch;
