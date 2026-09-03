"use client";
import { useWishlist } from "../components/WishlistContext";
export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  if (wishlist.length === 0) {
    return (
      <p className="p-6 text-center text-muted">Your wishlist is empty.</p>
    );
  }
  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12 max-w-2xl mx-auto">
      {" "}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Your Wishlist
      </h1>{" "}
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-line py-4"
        >
          {" "}
          <div>
            {" "}
            <h2 className="font-semibold text-ink">{item.team}</h2>{" "}
            <p className="text-muted">KSh {item.price}</p>{" "}
          </div>{" "}
          <button
            onClick={() => removeFromWishlist(item.id)}
            className="text-red-600 hover:underline text-sm sm:text-base"
          >
            {" "}
            Remove{" "}
          </button>{" "}
        </div>
      ))}{" "}
    </main>
  );
}
