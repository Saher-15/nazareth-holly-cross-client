import React, { useEffect } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";

const LatinCurch = () => {

  const handleClickMap = () => {
    window.location.href = 'https://www.google.com/maps/place/Nazareth+City+center/@32.7021997,35.2974033,17z/data=!4m6!3m5!1s0x151c4dd4b3386aef:0x652378b0cec4d358!8m2!3d32.7012442!4d35.2981717!16s%2Fg%2F11c5s6wx03?entry=ttu';
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  
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
          Explore the beauty of the Latin Church
        </p>
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
    </div>
  );
}

export default LatinCurch;
