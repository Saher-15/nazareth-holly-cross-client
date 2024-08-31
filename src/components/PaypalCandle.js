import React, { useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ConfirmationCandle from '../components/ConfirmationCandle'; // Import ConfirmationCandle component
import "../styles/PaypalCandle.css";

const PayPalComponent = ({ form }) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of ConfirmationCandle
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
            console.error('Error creating order:');
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
                setShowConfirmation(true); // Show ConfirmationCandle component after payment is completed
            })
            .catch((error) => {
            });
    };

    return (
        <div className="App">
            

            <div className="paypal-card1">

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
            </div>
            {/* Pass order details and cartItems to ConfirmationCandle if showConfirmation is true */}
            {showConfirmation && (
                <ConfirmationCandle
                    firstName={form.firstname}
                    lastName={form.lastname}
                    email={form.email}
                    prayer={form.pray}
                />
            )}
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

export default PayPalComponent;