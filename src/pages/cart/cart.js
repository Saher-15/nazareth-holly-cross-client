import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/shop-context";
import CartItem from "./cartItem";
import "./cart.css";

const Cart = () => {
  const { cartItems, decreaseFromCart } = useShopContext(); // Import removeFromCart function from your context

  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount to 0

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Calculate the total amount
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
      <div className="cart-items">
        {cartItems.map((product) => (
          <CartItem
            key={product._id}
            data={product}
            decreaseFromCart={() => decreaseFromCart(product._id)} // Pass removeFromCart function to CartItem component
          />
        ))}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount.toFixed(2)}</p> {/* Format totalAmount */}
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
