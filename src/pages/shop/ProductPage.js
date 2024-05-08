import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductPage;
