"use client";
import Link from "next/link";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="px-4 sm:px-6 py-16 sm:py-24 max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-full bg-bg-soft flex items-center justify-center">
            <Heart size={28} className="text-muted" />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-muted mb-6">
          Save jerseys you love here to find them again easily.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-dark transition-colors"
        >
          Browse Jerseys
        </Link>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Your Wishlist
      </h1>

      <div className="border border-line rounded-xl overflow-hidden bg-white">
        {wishlist.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-4 p-4 sm:p-5 ${
              index !== wishlist.length - 1 ? "border-b border-line" : ""
            }`}
          >
            {item.images?.[0] ? (
              <img
                src={item.images[0]}
                alt={item.team}
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain bg-bg-soft rounded-lg shrink-0"
              />
            ) : (
              <div className="h-20 w-20 sm:h-24 sm:w-24 bg-bg-soft rounded-lg shrink-0" />
            )}

            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-ink truncate">{item.team}</h2>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove item"
                  className="text-red-600 hover:text-red-700 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-muted text-sm mt-1">KSh {item.price}</p>

              <button
                onClick={() => addToCart(item)}
                className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:text-accent w-fit"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
