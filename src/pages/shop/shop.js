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
  const [sortOrder, setSortOrder] = useState(""); // State to track sorting order
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

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const addToCart = (productId) => {
    // Update cart state with quantity of the product
    // Implementation of addToCart logic
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on sorting order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return 0; // Maintain original order if no sorting order is selected
    }
  });

  return (
    <div className="shop">
      
      <div className="search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="header">
        <div className="sorting">
          <label htmlFor="sortOrder">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="">None</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
        <div className="cart-logo">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
      <div className="products">
        {sortedProducts.map((item) => (
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
