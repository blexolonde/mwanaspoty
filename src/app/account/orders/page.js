"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../components/AuthContext";
export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [token]);
  if (!token) return <p className="p-6">Please log in to view your orders.</p>;
  if (orders.length === 0)
    return <p className="p-6">You have no orders yet.</p>;
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      {" "}
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>{" "}
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/account/orders/${order.id}`}
          className="flex justify-between border-b py-4 hover:bg-gray-50 px-2"
        >
          {" "}
          <span>
            Order #{order.id} — {order.status}
          </span>{" "}
          <span>KSh {order.total}</span>{" "}
        </Link>
      ))}{" "}
    </main>
  );
}
