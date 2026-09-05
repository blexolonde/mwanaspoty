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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [id, token]);

  if (!order)
    return <p className="p-6 text-muted">Loading order...</p>;

  return (
    <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-navy">
        Order #{order.id}
      </h1>
      <p className="text-muted mb-6 sm:mb-8 capitalize">
        Status: {order.status}
      </p>
      {order.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b border-line py-4 text-ink"
        >
          <span>
            {item.team} x{item.quantity}
          </span>
          <span>KSh {item.price * item.quantity}</span>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <span className="text-lg sm:text-xl font-bold text-navy">Total</span>
        <span className="text-lg sm:text-xl font-bold text-navy">
          KSh {order.total}
        </span>
      </div>
    </main>
  );
}
