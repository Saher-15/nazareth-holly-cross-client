import React from 'react';
import '../styles/Pages.css'
function LatinChurch() {
  return (
    <div className='mypage'>
      <div className='header'>
        <h1>Welcome to Nazareth</h1>
        <p>Explore the beauty of Nazareth's Old City</p>
      </div>
      <div className='gallery'>
        <img src="/images/img-2.jpg" alt='Nazareth 1' className='gallery-image' />
        <img src="/images/img-1.jpg" alt='Nazareth 2' className='gallery-image' />
        <img src="/images/img-3.jpg" alt='Nazareth 3' className='gallery-image' />
      </div>
      <p>
        Nazareth’s Old City is most famous for its shuk (outdoor market) which attracts Israelis from across the country looking for traditional Arabic produce. This in itself is an experience, and a great contrast to the air-conditioned malls dotted around the country. For those interested in Christianity, the Old City and surrounds are filled with important Christian sites, including the Church of the Annunciation.
      </p>
    </div>
  );
}

export default LatinChurch;