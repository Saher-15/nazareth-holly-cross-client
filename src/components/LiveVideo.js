import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LiveVideo = () => {
    return (
        <div style={styles.container}>
            <div style={styles.advertisement}>
                <h2 style={styles.heading}>Live is coming soon!</h2>
                <p style={styles.text}>Stay tuned for exciting live events and broadcasts.</p>
                <p style={styles.caption}>The live stream will feature events from Nazareth churches and Nazareth events.</p>
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
        padding: '20px',
    },
    advertisement: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
    },
    heading: {
        fontSize: '36px',
        color: '#333',
        marginBottom: '20px',
    },
    text: {
        fontSize: '20px',
        color: '#666',
        marginBottom: '20px',
    },
    caption: {
        fontSize: '18px',
        color: 'tomato',
        fontStyle: 'italic',
    },
    '@media (max-width: 768px)': {
        heading: {
            fontSize: '28px',
        },
        text: {
            fontSize: '18px',
        },
        caption: {
            fontSize: '16px',
        },
    },
    '@media (max-width: 480px)': {
        heading: {
            fontSize: '24px',
        },
        text: {
            fontSize: '16px',
        },
        caption: {
            fontSize: '14px',
        },
    },
};

export default LiveVideo;
