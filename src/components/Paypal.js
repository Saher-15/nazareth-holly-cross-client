import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ConfirmationOrder from '../components/ConfirmationOrder'; // Import ConfirmationOrder component
import "../styles/Paypal.css";

export default function PayPalComponent({ totalAmount, cartItems }) {
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of ConfirmationOrder
    const [showAlert, setShowAlert] = useState(false); // State to control visibility of alert
    const [orderDetails, setOrderDetails] = useState(null); // State to store order details

    const initialOptions = {
        clientId: "AZXaYL8OS1Iv7LLmAO9aPD-sgLShLbEl9jzdYx2hHSAmKtWlekv2dEwzXgalzfySvEfDo7hXcIVJZsA-"
    };

    const intent = 'capture'; // Set your intent variable here

    const onCancel = (data) => {
        setShowAlert(true);
        // Set a timer to hide the alert after 2 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    const onError = (err) => {
        // Handle error
        console.log(err);
    };

    const createOrder = async () => {
        try {
            const response = await fetch("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/order/create_order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({ "intent": intent, "amount": totalAmount })
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const order = await response.json();

            return order.id;
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle error here
        }

    };

    const onApprove = async (data, actions) => {
        const order_id = data.orderID;
        console.log(data);

        const requestBody = {
            "intent": intent,
            "order_id": order_id
        };

        await fetch("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/order/complete_order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => response.json())
            .then((order_details) => {
                console.log(order_id);
                setOrderDetails(order_details); // Store order details in state
                setShowConfirmation(true); // Show ConfirmationOrder component after payment is completed
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions} >
                {!showConfirmation && ( // Render PayPalButtons if showConfirmation is false
                    <div className="paypal-buttons-container">
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onCancel={onCancel}
                            onError={onError}
                        />
                    </div>

                )}
            </PayPalScriptProvider>
            {/* Pass order details and cartItems to ConfirmationOrder if showConfirmation is true */}
            {showConfirmation && <ConfirmationOrder orderDetails={orderDetails} cartItems={cartItems} />}
            {/* Display alert message if showAlert is true */}
            {showAlert && (
                <div className="ms-alert ms-action2 ms-small">
                    <span className="ms-close"></span>
                    <p>Order cancelled!</p>
                </div>
            )}
        </div>
    );
}
