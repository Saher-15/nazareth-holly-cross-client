import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import "./shop.css";
import LoadingLogo from "./loading"; // Assuming you have a LoadingLogo component

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sliderMax, setSliderMax] = useState(100);
  const [cartCount, setCartCount] = useState(0); // State to track cart count
  const [loading, setLoading] = useState(true); // Add loading state
  const itemsPerPage = 12;

  useEffect(() => {
    async function getAllProducts() {
      setLoading(true); // Set loading to true before fetching data
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
      } finally {
        setLoading(false); // Set loading to false after fetching data
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

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleMaxSliderChange = (event) => {
    setSliderMax(event.target.value);
    setMaxPrice(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    // Increment cart count when an item is added to the cart
    setCartCount(cartCount + 1);
  };

  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
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
    <div className="shop-page">
      {loading ? (
        <LoadingLogo />
      ) : (
        <>
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
              <div className="price-filter">
                <span>Price Range:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderMax}
                  onChange={handleMaxSliderChange}
                />
                <span>${sliderMax}</span>
              </div>
            </div>
          </div>

          <div className="products">
            {sortedProducts.map((item) => (
              <Product key={item._id} item={item} onAddToCart={handleAddToCart} /> // Pass handleAddToCart function as props
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
        </>
      )}
    </div>
  );
};

export default Shop;
