"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../components/AuthContext";

export default function OrderDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch(`http://192.168.100.16:5000/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [id, token]);

  if (!order) return <p className="p-6">Loading order...</p>;

  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
      <p className="text-gray-600 mb-8">Status: {order.status}</p>
      {order.items.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-4">
          <span>
            {item.team} x{item.quantity}
          </span>
          <span>KSh {item.price * item.quantity}</span>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <span className="text-xl font-bold">Total</span>
        <span className="text-xl font-bold">KSh {order.total}</span>
      </div>
    </main>
  );
}
