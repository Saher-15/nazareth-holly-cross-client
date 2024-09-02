import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ConfirmationOrder from '../components/ConfirmationOrder';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import "../styles/PaypalProduct.css";

const PayPalComponent = ({ totalAmount, cartItems }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
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
    const [phoneValue, setphoneValue] = useState();
    const [emailMatchError, setEmailMatchError] = useState("");
    const [value, setValue] = useState('');
    const options = useMemo(() => countryList().getData(), []);

    const changePhoneHandler = value => {
        setphoneValue(value);
        setForm(prev => ({ ...prev, phone: value }));
    }

    const changeHandler = value => {
        setValue(value);
        setForm(prev => ({ ...prev, country: value.label }));
    }

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const initialOptions = {
        clientId: "AfhOc9ToAj72gf5KEowYfhpWShGRSpzSL-Ps2HYX4ky95KmVX8vNRb0o5FZ3AGw3muq8DIvDP0Ua2_ad"
    };

    const intent = 'capture';

    const onCancel = (data) => {
        setShowAlert(true);
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
                body: JSON.stringify({ "intent": intent, "amount": totalAmount })
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const order = await response.json();
            return order.id;
        } catch (error) {
            console.error('Error creating order:');
        }
    };

    const onApprove = async (data) => {
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
            .then((response) => {
                setShowConfirmation(true);
                response.json();
            })
            .catch((error) => {
            });
    };

    const isFormIncomplete = Object.values(form).some(value => value === "");
    const doEmailsMatch = form.email === form.confirmEmail;

    return (
        <div className="App-paypal-product">

            <div className="container">
                {/* <label>
                    Contact & Delivery Information
                </label> */}
                <form className="paypal-product-form center-form" onSubmit={(e) => e.preventDefault()}>
                <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Contact & Delivery Information</h2>

                    <div className="form-group-paypal">
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
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => {
                                handleChangeForm(e);
                                setEmailMatchError(e.target.value === form.confirmEmail ? "" : "Emails don't match");
                            }}
                            required
                            className="form-control"
                        />
                        <input
                            type="text"
                            name="confirmEmail"
                            placeholder="Confirmation Email"
                            value={form.confirmEmail}
                            onChange={(e) => {
                                handleChangeForm(e);
                                setEmailMatchError(e.target.value === form.email ? "" : "Emails don't match");
                            }}
                            required
                            className="form-control"
                        />
                        {emailMatchError && <p className="error-message">{emailMatchError}</p>}

                        <PhoneInput
                            value={phoneValue}
                            onChange={changePhoneHandler}
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry='US'
                            className="form-control PhoneInputInput"
                        />
                        <div className="form-group">
                            <Select
                                options={options}
                                onChange={changeHandler}
                                value={value}
                                placeholder="Select Country"
                                className="country-select"
                            />
                        </div>
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

                </form>
                <div className="paypal-card">
                    <PayPalScriptProvider options={initialOptions} >
                        {isFormIncomplete && <p style={{ color: 'red', textAlign: 'center' }}>Please fill in all details to continue.</p>}
                        <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Payment Method</h2>
                        {!showConfirmation && !isFormIncomplete && doEmailsMatch && (
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
    );
}

export default PayPalComponent;
