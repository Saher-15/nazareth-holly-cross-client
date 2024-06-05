import React from "react";
import { useShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";

import "../shop/product.css";

const Product = ({ item }) => {
  const { _id, name, price, img } = item;
  const { addToCart, cartItems } = useShopContext();
  const cartItem = cartItems.find((cartItem) => cartItem._id === _id); // Find the cart item corresponding to the product
  const cartItemCount = cartItem ? cartItem.quantity : 0; // If cart item exists, get its quantity, else default to 0
  // const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    addToCart(item);
    // setShowMessage(true);
    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 2000);
  };

  return (
    <div className="product">

      <Link to={{ pathname: `/product/${_id}`, state: { productId: _id } }}>
        <img src={img} alt={name} />
      </Link>
      <p className="nameCard">{name}</p>

        <p className="nameCard">${price}</p>
      <div className="addToCartWrapper">
        <button className="addToCartBttn" onClick={handleClick}>
          Add To Cart
        </button>
      </div>
      {/* {showMessage && (
        <div className="message">Product added to cart!</div>
      )} */}
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
