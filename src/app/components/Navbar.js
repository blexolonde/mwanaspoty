"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useAuth } from "./AuthContext";
export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
      {" "}
      <span className="text-xl font-bold">MwanaSpoty</span>{" "}
      <div className="flex gap-6 items-center">
        {" "}
        <Link href="/">Home</Link> <Link href="/shop">Shop</Link>{" "}
        <Link href="/categories">Categories</Link>{" "}
        <Link href="/search">Search</Link>{" "}
        <Link href="/wishlist">Wishlist ({wishlist.length})</Link>{" "}
        <Link href="/cart">Cart ({cart.length})</Link>{" "}
        {user ? (
          <>
            {" "}
            <span>Hi, {user.name}</span>{" "}
            <button onClick={logout} className="underline">
              {" "}
              Logout{" "}
            </button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Link href="/login">Login</Link>{" "}
            <Link href="/register">Register</Link>{" "}
          </>
        )}{" "}
      </div>{" "}
    </nav>
  );
}
