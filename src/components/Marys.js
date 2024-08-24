import React, { useEffect } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";

const Marys = () => {

  const handleClickMap = () => {
    window.location.href = 'https://www.google.com/maps/place/Mary%E2%80%99s+Well/@32.7035145,35.296555,14z/data=!4m6!3m5!1s0x151c4c29c6d1008d:0x23e218b489e18311!8m2!3d32.7060586!4d35.3013417!16zL20vMGY3XzJ2?entry=ttu';
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
          Explore the beauty of Mary's Well
        </p>
      </div>
      <div className='content'>

        <p>
          Mary's Well, also known as the Well of the Virgin, is a significant historical and religious site located in Nazareth, Israel. It is traditionally believed to be the place where the Angel Gabriel announced to the Virgin Mary that she would bear Jesus, an event known as the Annunciation.
        </p>
        <p>
          <strong>Historical and Religious Significance:</strong>
          <ul>
            <li><strong>Biblical Connection:</strong> According to Christian tradition, Mary's Well is where Mary was drawing water when the Angel Gabriel appeared to her and announced that she would conceive and give birth to Jesus Christ. This event is a central part of the Christian story of the Annunciation.</li>
            <li><strong>Cultural Importance:</strong> The well has been a vital source of water for the local community for centuries. It served as a gathering place for the people of Nazareth, making it an integral part of daily life in the town.</li>
            <li><strong>Architectural Features:</strong> The well itself is part of a larger complex that includes the Greek Orthodox Church of the Annunciation. The current structure of the church dates back to the 18th century, but the well and the site have much older roots.</li>
          </ul>
        </p>
        <p>
          <strong>Modern-Day Site:</strong>
          <ul>
            <li><strong>Restoration Efforts:</strong> The fountain at Mary's Well has undergone several restorations over the years, notably in 1967 and 2000. Despite these efforts, the well does not function today as it once did.</li>
            <li><strong>Tourist Attraction:</strong> Mary's Well is a popular destination for pilgrims and tourists. Visitors come to see the historic site and to experience the place where, according to tradition, the Annunciation took place.</li>
            <li><strong>Surrounding Area:</strong> The well is located in Nazareth's Old City, an area rich with historical and religious landmarks. Nearby attractions include the Basilica of the Annunciation, the Greek Orthodox Church of the Annunciation, and various other sites related to the life of Jesus and Mary.</li>
          </ul>
        </p>
        <p>
          <strong>Visiting Mary's Well:</strong>
          <ul>
            <li><strong>Location:</strong> Mary's Well is situated in the heart of Nazareth, making it easily accessible for visitors exploring the Old City.</li>
            <li><strong>Accessibility:</strong> The site is open to the public and can be visited throughout the year. It is advisable to check local visitor information for any specific visiting hours or guidelines.</li>
            <li><strong>Cultural Experience:</strong> Visiting Mary's Well offers a unique opportunity to connect with the rich religious and cultural heritage of Nazareth. The site provides insight into the daily lives of the people in ancient times and their spiritual practices.</li>
          </ul>
        </p>
      </div>
    </div>

  );
}

export default Marys;
