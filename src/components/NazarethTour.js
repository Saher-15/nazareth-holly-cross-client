import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import '../styles/NazarethTour.css';

const NazarethTour = () => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // Initial playback position
  const [duration, setDuration] = useState(0); // Total duration of the video
  const playerRef = useRef(null);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    // Update played percentage and duration
    setPlayed(state.played);
    setDuration(state.loadedSeconds);
  };

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-container">
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          url="/videos/video-7.mp4"
          playing={playing}
          loop={true}
          muted={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
        />
        <div className="controls">
          <button onClick={togglePlay} className="play-btn">
            {playing ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
          </button>
          <div className="seek-container">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={played}
              onChange={handleSeekChange}
              className="progress-slider"
            />
            <span className="time-display">{formatTime(duration * played)} / {formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NazarethTour;
