import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const ConfirmationCandle = ({ firstName, lastName, email, prayer }) => {
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const sendOrderDetails = async () => {
            try {
                const requestBody = {
                    firstName,
                    lastName,
                    email,
                    prayer
                };

                // Send order details to the server
                await axios.post("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/candle/lightACandle", requestBody);

                // Redirect to homepage after 5 seconds
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            } catch (error) {
                console.error('Error sending order details:');
            }
        };

        sendOrderDetails();
    }, [firstName, lastName, email, prayer, navigate]); // Add dependencies here

    return (
        <div style={styles.container}>
            <h1>Thank You!</h1>
            <p>Your payment has been successfully processed.</p>
            <p>A receipt has been sent to your email address.</p>
            <p>Thank you for your order!</p>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        margin: 0,
    },
};

export default ConfirmationCandle;
