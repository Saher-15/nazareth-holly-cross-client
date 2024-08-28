import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/shop-context";
import CartItem from "./cartItem";
import "./cart.css";

const Cart = () => {
  const { cartItems, decreaseFromCart } = useShopContext(); 

  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0); 

  // Scroll to the top only when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Calculate the total amount when cartItems change
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  }, [cartItems]); // Recalculate total amount whenever cartItems change

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart-items">
        {cartItems.map((product) => (
          <CartItem
            key={product._id}
            data={product}
            decreaseFromCart={() => decreaseFromCart(product._id)} 
          />
        ))}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount.toFixed(2)}</p> 
          <button onClick={() => navigate("/shop")}>Continue Shopping</button>
          <button onClick={() => navigate("/checkout", { state: { totalAmount, cartItems } })}>Checkout</button>
        </div>
      ) : (
        <div className="checkout">
          <h1>Your Shopping Cart is Empty</h1>
          <button onClick={() => navigate("/shop")}>Back To Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
