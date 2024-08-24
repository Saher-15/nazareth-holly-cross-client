import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/GallaryPage.css'; // Import the CSS file for styling

const LiveVideo = () => {
  const galleryItems = [
    { id: 1, src: 'https://via.placeholder.com/300', caption: 'Image 1 description' },
    { id: 2, src: 'https://via.placeholder.com/300', caption: 'Image 2 description' },
    { id: 3, src: 'https://via.placeholder.com/300', caption: 'Image 3 description' },
    { id: 4, src: 'https://via.placeholder.com/300', caption: 'Image 4 description' },
    { id: 5, src: 'https://via.placeholder.com/300', caption: 'Image 5 description' },
    // Add more items here
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>
      <Slider {...settings}>
        {galleryItems.map(item => (
          <div key={item.id} className="gallery-item">
            <img src={item.src} alt={`Gallery item ${item.id}`} />
            <p>{item.caption}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LiveVideo;
