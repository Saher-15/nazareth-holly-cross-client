import React from "react";
import { useShopContext } from "../../context/shop-context";
 const CartItem = ({data}) => {
  const { _id, name, price, img, quantity} = data;
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
          <button className="addToCartBttn" onClick={() => removeFromCart(_id)}> - </button>
          <input
            value={quantity}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
          />
          <button className="addToCartBttn" onClick={() => addToCart(data)}> + </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
