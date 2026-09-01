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
  const [size, setSize] = useState("M");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [badge, setBadge] = useState("none");
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
  const nameCost = customName.trim() || customNumber.trim() ? 500 : 0;
  const badgeCost = badge !== "none" ? 200 : 0;
  const total = jersey.price + nameCost + badgeCost;
  function handleAddToCart() {
    addToCart({
      ...jersey,
      price: total,
      size,
      customName: customName.trim(),
      customNumber: customNumber.trim(),
      badge,
    });
  }
  return (
    <main className="px-6 py-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        {images.length > 0 ? (
          <img
            src={images[activeImage]}
            alt={jersey.team}
            className="w-full h-[420px] object-contain bg-gray-50 rounded mb-3"
          />
        ) : (
          <div className="bg-gray-100 h-[420px] rounded mb-3"></div>
        )}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-16 w-16 rounded overflow-hidden border-2 ${
                  i === activeImage ? "border-black" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${jersey.team} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{jersey.team}</h1>
        <p className="text-xl text-gray-600 mb-6">KSh {jersey.price}</p>
        <div className="mb-6">
          <p className="font-semibold mb-2">Size</p>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-12 h-10 rounded border font-semibold ${
                  size === s
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="font-semibold mb-2 block">
            Custom Name & Number (+KSh 500)
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Name (e.g. SALAH)"
              className="border rounded px-3 py-2 flex-1"
            />
            <input
              type="text"
              value={customNumber}
              onChange={(e) =>
                setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2))
              }
              placeholder="No."
              className="border rounded px-3 py-2 w-20"
            />
          </div>
        </div>
        <div className="mb-6">
          <p className="font-semibold mb-2">Badge (+KSh 200)</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="badge"
                checked={badge === "none"}
                onChange={() => setBadge("none")}
              />
              No Badge
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="badge"
                checked={badge === "premier-league"}
                onChange={() => setBadge("premier-league")}
              />
              Premier League Badge
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="badge"
                checked={badge === "champions-league"}
                onChange={() => setBadge("champions-league")}
              />
              Champions League Badge
            </label>
          </div>
        </div>
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>KSh {total}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 w-full mb-3"
        >
          Add to Cart — KSh {total}
        </button>
        <button
          onClick={() => addToWishlist(jersey)}
          className="border border-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 w-full"
        >
          Add to Wishlist
        </button>
      </div>
    </main>
  );
}
