import React from "react";
import { Product } from "../components/Product";
import { PRODUCTS } from "../Products";
import "../styles/Shop.css";


function Shop() {
  return (
    <div className="shop">

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>


  );
}

export default Shop;