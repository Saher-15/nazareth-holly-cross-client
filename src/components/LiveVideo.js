import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import "../styles/LiveClient.css";

// Update events with date and time
const events = [
  { dateTime: new Date(2024, 8, 8, 9, 0), description: 'Sunday Prayer from the Greek Church' }, // August 1, 2024, 2:00 PM
];

const LiveVideo = () => {
  const videoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isLive, setIsLive] = useState(false); // State to track if the live stream is active
  const [event, setEvent] = useState(null); // State to hold event data
  const [timeRemaining, setTimeRemaining] = useState('');
  const [eventComingSoon, setEventComingSoon] = useState(false);
  const [inLiveMode, setInLiveMode] = useState(false); // State to determine if we are in live mode

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [inLiveMode]);

  useEffect(() => {
    // Find the most upcoming event
    const getMostUpcomingEvent = () => {
      const now = new Date();
      const upcomingEvents = events.filter(event => event.dateTime > now);
      return upcomingEvents.sort((a, b) => a.dateTime - b.dateTime)[0] || null;
    };

    const mostUpcomingEvent = getMostUpcomingEvent();
    setEvent(mostUpcomingEvent);

    if (mostUpcomingEvent) {
      const now = new Date();
      const eventDateTime = new Date(mostUpcomingEvent.dateTime);
      const timeDiff = eventDateTime - now;
      const hoursUntilEvent = Math.floor(timeDiff / (1000 * 60 * 60));

      // Show "Coming Soon" message if event is within 24 hours
      setEventComingSoon(hoursUntilEvent > 0 && hoursUntilEvent <= 24);

      // Set page to live mode if there is an active stream
      setInLiveMode(true);
    } else {
      setInLiveMode(false);
    }

    // Initialize socket connection
    const socketIo = io('https://your-server-url.com');
    setSocket(socketIo);

    // Listen for the stream from the server
    socketIo.on('stream', (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsLive(true); // Set live status to true when a stream is received
        setInLiveMode(true); // Set page to live mode
      }
    });

    // If no stream, set isLive to false
    socketIo.on('stream-off', () => {
      setIsLive(false);
      setInLiveMode(false); // Reset live mode
    });

    return () => {
      if (socketIo) {
        socketIo.disconnect();
      }
    };
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

  return (
    <div className={`live-client-container ${inLiveMode ? 'live-mode' : ''}`}>
      <div className="live-client-content">

        {isLive ? (
          <video
            ref={videoRef}
            className="live-client-video"
            autoPlay
            playsInline
            controls
          ></video>
        ) : (
          <div className="live-client-placeholder">
            {event && (
              <div className="live-client-event-info">
                <h2>Upcoming Live Event</h2>
                <p className="event-name"><strong>{event.description}</strong></p>
                <p><strong>Date and Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                <p><strong>Time Remaining:</strong> <span className="time-remaining-frame">{timeRemaining}</span></p>
                {eventComingSoon && (
                  <p className="event-coming-soon">Stay tuned! The live stream will start in {Math.floor((new Date(event.dateTime) - new Date()) / (1000 * 60 * 60))} hour(s).</p>
                )}
              </div>

            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveVideo;
