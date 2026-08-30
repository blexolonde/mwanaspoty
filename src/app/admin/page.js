"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
export default function AdminDashboard() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
    fetch("http://localhost:5000/api/admin/customers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, [token]);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  return (
    <main className="p-8">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>{" "}
      <div className="grid grid-cols-3 gap-6">
        {" "}
        <div className="border rounded-lg p-6">
          {" "}
          <p className="text-gray-500">Total Orders</p>{" "}
          <p className="text-3xl font-bold">{orders.length}</p>{" "}
        </div>{" "}
        <div className="border rounded-lg p-6">
          {" "}
          <p className="text-gray-500">Total Revenue</p>{" "}
          <p className="text-3xl font-bold">KSh {totalRevenue}</p>{" "}
        </div>{" "}
        <div className="border rounded-lg p-6">
          {" "}
          <p className="text-gray-500">Total Customers</p>{" "}
          <p className="text-3xl font-bold">{customers.length}</p>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}
