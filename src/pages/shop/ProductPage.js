import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "../shop/productPage.css";
import { useShopContext } from "../../context/shop-context";
import { nanoid } from "nanoid";
import LoadingLogo from './loading';

const ProductPage = () => {
  const { addToCart, cartItems } = useShopContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [zoomed, setZoomed] = useState(false);

  const cartItem = cartItems.find((cartItem) => cartItem._id === id);
  const cartItemCount = cartItem ? cartItem.quantity : 0;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getProduct/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
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
    if (product) {
      addToCart(product);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handleMouseMove = (e) => {
    if (zoomed) {
      const { offsetX, offsetY, target } = e.nativeEvent;
      const { width, height } = target;
      const xPercent = (offsetX / width) * 100;
      const yPercent = (offsetY / height) * 100;

      setZoomStyle({
        transformOrigin: `${xPercent}% ${yPercent}%`,
        transform: 'scale(2)',
      });
    }
  };

  const handleImageClick = () => {
    setZoomed(!zoomed);
    if (!zoomed) {
      setZoomStyle({ transform: 'scale(2)' });
    } else {
      setZoomStyle({});
    }
  };

  const handleTouchMove = (e) => {
    if (zoomed) {
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      const { top, left, width, height } = e.target.getBoundingClientRect();
      const xPercent = ((clientX - left) / width) * 100;
      const yPercent = ((clientY - top) / height) * 100;

      setZoomStyle({
        transformOrigin: `${xPercent}% ${yPercent}%`,
        transform: 'scale(2)',
      });
    }
  };

  if (loading) {
    return <LoadingLogo />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  const { name, price, img, description, additionalImageUrls } = product;

  return (
    <div className="product-container">
      <div className="button-container">
        <button className="back-button" onClick={() => navigate("/shop")}>
          <i className="fas fa-chevron-left">shop</i>
        </button>

        <Link to="/cart" className="cart-link-logo">
          <i className="fas fa-shopping-cart"></i>
          {cartItemCount > 0 && <div className="cart-item-count">{cartItemCount}</div>}
        </Link>
      </div>

      <div className="product-details">
        <div className="image-container">
          <img
            className="product-image"
            src={currentImage === 0 ? img : additionalImageUrls[currentImage - 1]}
            alt={name}
            onMouseMove={handleMouseMove}
            onClick={handleImageClick}
            onTouchMove={handleTouchMove}
            style={zoomStyle}
          />
          <div className="centered-content">
            <button className="add-to-cart-button" onClick={handleClick}>
              Add To Cart
            </button>
            {showMessage && <div className="message">Product added to cart!</div>}
          </div>
        </div>
        <div className="description">
          <h1 className="product-name">{name}</h1>
          <div className="other-product-images">
            <img
              src={img}
              key={nanoid()}
              onClick={() => setCurrentImage(0)}
              alt={name}
              className={`thumbnail ${currentImage === 0 ? 'active' : ''}`}
            />
            {additionalImageUrls.map((imageObj, index) => (
              <img
                src={imageObj}
                key={nanoid()}
                onClick={() => setCurrentImage(index + 1)}
                alt={name}
                className={`thumbnail ${currentImage === index + 1 ? 'active' : ''}`}
              />
            ))}
          </div>
          <p className="product-price">${price}</p>
          <p>Free shipping</p>
          <p className="product-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
