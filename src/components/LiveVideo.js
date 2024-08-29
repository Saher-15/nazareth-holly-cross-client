import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LiveVideo = () => {
    return (
        <div style={styles.container}>
            <div style={styles.advertisement}>
                <h2 style={styles.heading}>Live is coming soon!</h2>
                <p style={styles.text}>Stay tuned for exciting live events and broadcasts.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    advertisement: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        color: '#333',
    },
    text: {
        fontSize: '16px',
        color: '#666',
    },
};

export default LiveVideo;
