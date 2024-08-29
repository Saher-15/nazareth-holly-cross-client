import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/GallaryPage.css'; // Import the CSS file for styling
import Calendar from 'react-calendar';

const WhatIsNew = () => {
  const [date, setDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');

  // Corrected event dates and descriptions
  const events = [
    { date: new Date(2024, 7, 1), description: 'Feast of the Nativity of Mary' }, // August
    { date: new Date(2024, 8, 14), description: 'Feast of the Exaltation of the Holy Cross' }, // September
    { date: new Date(2024, 11, 25), description: 'Christmas Mass' }, // December
    // Add more events as needed
  ];

  // Helper function to normalize a date to midnight (start of the day)
  const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);

    // Normalize the selected date
    const normalizedSelectedDate = normalizeDate(selectedDate);

    // Find the index of the event with a matching date
    const eventIndex = events.findIndex(event => {
      const normalizedEventDate = normalizeDate(event.date);
      return normalizedEventDate.getTime() === normalizedSelectedDate.getTime();
    });

    // Update the event description if a matching event is found
    if (eventIndex !== -1) {
      setEventDescription(events[eventIndex].description);
    } else {
      setEventDescription('No events on this date.');
    }
  };

  // Function to apply class to event dates
  const tileClassName = ({ date, view }) => {
    // Check if the date is an event date
    if (view === 'month') {
      return events.some(event => normalizeDate(event.date).getTime() === normalizeDate(date).getTime()) ? 'event-date' : null;
    }
    return null;
  };

  return (
    <div className="gallery-page">
      <h1>Touching the Sacred, Feeling the Heartbeat</h1>
      <div className="intro-paragraph">
        <p>
          Nazareth, the city where the miraculous unfolded, is the place where Jesus took His first steps, where the Virgin Mary embraced her Son and prayed for His safety. Here, within the ancient churches, at the sacred spring where Mary nourished Jesus, and in the vibrant market of the old city – you will find your faith coming to life once more.
        </p>
        <p>
          Imagine yourself walking through the narrow streets, following in Jesus' footsteps to the churches, sharing moments of reflection at Mary's Spring, where the holy mother's eyes met the ancient waters. Every stone, every alley, tells a story of unwavering faith, of a spiritual journey that transcends time.
        </p>
        <p>
          When you light a candle in the Basilica of the Annunciation, you reconnect with the place where Jesus first heard His divine calling. As your heart longs for Nazareth, our souvenirs carry the holy spirit of the city, reminding you of your deep connection to the place where it all began.
        </p>
        <p>
          Allow us to bring Nazareth to you, straight into your home. With every memento, you preserve a deep bond with Nazareth – the city where Jesus and Mary walked, the city where faith was born. Remember the moments that happened here, the hearts that opened in prayer, and the tears that quietly fell upon the ancient stones.
        </p>
        <p>
          Nazareth awaits you, embracing you from afar, bringing its holiness to you. Keep the flame burning in your heart, until the day you return to us – to the city where faith beats.
        </p>
      </div>

      <div className="calendar-section">
        <h2>Live event Dates</h2>
        <Calendar
          onChange={onDateChange}
          value={date}
          tileClassName={tileClassName} // Add this prop to mark event dates
        />
        <br/>
        <p>Selected date: {date.toDateString()}</p>
        <p>Event: {eventDescription}</p>
      </div>
    </div>
  );
};

export default WhatIsNew;
