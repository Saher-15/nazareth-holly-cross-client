import React, { useEffect, useState } from "react";
import { Product } from "../components/Product";
import axios from "axios";
import "../styles/Shop.css";
import "../App.css";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(
          "https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getAllProducts"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getAllProducts();
  }, []);

  return (
    <div className="shop-container">
      <div className="products">
        {products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            productName={product.name}
            price={product.price}
            productImage={product.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
