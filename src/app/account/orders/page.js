"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../components/AuthContext";

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [token]);

  if (!token)
    return <p className="p-6 text-muted">Please log in to view your orders.</p>;
  if (orders.length === 0)
    return <p className="p-6 text-muted">You have no orders yet.</p>;

  return (
    <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        My Orders
      </h1>
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/account/orders/${order.id}`}
          className="flex justify-between border-b border-line py-4 hover:bg-bg-soft px-2 text-ink capitalize"
        >
          <span>
            Order #{order.id} — {order.status}
          </span>
          <span className="font-semibold">KSh {order.total}</span>
        </Link>
      ))}
    </main>
  );
}
