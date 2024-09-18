import React, { useEffect, useState } from 'react';
import "../styles/LiveClient.css";

// Update events with date and time
const events = [
  { dateTime: new Date(2024, 9, 15, 9, 0), description: 'Sunday Prayer from the Greek Church' },
  { dateTime: new Date(2024, 8, 10, 9, 0), description: 'Special Church Event' }, // Example of past event
];

// Array for past live videos
const pastVideos = [
  {
    title: 'Interview with the Nazareth Community',
    src: 'https://firebasestorage.googleapis.com/v0/b/nazareth-holy-cross.appspot.com/o/videos%2Finterview.mp4?alt=media&token=8465ecc1-614f-4080-acc6-1113f1623ea6',
    description: 'Watch the exclusive interview streamed live from Nazareth.',
    thumbnail: 'images/interview.jpg'
  },
  {
    title: 'Live Prayer from the Latin Church',
    src: 'https://firebasestorage.googleapis.com/v0/b/nazareth-holy-cross.appspot.com/o/videos%2Flive-17-9-24.mp4?alt=media&token=9bbb1fe2-4439-497c-adf6-038697cde4e0',
    description: 'Experience a live broadcast of heartfelt prayers from the Latin Church, connecting you to our sacred traditions and spiritual heritage.',
    thumbnail: 'images/live-17-9-24.jpg'
  }
];

const LiveVideo = () => {
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [eventComingSoon, setEventComingSoon] = useState(false);
  const [inLiveMode, setInLiveMode] = useState(false);
  const [isEventTime, setIsEventTime] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [inLiveMode]);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Separate upcoming and past events
    const upcomingEvents = events.filter(event => new Date(event.dateTime) >= now);
    const endedEvents = events.filter(event => new Date(event.dateTime) < now);

    // Sort the ended events by date descending
    setPastEvents(endedEvents.sort((a, b) => b.dateTime - a.dateTime));

    const mostUpcomingEvent = upcomingEvents.sort((a, b) => a.dateTime - b.dateTime)[0] || null;
    setUpcomingEvent(mostUpcomingEvent);

    if (mostUpcomingEvent) {
      const eventDateTime = new Date(mostUpcomingEvent.dateTime);
      const timeDiff = eventDateTime - now;
      const hoursUntilEvent = Math.floor(timeDiff / (1000 * 60 * 60));

      setEventComingSoon(hoursUntilEvent > 0 && hoursUntilEvent <= 24);
      setInLiveMode(true);

      const isEventTimeNow = now.getTime() >= eventDateTime.getTime() && now.getTime() < eventDateTime.getTime() + 60 * 60 * 2000;
      setIsEventTime(isEventTimeNow);
    } else {
      setInLiveMode(false);
    }
  }, []);

  useEffect(() => {
    if (upcomingEvent) {
      const calculateTimeRemaining = () => {
        const now = new Date();
        const eventDateTime = new Date(upcomingEvent.dateTime);
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
  }, [upcomingEvent]);

  const handleJoinLive = () => {
    window.open('https://nazarethholycross-live.netlify.app', '_blank');
  };

  return (
    <div className={`live-client-container ${inLiveMode ? 'live-mode' : ''}`}>
      <div className="live-client-content">
        <div className="live-client-placeholder">
          {upcomingEvent ? (
            <div className="live-client-event-info">
              <h2>Upcoming Live Event</h2>
              <p className="event-name"><strong>{upcomingEvent.description}</strong></p>
              <p><strong>Nazareth Date and Time:</strong> {new Date(upcomingEvent.dateTime).toLocaleString()}</p>
              <p><strong>Time Remaining:</strong> <span className="time-remaining-frame">{timeRemaining}</span></p>
              {eventComingSoon && (
                <p className="event-coming-soon">Stay tuned! The live stream will start soon.</p>
              )}
              {isEventTime && (
                <button className="join-live-button" onClick={handleJoinLive}>
                  Join Live
                </button>
              )}
            </div>
          ) : (
            <p>No upcoming events available.</p>
          )}
        </div>

        {/* Past Lives Video Gallery */}
        <div className="past-lives-container">
          <h2 style={{color: '#ffcc00'}}>Past Live Events</h2>
          <div className="past-videos-gallery">
            {pastVideos.map((video, index) => (
              <div key={index} className="past-live-item">
                <video
                  controls
                  width="100%"
                  height="auto"
                  poster={video.thumbnail} // Thumbnail image
                  className="past-live-video"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveVideo;
