import React from 'react';
import '../App.css';
import Paypal from '../components/Paypal';
import { useLocation } from 'react-router-dom';



function CheckOut() {

  const location = useLocation();
  const { totalAmount } = location.state;
  const { cartItems } = location.state;

  return (
    <>
      <Paypal totalAmount = {totalAmount} cartItems={cartItems} />
    </>
  );
}

export default CheckOut;