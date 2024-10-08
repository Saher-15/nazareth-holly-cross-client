import React from 'react';
import CardItem from './CardItem';
import '../styles/Cards.css'
function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/latin/latin1.jpg'
              text='Explore The Church Of The Annunciation'
              label='Latin Church'
              path='/Latin'
            />
            <CardItem
              src='images/greek/greek1.jpg'
              text='Explore The Greek Orthodox Church'
              label='Greek Orthodox Church'
              path='/Greek'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/mary/mary4.jpg'
              text="Explore the Mary's well deep in Nazareth"
              label="Mary's Well"
              path='/MarysWell'
            />
            <CardItem
              src='images/old/old2.jpg'
              text='Explore The Old City Of'
              label='Old City'
              path='/OldCity'
            />
            <CardItem
              src='images/nazareth/nazareth1.webp'
              text='The City of Nazareth, Jesus City'
              label='City'
              path='/City'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;