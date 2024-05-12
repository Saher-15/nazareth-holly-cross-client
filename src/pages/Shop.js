import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import "../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  return (
    <div className="shop-container">
      <div className="products">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="product-link">
            {/* Link to productItem page */}
            <div className="product-card">
              <img className="product-image" src={product.img} alt={product.name} />
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pagination-text">{currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Shop;
