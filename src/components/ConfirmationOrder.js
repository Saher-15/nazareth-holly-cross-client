import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useShopContext } from '../context/shop-context'; // Import the context hook
import { useTranslation } from 'react-i18next'; // Import the translation hook

function ThankYou({ cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice }) {
    const { clearCart } = useShopContext(); // Get the clearCart function from the context
    const navigate = useNavigate(); // Get the navigate function
    const { t } = useTranslation(); // Initialize the translation hook

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
                        quantity: item.quantity,
                        color: item.color
                    }))
                };

                await axios.post("https://nazareth-holy-cross-c5896e0462c5.herokuapp.com/order/newOrder", requestBody);

                // Clear the cart after the order has been successfully processed
                clearCart();

                // Wait for 3 seconds before navigating to home
                setTimeout(() => {
                    navigate("/");
                }, 5000);

            } catch (error) {
                console.error('Error sending order details:', error);
            }
        };

        sendOrderDetails();
    }, [cartItems, firstName, lastName, phone, email, street, city, state, postal, country, totalPrice, navigate, clearCart]); // Add dependencies here

    return (
        <div style={styles.container}>
            <h1>{t('thankYou.thankYou')}</h1>
            <p>{t('thankYou.paymentSuccess')}</p>
            <p>{t('thankYou.receipt')}</p>
            <p>{t('thankYou.gratitude')}</p>
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
