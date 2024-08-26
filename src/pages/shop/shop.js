import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import "./shop.css";
import LoadingLogo from "./loading"; // Assuming you have a LoadingLogo component

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("rateDesc"); // Default to rate descending
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 25;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch paginated products for display
        const response = await axios.get(
          `https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getNProducts?page=${currentPage}&size=${itemsPerPage}`
        );
        setProducts(response.data.data);

        // Fetch all products for search and filtering
        const allProductsResponse = await axios.get(
          `https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getAllProducts`
        );
        setAllProducts(allProductsResponse.data);
        console.log(allProductsResponse.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Reset to the first page on sort change
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else if (sortOrder === "rateDesc") {
      return b.rate - a.rate; // Sort by rate in descending order
    } else {
      return 0;
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage * itemsPerPage < sortedProducts.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

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
            <div className="sort">
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="rateDesc">None</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="no-products-message">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="products">
                {paginatedProducts.map((item) => (
                  <Product key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>

              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span>
                  Page {currentPage} of {Math.ceil(sortedProducts.length / itemsPerPage)}
                </span>
                <button onClick={nextPage} disabled={currentPage * itemsPerPage >= sortedProducts.length}>
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
