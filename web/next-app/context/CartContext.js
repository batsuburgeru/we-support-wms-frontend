"use client"

import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total_price: (item.quantity + 1) * parseFloat(item.unit_price),
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          { ...product, quantity: 1, total_price: parseFloat(product.unit_price) },
        ];
      }
    });
  };

  const incrementQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
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
    setItems((prevItems) =>
      prevItems.map((item) =>
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
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}



export function useCart() {
  return useContext(CartContext);
}

