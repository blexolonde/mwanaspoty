"use client";
import { useWishlist } from "../components/WishlistContext";
export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  if (wishlist.length === 0) {
    return <p className="p-6 text-center">Your wishlist is empty.</p>;
  }
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>{" "}
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          {" "}
          <div>
            {" "}
            <h2 className="font-semibold">{item.team}</h2>{" "}
            <p className="text-gray-600">KSh {item.price}</p>{" "}
          </div>{" "}
          <button
            onClick={() => removeFromWishlist(item.id)}
            className="text-red-600 hover:underline"
          >
            {" "}
            Remove{" "}
          </button>{" "}
        </div>
      ))}{" "}
    </main>
  );
}
