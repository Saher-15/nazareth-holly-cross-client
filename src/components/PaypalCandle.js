import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../styles/PaypalCandle.css";

const PayPalComponent = ({ form }) => {
    const [paymentConfirmed, setPaymentConfirmed] = useState(false); // State to control payment initiation
    const [showAlert, setShowAlert] = useState(false); // State to control visibility of alert

    const initialOptions = {
        clientId: "AfhOc9ToAj72gf5KEowYfhpWShGRSpzSL-Ps2HYX4ky95KmVX8vNRb0o5FZ3AGw3muq8DIvDP0Ua2_ad"
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
    };

    const createOrder = async () => {
        try {
            const response = await fetch("https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/order/create_order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({ "intent": intent, "amount": "2" })
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
                // Show ConfirmationCandle component after payment is completed
            })
            .catch((error) => {
                console.error('Error completing order:', error);
            });
    };

    const handleConfirmPayment = () => {
        setPaymentConfirmed(true);
    };

    return (
        <div className="App-paypal-candle">
            {/* Display form summary */}
            <div className="form-summary">
                <h2>Order Summary</h2>
                <p><strong>First Name:</strong> {form.firstname}</p>
                <p><strong>Last Name:</strong> {form.lastname}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Prayer:</strong> {form.pray}</p>
                <button onClick={handleConfirmPayment}>
                    {paymentConfirmed ? "Confirmed" : "Confirm Details & Pay"}
                </button>
            </div>

            {/* Render PayPalButtons right below the form */}
            <div className="paypal-card1">
                <PayPalScriptProvider options={initialOptions}>
                    {paymentConfirmed && (
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
            </div>

            {showAlert && (
                <div className="ms-alert ms-action2 ms-small">
                    <span className="ms-close"></span>
                    <p>Order cancelled!</p>
                </div>
            )}
        </div>
    );
};

export default PayPalComponent;
