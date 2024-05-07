import React from 'react';
import '../App.css';
import PaypalCandle from '../components/PaypalCandle';
import { useLocation } from 'react-router-dom';



function CheckOut() {

    const location = useLocation();
    // const { firstName } = location.state;
    // const { lastName } = location.state;
    // const { email } = location.state;
    // const { prayer } = location.state;
    const {form}=location.state;

    return (
        <>
            {/* <PaypalCandle firstName={firstName} lastName={lastName} email={email} prayer={prayer} /> */}
            <PaypalCandle  form={form} />

        </>
    );
}

export default CheckOut;