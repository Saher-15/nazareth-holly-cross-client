import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useShopContext } from '../context/shop-context'; // Import the context hook

function ThankYou({ cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice }) {
    const { clearCart } = useShopContext(); // Get the clearCart function from the context
    const navigate = useNavigate(); // Get the navigate function

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
                        productName: item.name,
                        quantity: item.quantity
                    }))
                };

                await axios.post("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/order/newOrder", requestBody);

                // Clear the cart after the order has been successfully processed
                clearCart();

                // Wait for 3 seconds before navigating to home
                setTimeout(() => {
                    navigate("/");
                }, 3000);

            } catch (error) {
                console.error('Error sending order details:', error);
            }
        };

        sendOrderDetails();
    }, [cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice, clearCart, navigate]); // Add dependencies here

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
