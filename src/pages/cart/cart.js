import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/shop-context";
import CartItem from "./cartItem";
import "./cart.css";


const Cart = () => {
  const { cartItems } = useShopContext();

  const navigate = useNavigate();
  console.log(cartItems);
  const [totalAmount, setTotalAmount] = useState();

  const checkout = () => {

  }

  useEffect(() => {
    function calcTotalAmount() {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price * item.quantity;
      });
      setTotalAmount(total);
    }

    calcTotalAmount();
  }, [cartItems]);



  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {cartItems.map((product) => {

          return <CartItem data={product} key={product._id}/>;

        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/shop")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              // navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <div className="checkout">
          <h1> Your Shopping Cart is Empty</h1>
          <button onClick={() => navigate("/shop")}> Back To Shopping </button>
        </div>
      )}
    </div>
  );
};

export default Cart;