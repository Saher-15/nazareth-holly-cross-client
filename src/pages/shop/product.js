import React from "react";
import { useShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import "../shop/product.css";

const Product = ({ item }) => {
  const { _id, name, price, img } = item;
  const { getTotalCartQuantity } = useShopContext(); // Get the function to calculate total cart quantity

  // Calculate the total quantity of all items in the cart
  const totalCartQuantity = getTotalCartQuantity();

  return (
    <div className="product">
      <Link to={{ pathname: `/product/${_id}`, state: { productId: _id } }}>
        <img className="img-size" src={img} alt={name} />
      </Link>
      <p className="nameCard">{name}</p>
      <p className="price">${price}</p> {/* Changed class to price */}
      {/* Position the cart icon to bottom right corner */}
      {/* <div className="cart-icon-wrapper">
        <Link to="/cart" className="cart-link">
          <i className="fas fa-shopping-cart"></i>
          {totalCartQuantity > 0 && (
            <div className="cart-item-count">{totalCartQuantity}</div>
          )}
        </Link>
      </div> */}
    </div>
  );
};

export default Product;
