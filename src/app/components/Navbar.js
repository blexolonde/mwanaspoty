"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Home, Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="bg-slate-900 text-white shadow-md">
      {" "}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 gap-3 md:gap-6">
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold whitespace-nowrap"
        >
          MwanaSpoty
        </Link>
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 max-w-2xl"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands and categories"
            className="flex-1 rounded-l-full px-5 py-3 text-base text-black bg-white outline-none min-w-0 transition-shadow focus:shadow-md"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 rounded-r-full px-5"
          >
            <Search size={22} />
          </button>
        </form>
        <Link
          href="/"
          className="hover:text-orange-400 transition-colors duration-200 hidden sm:block"
        >
          <Home size={26} />
        </Link>
        <div className="flex items-center gap-4 md:gap-6 whitespace-nowrap text-base">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/account" className="flex items-center gap-1">
                <User size={24} /> Hi, {user.name}
              </Link>
              <button onClick={logout} className="underline text-sm">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-1">
              <User size={24} /> Login
            </Link>
          )}
          <Link href={user ? "/account" : "/login"} className="md:hidden">
            <User size={26} />
          </Link>
          <Link
            href="/wishlist"
            className="relative hover:text-orange-400 transition-colors duration-200"
          >
            <Heart size={26} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative hover:text-orange-400 transition-colors duration-200"
          >
            <ShoppingCart size={26} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>{" "}
      <div
        className={`bg-slate-950 px-6 py-2.5 gap-4 md:gap-6 text-sm md:text-base relative ${menuOpen ? "flex flex-col md:flex-row" : "hidden md:flex"}`}
      >
        {[
          "Premier League",
          "La Liga",
          "Bundesliga",
          "Ligue 1",
          "Serie A",
          "Liga NOS",
          "Eredivisie",
          "South African Premiership",
          "KPL",
          "Tanzania League",
          "Uganda League",
        ].map((league) => (
          <div
            key={league}
            className="relative whitespace-nowrap"
            onMouseEnter={() => setHoveredLeague(league)}
            onMouseLeave={() => setHoveredLeague(null)}
          >
            <Link
              href={`/categories/${encodeURIComponent(league)}`}
              className="hover:text-orange-400 transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-orange-400"
            >
              {league}
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
        <div className="md:hidden flex flex-col gap-3 pt-3 border-t border-slate-800">
          {user ? (
            <button onClick={logout} className="text-left">
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>{" "}
    </nav>
  );
}
