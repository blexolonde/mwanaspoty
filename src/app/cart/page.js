"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    return <p className="p-6 text-center text-muted">Your cart is empty.</p>;
  }
  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12 max-w-2xl mx-auto">
      {" "}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Your Cart
      </h1>{" "}
      {cart.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-b border-line py-4"
        >
          {" "}
          <div>
            {" "}
            <h2 className="font-semibold text-ink">{item.team}</h2>{" "}
            {item.size && (
              <p className="text-sm text-muted">Size: {item.size}</p>
            )}{" "}
            {(item.customName || item.customNumber) && (
              <p className="text-sm text-muted">
                {" "}
                Print: {item.customName} {item.customNumber}{" "}
              </p>
            )}{" "}
            {badgeLabel(item.badge) && (
              <p className="text-sm text-muted">{badgeLabel(item.badge)}</p>
            )}{" "}
            <p className="text-ink font-medium mt-1">KSh {item.price}</p>{" "}
          </div>{" "}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:underline text-sm sm:text-base"
          >
            {" "}
            Remove{" "}
          </button>{" "}
        </div>
      ))}{" "}
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}{" "}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
        {" "}
        <span className="text-lg sm:text-xl font-bold text-navy">
          Total: KSh {total}
        </span>{" "}
        <button
          onClick={handleCheckout}
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors w-full sm:w-auto"
        >
          {" "}
          Checkout{" "}
        </button>{" "}
      </div>{" "}
    </main>
  );
}
