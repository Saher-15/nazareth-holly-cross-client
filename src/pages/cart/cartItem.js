import React from "react";
import { useShopContext } from "../../context/shop-context";

const CartItem = ({ data }) => {
  const { _id, name, price, img, quantity } = data;
  const { addToCart, updateCartItemCount, decreaseFromCart, removeFromCart } = useShopContext();

  return (
    <div className="cartItem">
      <img src={img} alt={data.title} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            className="addToCartBttn"
            onClick={() => {
              if (quantity > 1) {
                decreaseFromCart(_id);
              }
            }}
            disabled={quantity <= 1} // Disable the button if quantity is less than or equal to 1
          >
            -
          </button>
          <input
            value={quantity}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
            style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}
          />
          <button
            className="addToCartBttn"
            onClick={() => addToCart(data)}
          >
            +
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="removeFromCartBtn"  // Style this button as needed
            onClick={() => removeFromCart(_id)} // Remove the item from the cart
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};  

export default CartItem;
