import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex(item => item._id === product._id);
  
    if (existingProductIndex !== -1) {
      // If the product exists, create a new array with updated quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex] = {
        ...updatedCartItems[existingProductIndex],
        quantity: updatedCartItems[existingProductIndex].quantity + 1
      };
      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCartItems(prevCartItems => [...prevCartItems, { ...product, quantity: 1 }]);
    }
  };
  
  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === productId) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity <= 0) {
          // If the quantity becomes less than or equal to 0, remove the product from the cart
          return null;
        } else {
          return { ...item, quantity: updatedQuantity };
        }
      }
      return item;
    }).filter(Boolean); // Remove any null values from the array
    setCartItems(updatedCartItems);

  
  };

  // Function to update the count of a product in the cart
  const updateCartItemCount = (productId, newCount) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId ? { ...item, count: newCount } : item
      )
    );
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);

export default ShopContextProvider;
