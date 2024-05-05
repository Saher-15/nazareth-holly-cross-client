import React from "react";
import { useShopContext } from "../../context/shop-context";

const CartItem = ({ data }) => {
  const { _id, name, price, img, quantity } = data;
  const { addToCart, updateCartItemCount, removeFromCart } = useShopContext();

  return (
    <div className="cartItem">
      <img src={img} alt="" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button
            className="addToCartBttn"
            onClick={() => {
              if (quantity > 1) {
                removeFromCart(_id);
              }
            }}
            disabled={quantity <= 1} // Disable the button if quantity is less than or equal to 1
          >
            -
          </button>
          <input
            value={quantity}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
          />
          <button
            className="addToCartBttn"
            onClick={() => addToCart(data)}
          >
            +
          </button>
          
        </div>
        <button
            className="removeFromCartBtn" // Style this button as needed
            onClick={() => removeFromCart(_id)} // Remove the item from the cart
          >
            Remove
          </button>
      </div>
    </div>
  );
};

export default CartItem;
