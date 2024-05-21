import React, { useEffect } from 'react';
import '../styles/Pages.css';
import { SiGooglemaps } from "react-icons/si";

const GreekChurch = () => {

  const handleClickMap = () => {
    window.location.href = 'https://www.google.com/maps/place/Nazareth+City+center/@32.7012442,35.2981717,17z/data=!3m1!4b1!4m6!3m5!1s0x151c4dd4b3386aef:0x652378b0cec4d358!8m2!3d32.7012442!4d35.2981717!16s%2Fg%2F11c5s6wx03?entry=ttu';
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
          /></h1>
        <p>
          Explore the beauty of Nazareth City
        </p>
      </div>
      <div className='content'>
        <p>
          Nazareth’s Old City is most famous for its shuk (outdoor market) which attracts Israelis from across the country looking for traditional Arabic produce. This in itself is an experience, and a great contrast to the air-conditioned malls dotted around the country. For those interested in Christianity, the Old City and surrounds are filled with important Christian sites, including the Church of the Annunciation.
        </p>
        <h2>Historical and Religious Significance</h2>
        <p>
          <img src="/images/Historical.jpg" alt="Basilica of the Annunciation" className="content-image" />
          Nazareth is prominently mentioned in the New Testament. According to Christian tradition, it is the site where the Angel Gabriel announced to Mary that she would bear Jesus, an event commemorated by the Basilica of the Annunciation. Archaeological evidence indicates that Nazareth was a small Jewish village during the time of Jesus. It has been continuously inhabited since antiquity.
        </p>
        <h2>Modern Nazareth</h2>
        <p>
          <img src="/images/city_view.jpg" alt="Modern Nazareth" className="content-image" />
          The city has a diverse population, predominantly Arab Muslims and Christians. As of recent estimates, Nazareth has around 77,000 residents. Nazareth is a vibrant cultural center with various religious, cultural, and educational institutions. It hosts festivals and events that reflect its rich heritage and diverse community. Tourism is a significant part of Nazareth's economy, driven by its religious sites and historical landmarks. Additionally, the city has a mix of small businesses, shops, and markets contributing to its local economy.
        </p>
        <h2>Accessibility and Tourism</h2>
        <p>
          <img src="/images/tourism.jpg" alt="Tourism in Nazareth" className="content-image" />
          Nazareth is well-connected by road, with frequent bus services from major cities like Tel Aviv, Haifa, and Jerusalem. The city offers various accommodation options, from hotels to guesthouses, catering to the needs of tourists and pilgrims.
        </p>
      </div>
    </div>
  );
}

export default GreekChurch;
