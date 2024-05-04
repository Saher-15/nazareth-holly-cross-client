import React from 'react';
import ReactPlayer from 'react-player';

function NazarethTour() {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url="/videos/video-3.mp4"
        className="react-player"
        width="auto" // Use percentage for width
        height="500px" // Use auto for height to maintain aspect ratio
        controls={true}
      />
    </div>
  );
}

export default NazarethTour;
