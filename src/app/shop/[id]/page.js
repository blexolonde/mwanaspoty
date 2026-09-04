"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
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
  const [toast, setToast] = useState(null); // { message: string } | null

  useEffect(() => {
    fetch(`http://192.168.100.16:5000/api/jerseys/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJersey(data);
        setActiveImage(0);
      });
  }, [id]);

  // auto-dismiss the toast after a couple seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  if (!jersey) return <p className="p-6 text-muted">Loading...</p>;

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
    setToast({ message: "Added to cart successfully" });
  }

  function handleAddToWishlist() {
    addToWishlist(jersey);
    setToast({ message: "Added to wishlist" });
  }

  return (
    <main className="relative px-4 sm:px-6 py-8 sm:py-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Toast popup */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-navy text-white px-5 py-3 rounded-full shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle size={18} className="text-accent shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">
            {toast.message}
          </span>
        </div>
      )}

      <div>
        {images.length > 0 ? (
          <img
            src={images[activeImage]}
            alt={jersey.team}
            className="w-full h-72 sm:h-[420px] object-contain bg-bg-soft rounded mb-3"
          />
        ) : (
          <div className="bg-bg-soft h-72 sm:h-[420px] rounded mb-3"></div>
        )}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-14 w-14 sm:h-16 sm:w-16 rounded overflow-hidden border-2 ${
                  i === activeImage ? "border-accent" : "border-transparent"
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-navy">
          {jersey.team}
        </h1>
        <p className="text-lg sm:text-xl text-muted mb-6">KSh {jersey.price}</p>

        <div className="mb-6">
          <p className="font-semibold mb-2 text-ink">Size</p>
          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-12 h-10 rounded border font-semibold transition-colors ${
                  size === s
                    ? "bg-accent text-white border-accent"
                    : "border-line text-ink hover:border-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="font-semibold mb-2 block text-ink">
            Custom Name & Number (+KSh 500)
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Name (e.g. SALAH)"
              className="border border-line rounded px-3 py-2 flex-1 outline-none focus:border-accent transition-colors"
            />
            <input
              type="text"
              value={customNumber}
              onChange={(e) =>
                setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2))
              }
              placeholder="No."
              className="border border-line rounded px-3 py-2 w-20 outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2 text-ink">Badge (+KSh 200)</p>
          <div className="space-y-2 text-ink">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="badge"
                checked={badge === "none"}
                onChange={() => setBadge("none")}
                className="accent-accent"
              />
              No Badge
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="badge"
                checked={badge === "premier-league"}
                onChange={() => setBadge("premier-league")}
                className="accent-accent"
              />
              Premier League Badge
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="badge"
                checked={badge === "champions-league"}
                onChange={() => setBadge("champions-league")}
                className="accent-accent"
              />
              Champions League Badge
            </label>
          </div>
        </div>

        <div className="border-t border-line pt-4 mb-6">
          <div className="flex justify-between text-lg font-bold text-navy">
            <span>Total</span>
            <span>KSh {total}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors w-full mb-3"
        >
          Add to Cart — KSh {total}
        </button>
        <button
          onClick={handleAddToWishlist}
          className="border border-accent text-accent-dark px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors w-full"
        >
          Add to Wishlist
        </button>
      </div>
    </main>
  );
}
