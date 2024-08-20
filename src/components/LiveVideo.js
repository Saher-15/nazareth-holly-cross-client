import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const StreamReceiver = () => {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socket.current = io('http://localhost:5000'); // Adjust the URL as needed

    // Initialize the WebRTC peer connection
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit('ice-candidate', event.candidate);
      }
    };

    peerRef.current.ontrack = (event) => {
      videoRef.current.srcObject = event.streams[0];
    };

    // Handle incoming offer
    socket.current.on('offer', (offer) => {
      peerRef.current.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerRef.current.createAnswer())
        .then((answer) => peerRef.current.setLocalDescription(answer))
        .then(() => socket.current.emit('answer', peerRef.current.localDescription));
    });

    // Handle incoming answer
    socket.current.on('answer', (answer) => {
      peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Handle incoming ICE candidates
    socket.current.on('ice-candidate', (candidate) => {
      peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Live Stream Receiver</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }}></video>
    </div>
  );
};

export default StreamReceiver;
