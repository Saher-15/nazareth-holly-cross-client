import React, { useEffect, useRef } from 'react';

const LiveVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  }, []);

  return (
    <div>
      <h1>Live Video Stream</h1>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '800px' }}></video>
    </div>
  );
}

export default LiveVideo;
