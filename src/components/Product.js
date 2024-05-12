import React from "react";

export const Product = ({ productName, price, productImage, addToCart }) => {
  return (
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>${price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};
