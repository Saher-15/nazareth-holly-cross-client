import React, { useState } from "react";
import { useShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";

import "../shop/product.css";

const Product = ({ item }) => {
  const { _id, name, price, img } = item;
  const { addToCart, cartItems } = useShopContext();
  const cartItem = cartItems.find((cartItem) => cartItem._id === _id); // Find the cart item corresponding to the product
  const cartItemCount = cartItem ? cartItem.quantity : 0; // If cart item exists, get its quantity, else default to 0
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    addToCart(item);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="product">
      <Link to={`/product/${_id}`}>
        <img src={img} alt="" />
      </Link>
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>${price}</p>
      </div>
      <div className="addToCartWrapper">
        <button className="addToCartBttn" onClick={handleClick}>
          Add To Cart
        </button>
      </div>
      <div className="addToCartWrapper">
        {cartItemCount > 0 && <> Qt:({cartItemCount})</>}
      </div>
      {showMessage && (
        <div className="message">Product added to cart!</div>
      )}
    </div>
  );
};

export default Product;
