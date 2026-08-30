"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
      {" "}
      <span className="text-xl font-bold">MwanaSpoty</span>{" "}
      <div className="flex gap-6">
        {" "}
        <Link href="/">Home</Link> <Link href="/shop">Shop</Link>{" "}
        <Link href="/categories">Categories</Link>{" "}
        <Link href="/search">Search</Link>{" "}
        <Link href="/wishlist">Wishlist ({wishlist.length})</Link>{" "}
        <Link href="/cart">Cart ({cart.length})</Link>{" "}
      </div>{" "}
    </nav>
  );
}
