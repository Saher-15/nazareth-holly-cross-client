import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../shop/productPage.css";
import { useShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { addToCart, cartItems } = useShopContext();
  const { id } = useParams(); // Extract the id parameter from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItem = cartItems.find((cartItem) => cartItem._id === id); // Find the cart item corresponding to the product
  const cartItemCount = cartItem ? cartItem.quantity : 0; // If cart item exists, get its quantity, else default to 0
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false); // State to manage message visibility

  useEffect(() => {
    // Fetch product details from your API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getProduct/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleClick = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Proceed with rendering the product details
  const { name, price, img, description } = product;

  return (
    <div className="product-container">
      <div className="header">
        <div className="cart-logo-product">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
      <div className="product-details">
        <img className="product-image" src={img} alt="" />
        <div className="description">
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
          <p className="product-description">{description}</p>
        </div>
        <div className="button-wrapper">
          <button className="add-to-cart-button" onClick={handleClick}>
            Add To Cart
          </button>
          {cartItemCount > 0 && <div className="cart-item-count">Qty: {cartItemCount}</div>}
        </div>
        {showMessage && <div className="message">Product added to cart!</div>}
      </div>
      <div className="checkout">
        <button className="continue-shopping-button" onClick={() => navigate("/shop")}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default ProductPage;
