import React, { useEffect, useState } from 'react';
import "../styles/LiveClient.css";

// Update events with date and time
const events = [
  { dateTime: new Date(2024, 8, 8, 9, 0), description: 'Sunday Prayer from the Greek Church' }, // August 8, 2024, 9:00 AM
];

const LiveVideo = () => {
  const [event, setEvent] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [eventComingSoon, setEventComingSoon] = useState(false);
  const [inLiveMode, setInLiveMode] = useState(false);
  const [isEventDay, setIsEventDay] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [inLiveMode]);

  useEffect(() => {
    const getMostUpcomingEvent = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.dateTime.getFullYear(), event.dateTime.getMonth(), event.dateTime.getDate());
        return eventDate >= today;
      });
      return upcomingEvents.sort((a, b) => a.dateTime - b.dateTime)[0] || null;
    };

    const mostUpcomingEvent = getMostUpcomingEvent();
    setEvent(mostUpcomingEvent);

    if (mostUpcomingEvent) {
      const now = new Date();
      const eventDateTime = new Date(mostUpcomingEvent.dateTime);
      const timeDiff = eventDateTime - now;
      const hoursUntilEvent = Math.floor(timeDiff / (1000 * 60 * 60));

      setEventComingSoon(hoursUntilEvent > 0 && hoursUntilEvent <= 24);
      setInLiveMode(true);

      // Check if today is the event day (ignoring time)
      const today = new Date();
      const eventDate = new Date(eventDateTime.getFullYear(), eventDateTime.getMonth(), eventDateTime.getDate());
      setIsEventDay(today.toDateString() === eventDate.toDateString());
    } else {
      setInLiveMode(false);
    }
  }, []);

  useEffect(() => {
    if (event) {
      const calculateTimeRemaining = () => {
        const now = new Date();
        const eventDateTime = new Date(event.dateTime);
        const timeDiff = eventDateTime - now;

        if (timeDiff <= 0) {
          setTimeRemaining('Event has started or is past.');
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      };

      const interval = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(interval);
    }
  }, [event]);

  const handleJoinLive = () => {
    window.open('https://nazarethholycross-live.netlify.app', '_blank');
  };

  return (
    <div className={`live-client-container ${inLiveMode ? 'live-mode' : ''}`}>
      <div className="live-client-content">
        <div className="live-client-placeholder">
          {events.length === 0 ? (
            <p>No upcoming events available.</p>
          ) : event ? (
            <div className="live-client-event-info">
              <h2>Upcoming Live Event</h2>
              <p className="event-name"><strong>{event.description}</strong></p>
              <p><strong>Nazareth Date and Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
              <p><strong>Time Remaining:</strong> <span className="time-remaining-frame">{timeRemaining}</span></p>
              {eventComingSoon && (
                <p className="event-coming-soon">Stay tuned! The live stream will start in {Math.floor((new Date(event.dateTime) - new Date()) / (1000 * 60 * 60))} hour(s).</p>
              )}
              {isEventDay && (
                <button className="join-live-button" onClick={handleJoinLive}>
                  Join Live
                </button>
              )}
            </div>
          ) : (
            <p>No upcoming events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
