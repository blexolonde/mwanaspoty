"use client";
import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  function addToCart(item) {
    setCart((prev) => [...prev, item]);
  }
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
