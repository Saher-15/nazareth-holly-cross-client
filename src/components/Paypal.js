import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ConfirmationOrder from '../components/ConfirmationOrder'; // Import ConfirmationOrder component
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import "../styles/PaypalProduct.css";

const PayPalComponent = ({ totalAmount, cartItems }) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of ConfirmationOrder
    const [showAlert, setShowAlert] = useState(false); // State to control visibility of alert
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
    const [phoneValue, setphoneValue] = useState()
    const [emailMatchError] = useState("");


    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changePhoneHandler = value => {
        setphoneValue(value)
        setForm(prev => ({ ...prev, phone: value }))

    }

    const changeHandler = value => {
        setValue(value)
        setForm(prev => ({ ...prev, country: value.label }))

    }

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

    const onApprove = async (data) => {
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
            .then((response) => {
                setShowConfirmation(true); // Show ConfirmationOrder component after payment is completed
                response.json()
            })

            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="App">
            <div className="container">
                <div className="left-side">
                    <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Contact & Delivery Information</h2>
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
                            <div className="name-container">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChangeForm}
                                    required
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="confirmEmail"
                                    placeholder="Confirmation Email"
                                    value={form.confirmEmail}
                                    onChange={handleChangeForm}
                                    required
                                    className="form-control"
                                />
                            </div>{emailMatchError && <p className="error-message">{emailMatchError}</p>}
                        </div>



                        <div className="form-group">
                            <PhoneInput
                                value={phoneValue}
                                onChange={changePhoneHandler}
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry='US'

                            />

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
                                    name="street"
                                    placeholder="Street Address"
                                    value={form.street}
                                    onChange={handleChangeForm}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="name-container">

                                <input
                                    type="text"
                                    name="postal"
                                    placeholder="Postal/ Zip Code"
                                    value={form.postal}
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

                            </div>
                        </div>
                    </form>
                </div>
                <div className="right-side">
                    <div className="paypal-card">
                        <PayPalScriptProvider options={initialOptions} >
                            <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Payment Method</h2>
                            {!showConfirmation && (
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
                        {showAlert && (
                            <div className="ms-alert ms-action2 ms-small">
                                <span className="ms-close"></span>
                                <p>Order cancelled!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayPalComponent;
