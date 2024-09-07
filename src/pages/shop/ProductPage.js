import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../shop/productPage.css";
import { useShopContext } from "../../context/shop-context";
import { nanoid } from "nanoid";
import LoadingLogo from './loading'; // Import your LoadingLogo component

const ProductPage = () => {
  const { addToCart, getTotalCartQuantity } = useShopContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [colorelectionMessage, setcolorelectionMessage] = useState('');

  const totalCartQuantity = getTotalCartQuantity(); // Get total quantity of items in the cart

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getProduct/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        // Reset color selection and message when product changes
        setSelectedColor('');
        setcolorelectionMessage('');
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (isZoomModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Clean up on component unmount
    };
  }, [isZoomModalOpen]);

  const handleClick = () => {
    if (!selectedColor && product.color && product.color.length > 0) {
      setcolorelectionMessage('Please select a color before adding to cart.');
      setTimeout(() => setcolorelectionMessage(''), 2000);
      return;
    }

    // Determine the correct image based on the selected color
    let selectedImage = product.img; // Default to main image

    if (product.color && product.color.length > 0 && selectedColor) {
      const colorIndex = product.color.indexOf(selectedColor);
      if (colorIndex !== -1 && product.additionalImageUrls && product.additionalImageUrls.length > colorIndex) {
        selectedImage = product.additionalImageUrls[colorIndex]; // Set image to corresponding additional image
      }
    }

    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      img: selectedImage, // Use the determined image
      color: selectedColor // Ensure this is a single color, not an array
    };

    addToCart(item);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const openZoomModal = (image) => {
    setZoomedImage(image);
    setZoomStyle({
      backgroundImage: `url(${image})`,
      backgroundSize: '200%',
    });
    setIsZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setZoomedImage(null);
    setIsZoomModalOpen(false);
    setIsZoomVisible(false);
  };

  const handleMouseMove = (e) => {
    if (!zoomedImage) return;

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle((prevStyle) => ({
      ...prevStyle,
      backgroundPosition: `${x}% ${y}%`,
    }));

    setIsZoomVisible(true);
  };

  const handleMouseLeave = () => {
    setIsZoomVisible(false);
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

  const { name, price, img, description, additionalImageUrls, color } = product;

  const handleImageClick = (index) => {
    if (color && color.length > 0) {
      if (index === 0) {
        // Main image click: reset color and set first additional image
        setSelectedColor('');
        setCurrentImage(0);
      } else {
        // Additional image click: update color based on image index
        setSelectedColor(color[index - 1]); // Set color based on image index
        setCurrentImage(index);
      }
    } else {
      // If no colors, simply change the current image
      setCurrentImage(index);
    }
  };

  return (
    <div className="product-container">
      <div className="button-container">
        <Link to="/cart" className="cart-link-logo">
          <i className="fas fa-shopping-cart"></i>
          {totalCartQuantity > 0 && <div className="cart-item-count">{totalCartQuantity}</div>}
        </Link>
      </div>

      <div className="product-details">
        <div className="image-container">
          <img
            className="product-image"
            src={currentImage === 0 ? img : additionalImageUrls[currentImage - 1]}
            alt={name}
            onClick={() => openZoomModal(currentImage === 0 ? img : additionalImageUrls[currentImage - 1])}
          />
          <div className="centered-content">
            <button
              className="add-to-cart-button"
              onClick={handleClick}
            >
              Add To Cart
            </button>
            {showMessage && <div className="message">Product added to cart!</div>}
            {colorelectionMessage && <div className="color-selection-message">{colorelectionMessage}</div>}
          </div>
        </div>
        <div className="description">
          <h1 className="product-name">{name}</h1>

          <div className="other-product-images">
            <img
              src={img}
              key={nanoid()}
              onClick={() => handleImageClick(0)} // Handle click for the main image
              alt={name}
              className={`thumbnail ${currentImage === 0 ? 'active' : ''}`}
            />
            {additionalImageUrls.map((imageObj, index) => (
              <img
                src={imageObj}
                key={nanoid()}
                onClick={() => handleImageClick(index + 1)} // Handle click for additional images
                alt={name}
                className={`thumbnail ${currentImage === index + 1 ? 'active' : ''}`}
              />
            ))}
          </div>
          {color && color.length > 0 && (
            <div className="color-select">
              <div className="color-circles">
                {color.map((color, index) => (
                  <div
                    key={color}
                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSelectedColor(color);
                      setCurrentImage(index + 1); // Change image to match color
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <p className="product-price">{price}$</p>
          <p className="product-description">{description}</p>
          <p className="shipping-note-product-page">
            An additional 5$ shipping fee will be applied to the total at checkout.
          </p>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomModalOpen && (
        <div className="zoom-modal" onClick={closeZoomModal}>
          <div
            className={`zoomed-image ${isZoomVisible ? 'visible' : 'hidden'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={(e) => handleMouseMove(e.touches[0])}
            style={zoomStyle}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
