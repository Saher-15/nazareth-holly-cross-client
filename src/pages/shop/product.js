import React from "react";
import { useShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import "../shop/product.css";

const Product = ({ item }) => {
  const { _id, name, price, img } = item;
  const { addToCart, cartItems } = useShopContext();
  const cartItem = cartItems.find((cartItem) => cartItem._id === _id); // Find the cart item corresponding to the product
  const cartItemCount = cartItem ? cartItem.quantity : 0; // If cart item exists, get its quantity, else default to 0

  const handleClick = () => {
    addToCart(item);
  };

  return (
    <div className="product">
      <Link to={{ pathname: `/product/${_id}`, state: { productId: _id } }}>
        <img className="img-size" src={img} alt={name} />
      </Link>
      <p className="nameCard">{name}</p>
      <p className="price">${price}</p> {/* Changed class to price */}
      <div className="addToCartWrapper">
        <button className="addToCartBttn-" onClick={handleClick}>
          Add To Cart
        </button>
      </div>
      {/* Position the cart icon to bottom right corner */}
      <div className="cart-icon-wrapper">
        <Link to="/cart" className="cart-link">
          <i className="fas fa-shopping-cart"></i>
          {cartItemCount > 0 && <div className="cart-item-count">{cartItemCount}</div>}
        </Link>
      </div>
    </div>
  );
};

export default Product;
