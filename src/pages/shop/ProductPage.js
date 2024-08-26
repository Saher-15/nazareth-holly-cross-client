import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "../shop/productPage.css";
import { useShopContext } from "../../context/shop-context";
import { nanoid } from "nanoid";
import LoadingLogo from './loading'; // Import your LoadingLogo component

const ProductPage = () => {
  const { addToCart, cartItems } = useShopContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItem = cartItems.find((cartItem) => cartItem._id === id);
  const cartItemCount = cartItem ? cartItem.quantity : 0;
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  // Fetch product data
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

  // Handle add to cart
  const handleClick = () => {
    if (product) {
      addToCart(product);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  // Handle image click to open modal
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    if (product) {
      const totalImages = (product.additionalImageUrls.length || 0) + 1;
      setCurrentImage((prevImage) => (prevImage + 1) % totalImages);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (product) {
      const totalImages = (product.additionalImageUrls.length || 0) + 1;
      setCurrentImage((prevImage) => (prevImage - 1 + totalImages) % totalImages);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, currentImage]);

  // Handle touch navigation
  useEffect(() => {
    let startX;

    const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      const endX = event.touches[0].clientX;
      const deltaX = startX - endX;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextImage(); // Swipe left
        } else {
          prevImage(); // Swipe right
        }
        startX = endX; // Reset startX
      }
    };

    if (isModalOpen) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isModalOpen, currentImage]);

  // Render loading or error
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
            onClick={handleImageClick}
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
                src={`${imageObj}`}
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

      {/* Image Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Stop click events from propagating to the overlay
          >
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <button className="prev-button" onClick={prevImage}>←</button>
            <button className="next-button" onClick={nextImage}>→</button>
            <div className="modal-image-container">
              <img
                src={currentImage === 0 ? img : additionalImageUrls[currentImage - 1]}
                alt="Product"
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
