"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  function loadOrders() {
    fetch("http://localhost:5000/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }

  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  async function handleStatusChange(id, status) {
    await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Order ID</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2">#{order.id}</td>
              <td>KSh {order.total}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
