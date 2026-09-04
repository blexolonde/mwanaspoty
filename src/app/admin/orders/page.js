"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  shipped: "bg-blue-100 text-blue-700 border-blue-300",
  delivered: "bg-green-100 text-green-700 border-green-300",
};

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  function loadOrders() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }

  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  async function handleStatusChange(id, status) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`, {
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
    <main className="p-4 sm:p-8 bg-bg-soft min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left bg-bg-soft text-muted border-b border-line">
              <th className="py-3 px-4 sm:px-6">Order</th>
              <th className="px-4 sm:px-6">Customer</th>
              <th className="px-4 sm:px-6">Date</th>
              <th className="px-4 sm:px-6">Items</th>
              <th className="px-4 sm:px-6">Total</th>
              <th className="px-4 sm:px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-line last:border-0 hover:bg-bg-soft"
              >
                <td className="py-4 px-4 sm:px-6 font-medium text-ink">
                  #{order.id}
                </td>
                <td className="px-4 sm:px-6">
                  <p className="font-medium text-ink">{order.user?.name}</p>
                  <p className="text-xs text-muted">{order.user?.email}</p>
                </td>
                <td className="px-4 sm:px-6 text-muted">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 text-muted">
                  {order.items.length}
                </td>
                <td className="px-4 sm:px-6 font-semibold text-navy">
                  KSh {order.total}
                </td>
                <td className="px-4 sm:px-6">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`border rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status] || ""}`}
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
        {orders.length === 0 && (
          <p className="text-muted text-sm p-6">No orders yet.</p>
        )}
      </div>
    </main>
  );
}
