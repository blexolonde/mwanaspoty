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
      team: item.team,
      price: item.price,
      quantity: 1,
    }));
    const res = await fetch("http://localhost:5000/api/orders", {
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
  if (cart.length === 0) {
    return <p className="p-6 text-center">Your cart is empty.</p>;
  }
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>{" "}
      {cart.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b py-4"
        >
          {" "}
          <div>
            {" "}
            <h2 className="font-semibold">{item.team}</h2>{" "}
            <p className="text-gray-600">KSh {item.price}</p>{" "}
          </div>{" "}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:underline"
          >
            {" "}
            Remove{" "}
          </button>{" "}
        </div>
      ))}{" "}
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}{" "}
      <div className="flex justify-between items-center mt-8">
        {" "}
        <span className="text-xl font-bold">Total: KSh {total}</span>{" "}
        <button
          onClick={handleCheckout}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
        >
          {" "}
          Checkout{" "}
        </button>{" "}
      </div>{" "}
    </main>
  );
}
