"use client";
import { useCart } from "../components/CartContext";
export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
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
      <div className="flex justify-between items-center mt-8">
        {" "}
        <span className="text-xl font-bold">Total: KSh {total}</span>{" "}
        <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800">
          {" "}
          Checkout{" "}
        </button>{" "}
      </div>{" "}
    </main>
  );
}
