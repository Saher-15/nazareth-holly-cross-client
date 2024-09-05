import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/shop-context";
import CartItem from "./cartItem";
import "./cart.css";

const Cart = () => {
  const { cartItems } = useShopContext();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total + 5); // Added shipping fee
  }, [cartItems]);

  return (
    <div className="cart">


      <div className="cart-items">
        {cartItems.map((product) => (
          <CartItem
            key={`${product._id}-${product.color}`}
            data={product}
          />
        ))}
      </div>

      {totalAmount > 5 ? (

        <div className="checkout">
          <div className="shipping-note">
            <p>Shipping: 5$</p>
            <p>Subtotal: {totalAmount.toFixed(2)}$</p>
          </div>

          <button onClick={() => navigate("/shop")}>Continue Shopping</button>
          <button onClick={() => navigate("/checkout", { state: { totalAmount, cartItems } })}>Checkout</button>
        </div>
      ) : (
        <div className="checkout">
          <h1>Your Cart is Empty</h1>
          <button conClick={() => navigate("/shop")}>Back To Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
