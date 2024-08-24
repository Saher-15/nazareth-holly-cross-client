import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import "./shop.css";
import LoadingLogo from "./loading"; // Assuming you have a LoadingLogo component

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //const [totalPages, setTotalPages] = useState(1); // Ensure correct state initialization
  const [sortOrder, setSortOrder] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 25;

  useEffect(() => {
    async function getAllProducts() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getNProducts?page=${currentPage}&size=${itemsPerPage}`
        );
        setProducts(response.data.data);
        //setTotalPages(response.data.next); // Ensure next page count is used
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    getAllProducts();
  }, [currentPage]);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
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

  const nextPage = () => {
    if (currentPage < 3) {
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
                <option value="">Sort: None</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="no-products-message">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="products">
                {sortedProducts.map((item) => (
                  <Product key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>

              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span>
                  Page {currentPage} of {3}
                </span>
                <button onClick={nextPage} disabled={currentPage === 3}>
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
