import React from "react";
import "../styles/CartPage.css";

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  // Calculate total amount
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle quantity change
  const handleQuantityChange = (item, newQuantity) => {
    const updatedQuantity = Math.max(newQuantity, 1); // Ensure quantity is at least 1
    updateQuantity(item.id, updatedQuantity); // Update quantity in the parent component
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-details">
                  <img src={item.img} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">${item.price}</p>
                  </div>

                </div>
                <div className="quantity-control">
                  <button className="quantity-button" onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                    -
                  </button>
                  <input
                    className="quantity-input"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  />
                  <button className="quantity-button" onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(item)} className="remove-button">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <p>Total: ${totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
