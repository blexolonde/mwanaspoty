"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
import { ShoppingBag, Wallet, Users, PackageSearch } from "lucide-react";
export default function AdminDashboard() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    fetch("http://localhost:5000/api/admin/orders", { headers })
      .then((res) => res.json())
      .then(setOrders);
    fetch("http://localhost:5000/api/admin/customers", { headers })
      .then((res) => res.json())
      .then(setCustomers);
    fetch("http://localhost:5000/api/admin/analytics/low-stock", { headers })
      .then((res) => res.json())
      .then(setLowStock);
  }, [token]);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 5);
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Revenue",
      value: `KSh ${totalRevenue}`,
      icon: Wallet,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Customers",
      value: customers.length,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Low Stock Alerts",
      value: lowStock.length,
      icon: PackageSearch,
      color: "bg-red-100 text-red-600",
    },
  ];
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      {" "}
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>{" "}
      <p className="text-gray-500 mb-8">
        Welcome back{user ? `, ${user.name}` : ""}.
      </p>{" "}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {" "}
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4"
            >
              {" "}
              <div className={`p-3 rounded-full ${stat.color}`}>
                {" "}
                <Icon size={22} />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-gray-500 text-sm">{stat.label}</p>{" "}
                <p className="text-2xl font-bold">{stat.value}</p>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {" "}
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>{" "}
        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Order</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">#{order.id}</td>
                  <td>KSh {order.total}</td>
                  <td className="capitalize">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}{" "}
      </div>{" "}
    </main>
  );
}
