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
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const itemsPerPage = 30;

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.name.toLowerCase().includes(searchQuery)
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
          <div className="header-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="filters">
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
            <div className="sort">
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
          </div>

          {sortedProducts.length === 0 ? (
            <p>No products found matching your criteria.</p>
          ) : (
            <div className="products">
              {sortedProducts.map((item) => (
                <Product key={item._id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
