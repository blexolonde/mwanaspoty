"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token, user } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  async function handleCheckout() {
    setError("");
    if (!user) {
      router.push("/login");
      return;
    }
    const items = cart.map((item) => ({
      id: item.id,
      team: item.team,
      price: item.price,
      quantity: 1,
    }));
    const res = await fetch("http://192.168.100.16:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) {
      setError("Checkout failed. Please try again.");
      return;
    }
    const order = await res.json();
    clearCart();
    router.push(`/account/orders/${order.id}`);
  }

  function badgeLabel(badge) {
    if (badge === "premier-league") return "Premier League Badge";
    if (badge === "champions-league") return "Champions League Badge";
    return null;
  }

  if (cart.length === 0) {
    return (
      <main className="px-4 sm:px-6 py-16 sm:py-24 max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-full bg-bg-soft flex items-center justify-center">
            <ShoppingBag size={28} className="text-muted" />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy mb-2">
          Your cart is empty
        </h1>
        <p className="text-muted mb-6">
          Looks like you haven't added any jerseys yet.
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
    <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-6 md:gap-8 items-start">
        {/* Cart items */}
        <div className="border border-line rounded-xl overflow-hidden bg-white">
          {cart.map((item, index) => (
            <div
              key={index}
              className={`flex gap-4 p-4 sm:p-5 ${
                index !== cart.length - 1 ? "border-b border-line" : ""
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

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-ink truncate">
                    {item.team}
                  </h2>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="text-red-600 hover:text-red-700 shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-1 space-y-0.5">
                  {item.size && (
                    <p className="text-sm text-muted">Size: {item.size}</p>
                  )}
                  {(item.customName || item.customNumber) && (
                    <p className="text-sm text-muted">
                      Print: {item.customName} {item.customNumber}
                    </p>
                  )}
                  {badgeLabel(item.badge) && (
                    <p className="text-sm text-muted">
                      {badgeLabel(item.badge)}
                    </p>
                  )}
                </div>

                <p className="text-navy font-bold mt-2">KSh {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="border border-line rounded-xl p-5 bg-white md:sticky md:top-24">
          <h2 className="font-bold text-navy mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-muted mb-2">
            <span>Subtotal</span>
            <span>KSh {total}</span>
          </div>
          <div className="flex justify-between text-sm text-muted mb-4">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t border-line pt-4 mb-5 flex justify-between text-lg font-bold text-navy">
            <span>Total</span>
            <span>KSh {total}</span>
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            onClick={handleCheckout}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors w-full"
          >
            Checkout
          </button>
          <Link
            href="/shop"
            className="block text-center text-sm text-accent-dark hover:text-accent mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}