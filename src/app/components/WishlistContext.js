"use client";
import { createContext, useContext, useState } from "react";
const WishlistContext = createContext();
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  function addToWishlist(item) {
    setWishlist((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item],
    );
  }
  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }
  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {" "}
      {children}{" "}
    </WishlistContext.Provider>
  );
}
export function useWishlist() {
  return useContext(WishlistContext);
}
