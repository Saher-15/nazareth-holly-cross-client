import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Product from "./product";

import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [setCart] = useState({}); // State to track quantity of each product
  const itemsPerPage = 12;

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(
          `https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getNProducts?page=${currentPage}&size=${itemsPerPage}`
        );
        setProducts(response.data.data);
        // Only set totalPages when component mounts
        if (currentPage === 1) {
          setTotalPages(response.data.next);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getAllProducts();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addToCart = (productId) => {
    // Update cart state with quantity of the product
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop">
      <div className="header">
        <div className="cart-logo">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="products">
        {filteredProducts.map((item) => (
          <Product
            key={item._id}
            item={item}
            addToCart={() => addToCart(item._id)}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pagination-text">
          {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      
    </div>
  );
};

export default Shop;
