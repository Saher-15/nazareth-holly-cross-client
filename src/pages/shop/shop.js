import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./product";

import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const itemsPerPage = 12;

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(
          `https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getNProducts?page=${currentPage}&size=${itemsPerPage}`
        );
        setProducts(response.data.data);
        if (currentPage === 1) {
          setTotalPages(response.data.next);
        }
        // Scroll to top when new products are loaded
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getAllProducts();
  }, [currentPage]);

  useEffect(() => {
    // Set default values when the component mounts
    setMinPrice(0);
    setMaxPrice(100);
  }, []); // Empty dependency array to run this effect only once, when the component mounts

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= minPrice && product.price <= maxPrice
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
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
        <div className="sorting-and-cart">
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
      </div>

      <div className="products">
        {sortedProducts.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <span className="pagination-text">
          {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Shop;
