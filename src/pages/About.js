import React from "react";
import '../App.css';

const About = () => {
  return (
    <div style={{ padding: '20px' }} className="about-container">
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
        <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }} className="about-title">Welcome to the official portal of Nazareth</h2>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }} className="about-description">
          The heart of Christian faith. We understand that not everyone can physically visit Nazareth, a city where Jesus grew and where spiritual experiences await every visitor. 
          <br/>Therefore, we are pleased to offer you the opportunity to bring Nazareth to you.
        </p>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }} className="about-description">
          Through our website, you can take a virtual tour of the main churches and holy sites of Nazareth, connect to the rich history and religious tradition that characterizes the place. 
          In addition, we offer you a unique opportunity to purchase local souvenirs and even light a candle in memory or honor of your loved ones, as if you were here with us.
        </p>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }} className="about-description">
          In our online store, you can find a wide range of products: crosses made from local olive wood, jewelry inspired by Christian symbols, paintings, and mosaics that reflect the rich religious art, and more. Now, you can also buy water from the legendary Nazareth spring, sand from the sands of Nazareth, and local olives – all to feel the greatness of the city of Nazareth and Jesus. You can also choose to light a virtual candle, an act that conveys prayer and remembrance across distances.
        </p>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }} className="about-description">
          We invite you to open your hearts and feel the warmth of our community through every product you choose to buy. Every purchase supports the local community and helps preserve the rich heritage of Nazareth for future generations. Visit our website and find your way to connect with Nazareth, anytime and anywhere.
        </p>
      </div>
    </div>
  );
};

export default About;
