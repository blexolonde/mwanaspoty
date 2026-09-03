"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";

function initials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminCustomers() {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("http://192.168.100.16:5000/api/admin/customers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, [token]);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Customers</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50 text-gray-500 border-b">
              <th className="py-3 px-6">Customer</th>
              <th className="px-6">Email</th>
              <th className="px-6">Role</th>
              <th className="px-6">Orders</th>
              <th className="px-6">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                      {initials(c.name)}
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 text-gray-500">{c.email}</td>
                <td className="px-6">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      c.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {c.role}
                  </span>
                </td>
                <td className="px-6">{c._count?.orders ?? 0}</td>
                <td className="px-6 text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="text-gray-400 text-sm p-6">No customers yet.</p>
        )}
      </div>
    </main>
  );
}
