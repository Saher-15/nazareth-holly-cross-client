import React, { useEffect } from 'react';
import axios from 'axios';
import { useShopContext } from '../context/shop-context'; // Import the context hook

function ThankYou({ cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice }) {
    const { clearCart } = useShopContext(); // Get the clearCart function from the context

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
                const response = await axios.post("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/order/newOrder", requestBody);
                console.log(response.data);

                // Clear the cart after the order has been successfully processed
            } catch (error) {
                console.error('Error sending order details:', error);
            }
        };

        sendOrderDetails();
    }, [cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice]); // Add dependencies here
    clearCart();

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
