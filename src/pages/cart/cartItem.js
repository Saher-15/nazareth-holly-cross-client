import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/shop-context";
import "./cartItem.css";

const CartItem = ({ data }) => {
  const navigate = useNavigate();
  const { _id, name, price, img, quantity } = data;
  const { addToCart, updateCartItemCount, decreaseFromCart, removeFromCart } = useShopContext();

  // Function to handle click on the image
  const handleImageClick = () => {
    navigate(`/product/${_id}`);
  };

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cartItem">
      <img 
        src={img} 
        alt={name} 
        onClick={handleImageClick} 
        style={{ cursor: 'pointer' }} // Indicates that the image is clickable
      />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            className="addToCartBttn"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling up
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
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling up
              addToCart(data);
            }}
          >
            +
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="removeFromCartBtn" // Style this button as needed
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling up
              removeFromCart(_id); // Remove the item from the cart
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
