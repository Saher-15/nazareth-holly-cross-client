import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ConfirmationOrder from '../components/ConfirmationOrder'; // Import ConfirmationOrder component
import "../styles/Candle.css";

const PayPalComponent = ({ totalAmount, cartItems }) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of ConfirmationOrder
    const [showAlert, setShowAlert] = useState(false); // State to control visibility of alert
    const [orderDetails, setOrderDetails] = useState(null); // State to store order details
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        confirmEmail: "",
        street: "",
        city: "",
        state: "",
        postal: "",
        country: ""
    });

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
        setForm(prev => ({ ...prev, country: value.label }))

    }
    const [emailMatchError] = useState("");
    const [inputWarning] = useState("");

    const handleChangeForm = (e) => {
        const { name, value } = e.target
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                setOrderDetails(order_details); // Store order details in state
                setShowConfirmation(true); // Show ConfirmationOrder component after payment is completed
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="App">
            <div className="leftSide">

            <h1 className="title">Payment Method</h1>
            </div>
            

            <form className="candle-form center-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <div className="name-container">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={form.firstname}
                            onChange={handleChangeForm}
                            required
                            className="form-control"
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={form.lastname}
                            onChange={handleChangeForm}
                            required
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChangeForm}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChangeForm}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="confirmEmail"
                        placeholder="Confirm Email"
                        value={form.confirmEmail}
                        onChange={handleChangeForm}
                        required
                        className="form-control"
                    />
                    {emailMatchError && <p className="error-message">{emailMatchError}</p>}
                </div>
                <div className="form-group">
                    <Select
                        options={options}
                        onChange={changeHandler}
                        value={value}
                        placeholder="Select Country"
                        className="country-select"
                    />

                </div>
                <div className="form-group">

                    <input
                        type="email"
                        name="street"
                        placeholder="Street Address"
                        value={form.street}
                        onChange={handleChangeForm}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <div className="name-container">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={handleChangeForm}
                            required
                            className="form-control"
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State/ Province"
                            value={form.state}
                            onChange={handleChangeForm}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="name-container">
                        <input
                            type="tel"
                            name="postal"
                            placeholder="Postal/ Zip Code"
                            value={form.postal}
                            onChange={handleChangeForm}
                            required
                            className="form-control"
                        />
                    </div>
                </div>

            </form>
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
            {showConfirmation && (
                <ConfirmationOrder
                    cartItems={cartItems}
                    firstName={form.firstname}
                    lastName={form.lastname}
                    phone={form.phone}
                    email={form.email}
                    street={form.street}
                    city={form.city}
                    state={form.state}
                    postal={form.postal}
                    country={form.country}
                    totalPrice={totalAmount}
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
