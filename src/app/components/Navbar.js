"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Home } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [allJerseys, setAllJerseys] = useState([]);
  const [hoveredLeague, setHoveredLeague] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/jerseys")
      .then((res) => res.json())
      .then((data) => setAllJerseys(data));
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <nav className="bg-slate-900 text-white">
      {" "}
      <div className="flex items-center justify-between px-6 py-3 gap-6">
        {" "}
        <Link href="/" className="text-xl font-bold whitespace-nowrap">
          MwanaSpoty
        </Link>{" "}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl">
          {" "}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands and categories"
            className="flex-1 rounded-l-full px-4 py-2 text-black bg-white outline-none"
          />{" "}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 rounded-r-full px-4"
          >
            {" "}
            <Search size={20} />{" "}
          </button>{" "}
        </form>{" "}
        <Link href="/" className="hover:text-orange-400">
          <Home size={22} />
        </Link>{" "}
        <div className="flex items-center gap-5 whitespace-nowrap">
          {" "}
          {user ? (
            <div className="flex items-center gap-3">
              {" "}
              <Link href="/account" className="flex items-center gap-1">
                {" "}
                <User size={20} /> Hi, {user.name}{" "}
              </Link>{" "}
              <button onClick={logout} className="underline text-sm">
                Logout
              </button>{" "}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1">
              {" "}
              <User size={20} /> Login{" "}
            </Link>
          )}{" "}
          <Link href="/wishlist" className="relative">
            {" "}
            <Heart size={22} />{" "}
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {" "}
                {wishlist.length}{" "}
              </span>
            )}{" "}
          </Link>{" "}
          <Link href="/cart" className="relative">
            {" "}
            <ShoppingCart size={22} />{" "}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {" "}
                {cart.length}{" "}
              </span>
            )}{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-slate-950 px-6 py-2 flex gap-6 relative">
        {[
          "Premier League",
          "La Liga",
          "Bundesliga",
          "Ligue 1",
          "Kenyan Premier League",
          "Tanzania Premier League",
          "Ugandan Premier League",
        ].map((league) => (
          <div
            key={league}
            className="relative"
            onMouseEnter={() => setHoveredLeague(league)}
            onMouseLeave={() => setHoveredLeague(null)}
          >
            <Link
              href={`/categories/${encodeURIComponent(league)}`}
              className="hover:text-orange-400"
            >
              {league === "Kenyan Premier League"
                ? "KPL"
                : league === "Tanzania Premier League"
                  ? "Tanzania League"
                  : league === "Ugandan Premier League"
                    ? "Uganda League"
                    : league}
            </Link>
            {hoveredLeague === league && (
              <div className="absolute top-full left-0 bg-white text-black shadow-lg rounded-b-lg py-2 w-48 z-50">
                {allJerseys.filter((j) => j.league === league).length === 0 && (
                  <p className="px-4 py-1 text-sm text-gray-400">
                    No teams yet
                  </p>
                )}
                {allJerseys
                  .filter((j) => j.league === league)
                  .map((jersey) => (
                    <Link
                      key={jersey.id}
                      href={`/shop/${jersey.id}`}
                      className="block px-4 py-1 text-sm hover:bg-gray-100"
                    >
                      {jersey.team}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/best-sellers" className="text-orange-400 font-semibold">
          Best Sellers
        </Link>
      </div>{" "}
    </nav>
  );
}
