"use client";
import { useParams } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useWishlist } from "../../components/WishlistContext";
import { jerseys } from "../../data/jerseys";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const jersey = jerseys.find((j) => j.id === Number(id));
  if (!jersey) return <p className="p-6">Jersey not found.</p>;
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      {" "}
      <div className="bg-gray-100 h-72 rounded mb-6"></div>{" "}
      <h1 className="text-3xl font-bold mb-2">{jersey.team}</h1>{" "}
      <p className="text-xl text-gray-600 mb-6">KSh {jersey.price}</p>{" "}
      <button
        onClick={() => addToCart(jersey)}
        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
      >
        {" "}
        Add to Cart{" "}
      </button>{" "}
      <button
        onClick={() => addToWishlist(jersey)}
        className="ml-4 border border-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
      >
        {" "}
        Add to Wishlist{" "}
      </button>{" "}
    </main>
  );
}
