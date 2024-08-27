import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const { _id, color } = product;
    
    // Check if the product already exists in the cart with the same color
    const existingProductIndex = cartItems.findIndex(item => item._id === _id && item.color === color);
    
    if (existingProductIndex !== -1) {
      // If the product exists with the same color, update the quantity
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
  const decreaseFromCart = (productId, color) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === productId && item.color === color) {
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

  // Function to remove a product from the cart
  const removeFromCart = (productId, color) => {
    const updatedCartItems = cartItems.filter(
      (item) => !(item._id === productId && item.color === color)
    );
    setCartItems(updatedCartItems);
  };

  // Function to update the count of a product in the cart
  const updateCartItemCount = (productId, color, newCount) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId && item.color === color
          ? { ...item, quantity: newCount }
          : item
      )
    );
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    decreaseFromCart,
    clearCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);

export default ShopContextProvider;
