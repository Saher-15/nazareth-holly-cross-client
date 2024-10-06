import React, { useEffect, useState } from 'react';
import "../styles/LiveClient.css";

// Define events with a specific start time in local timezone (Israel Time)
const events = [
  { dateTime: new Date('2024-10-06T09:00:00+03:00'), description: 'Sunday Prayer from the Annunciation church' }, // Example event
];

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
    description: 'Experience a live broadcast of heartfelt prayers from the Latin Church.',
    thumbnail: 'images/live-17-9-24.jpg'
  }
];

const LiveVideo = () => {
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [inLiveMode, setInLiveMode] = useState(false);
  const [canJoinLive, setCanJoinLive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const now = new Date();
    console.log("Current Time: ", now); // Debugging

    // Separate upcoming and past events
    const upcomingEvents = events.filter(event => new Date(event.dateTime) >= now);
    const endedEvents = events.filter(event => new Date(event.dateTime) < now);

    console.log("Upcoming Events: ", upcomingEvents); // Debugging
    console.log("Ended Events: ", endedEvents); // Debugging

    setPastEvents(endedEvents.sort((a, b) => b.dateTime - a.dateTime));

    const mostUpcomingEvent = upcomingEvents.sort((a, b) => a.dateTime - b.dateTime)[0] || null;
    if (!mostUpcomingEvent) {
      // Check for live events (ongoing)
      const liveEvents = events.filter(event => {
        const eventDateTime = new Date(event.dateTime);
        const eventEndTime = new Date(eventDateTime.getTime() + 2 * 60 * 60 * 1000); // Assuming 2 hours duration
        return now >= eventDateTime && now <= eventEndTime;
      });

      // If there are ongoing live events, set the first one as the upcoming event
      if (liveEvents.length > 0) {
        setUpcomingEvent(liveEvents[0]);
        setInLiveMode(true);
        setCanJoinLive(true);
      }
    } else {
      setUpcomingEvent(mostUpcomingEvent);
    }

    // If no upcoming event is found, reset live mode
    if (!upcomingEvent) {
      setInLiveMode(false);
      setCanJoinLive(false);
    }

  }, [upcomingEvent]); // Add upcomingEvent as a dependency

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
    window.open('https://www.instagram.com/nazareth_holy_cross/', '_blank');
  };

  return (
    <div className={`live-client-container ${inLiveMode ? 'live-mode' : ''}`}>
      <div className="live-client-content">
        <div className="live-client-placeholder">
          {upcomingEvent ? (
            <div className="live-client-event-info">
              <h2>{inLiveMode ? 'Live Event Ongoing' : 'Upcoming Live Event'}</h2>
              <p className="event-name"><strong>{upcomingEvent.description}</strong></p>
              <p><strong>Nazareth Date and Time:</strong> {new Date(upcomingEvent.dateTime).toLocaleString()}</p>
              <p><strong>Time Remaining:</strong> <span className="time-remaining-frame">{timeRemaining}</span></p>

              {/* Note about the join button availability */}
              {inLiveMode && (
                <p className="live-note" style={{ color: 'red' }}>
                  Note: The "Join Live" button is available only after the live event starts.
                </p>
              )}
              <p className="refresh-note" style={{ color: 'red' }}>
                Note: Please refresh the page before pressing the "Join Live" button.
              </p>

              <button className="join-live-button" onClick={handleJoinLive} disabled={!canJoinLive}>
                Join Live
              </button>
            </div>

          ) : (
            <p>No upcoming events available.</p>
          )}
        </div>

        {/* Past Live Video Gallery */}
        <div className="past-lives-container">
          <h2 style={{ color: '#ffcc00' }}>Past Live Events</h2>
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
