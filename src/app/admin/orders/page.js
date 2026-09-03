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
    fetch("http://192.168.100.16:5000/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }

  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  async function handleStatusChange(id, status) {
    await fetch(`http://192.168.100.16:5000/api/admin/orders/${id}`, {
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
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50 text-gray-500 border-b">
              <th className="py-3 px-6">Order</th>
              <th className="px-6">Customer</th>
              <th className="px-6">Date</th>
              <th className="px-6">Items</th>
              <th className="px-6">Total</th>
              <th className="px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-4 px-6 font-medium">#{order.id}</td>
                <td className="px-6">
                  <p className="font-medium">{order.user?.name}</p>
                  <p className="text-xs text-gray-400">{order.user?.email}</p>
                </td>
                <td className="px-6 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 text-gray-500">{order.items.length}</td>
                <td className="px-6 font-semibold">KSh {order.total}</td>
                <td className="px-6">
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
          <p className="text-gray-400 text-sm p-6">No orders yet.</p>
        )}
      </div>
    </main>
  );
}
