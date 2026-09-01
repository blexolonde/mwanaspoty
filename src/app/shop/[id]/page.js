"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useWishlist } from "../../components/WishlistContext";
export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [jersey, setJersey] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/api/jerseys/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJersey(data);
        setActiveImage(0);
      });
  }, [id]);
  if (!jersey) return <p className="p-6">Loading...</p>;
  const images = jersey.images || [];
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      {" "}
      {images.length > 0 ? (
        <img
          src={images[activeImage]}
          alt={jersey.team}
          className="h-72 w-full object-cover rounded mb-3"
        />
      ) : (
        <div className="bg-gray-100 h-72 rounded mb-3"></div>
      )}{" "}
      {images.length > 1 && (
        <div className="flex gap-2 mb-6">
          {" "}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`h-16 w-16 rounded overflow-hidden border-2 ${i === activeImage ? "border-black" : "border-transparent"}`}
            >
              {" "}
              <img
                src={img}
                alt={`${jersey.team} ${i + 1}`}
                className="h-full w-full object-cover"
              />{" "}
            </button>
          ))}{" "}
        </div>
      )}{" "}
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
