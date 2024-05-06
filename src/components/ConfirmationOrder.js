import React, { useEffect } from 'react';
import axios from 'axios';

function ThankYou({ cartItems, firstName, lastName, email, address, totalPrice }) {
    useEffect(() => {
        const sendOrderDetails = async () => {
            try {
                // Construct the request body with customer information, total price, and products
                const requestBody = {
                    firstName,
                    lastName,
                    email,
                    address,
                    totalPrice,
                    products: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                };

                // Send the request body to your backend API
                const response = await axios.post("https://your-api-endpoint.com/send-order-details", requestBody);
                console.log(response.data); // Log response if needed
            } catch (error) {
                console.error('Error sending order details:', error);
                // Handle error here
            }
        };

        // Call the function to send order details
        sendOrderDetails();
    }, [cartItems, firstName, lastName, email, address, totalPrice]); // Include all dependencies in the dependency array

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
