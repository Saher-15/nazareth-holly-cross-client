import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductItem.css";

function ProductItem({ addToCart }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const [addedToCart, setAddedToCart] = useState(false); // State to track if product has been added to cart
  const { productId } = useParams();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(
          `https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getProduct/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Calculate total price based on quantity
    const totalPrice = product.price * quantity;
    // Add product to cart with quantity and total price
    addToCart({ ...product, quantity, totalPrice });
    setAddedToCart(true); // Set addedToCart to true when product is added to cart
    // Reset addedToCart after a delay to hide the message
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000); // Hide message after 3 seconds
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {product ? (
        <div className="product-details">
          <img className="product-image" src={product.img} alt={product.name} />
          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <div className="quantity-control">
              <button className="quantity-button" onClick={decrementQuantity}>-</button>
              <input
                className="quantity-input"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button className="quantity-button" onClick={incrementQuantity}>+</button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            {addedToCart && <p className="added-to-cart-message">Product added to cart!</p>}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductItem;
