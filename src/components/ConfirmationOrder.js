import React, { useEffect } from 'react';
import axios from 'axios';

function ThankYou({ cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice }) {
    useEffect(() => {
        const sendOrderDetails = async () => {
            try {
                const requestBody = {
                    firstName,
                    lastName,
                    phone,
                    email,
                    street,
                    city,
                    state,
                    postal,
                    country,
                    totalPrice,
                    products: cartItems.map(item => ({
                        productID: item._id,
                        quantity: item.quantity
                    }))
                };

                console.log(requestBody);
                return;
                const response = await axios.post("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/order/newOrder", requestBody);
                console.log(response.data);
            } catch (error) {
                console.error('Error sending order details:', error);
            }
        };

        sendOrderDetails();
    }, [cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice]);

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
