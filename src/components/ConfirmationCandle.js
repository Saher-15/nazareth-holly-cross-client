import React, { useEffect } from 'react';
import axios from 'axios';

function ThankYou({ firstName, lastName, email, prayer }) {
    useEffect(() => {
        console.log(firstName, lastName, email, prayer);

        const sendOrderDetails = async () => {

            try {
                const requestBody = {
                    firstName,
                    lastName,
                    email,
                    prayer
                };
                const response = await axios.post("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/candle/lightACandle", requestBody);
                console.log(response.data);
            } catch (error) {
                console.error('Error sending order details:', error);
            }
        };

        sendOrderDetails();
    }, [firstName, lastName, email, prayer]); // Add dependencies here
    console.log("---------");

    return (
        <div style={styles.container}>
            <h1>Thank You!</h1>
            <p>Your payment has been successfully processed.</p>
            <p>A receipt has been sent to your email address.</p>
            <p>Thank you for your order!</p>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        margin: 0,
    },
};

export default ThankYou;
