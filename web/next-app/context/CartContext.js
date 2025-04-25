"use client"

import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("new-cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("new-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevcartItems) => {
      const existingItem = prevcartItems.find((item) => item.id === product.id);
      const quantity = product.quantity || 1; // Ensure a default quantity of 1 if undefined
  
      if (existingItem) {
        // Update the existing item's quantity and total price
        return prevcartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity, // Add validated quantity
                total_price: (item.quantity + quantity) * parseFloat(item.unit_price), // Update total price
              }
            : item
        );
      } else {
        // Add the product as a new item with its initial quantity and total price
        return [
          ...prevcartItems,
          { 
            ...product, 
            quantity, // Use validated quantity
            total_price: quantity * parseFloat(product.unit_price || 0), // Default unit_price to 0 if undefined
          },
        ];
      }
    });
  };

  const incrementQuantity = (id) => {
    setCartItems((prevcartItems) =>
      prevcartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              total_price: (item.quantity + 1) * parseFloat(item.unit_price),
            }
          : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevcartItems) =>
      prevcartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
              total_price: Math.max(item.quantity - 1, 1) * parseFloat(item.unit_price),
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevcartItems) => prevcartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}



export function useCart() {
  return useContext(CartContext);
}

