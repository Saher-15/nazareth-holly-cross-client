import React from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";

const GreekChurch = () => {

  const handleClickMap = () => {
    window.location.href = 'https://www.google.com/maps/place/%D9%83%D9%86%D9%8A%D8%B3%D8%A9+%D8%A7%D9%84%D8%A8%D8%B4%D8%A7%D8%B1%D8%A9+%D9%84%D9%84%D8%B1%D9%88%D9%85+%D8%A7%D9%84%D8%A7%D8%B1%D8%AB%D9%88%D8%B0%D9%83%D8%B3%E2%80%AD/@32.7070723,35.3016619,17z/data=!4m6!3m5!1s0x151c4c29d17b5477:0xc7296709e9a3ab85!8m2!3d32.7070723!4d35.3016619!16s%2Fm%2F03gtxsl?entry=ttu';
  };

  return (
    <div className='mypage'>
      <div className='header'>
        <h1>Welcome to Nazareth</h1>
        <p>
          Explore the beauty of Nazareth's Old City
          <SiGooglemaps className="text-6xl max-sm:text-4xl text-accent-content" onClick={handleClickMap} />
        </p>
      </div>
      <div className='gallery'>
        <img src="/images/img-2.jpg" alt='Nazareth 1' className='gallery-image' />
        <img src="/images/img-8.jpg" alt='Nazareth 2' className='gallery-image' />
        <img src="/images/img-3.jpg" alt='Nazareth 3' className='gallery-image' />
        {/* Add more images with the same URL */}
        <img src="/images/img-2.jpg" alt='Nazareth 1' className='gallery-image' />
        <img src="/images/img-1.jpg" alt='Nazareth 2' className='gallery-image' />
        <img src="/images/img-3.jpg" alt='Nazareth 3' className='gallery-image' />
        {/* Add as many images as you want */}
      </div>
      <p>
        Nazareth’s Old City is most famous for its shuk (outdoor market) which attracts Israelis from across the country looking for traditional Arabic produce. This in itself is an experience, and a great contrast to the air-conditioned malls dotted around the country. For those interested in Christianity, the Old City and surrounds are filled with important Christian sites, including the Church of the Annunciation.
      </p>
    </div>
  );
}

export default GreekChurch;
