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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, [token]);

  return (
    <main className="p-4 sm:p-8 bg-bg-soft min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Customers
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left bg-bg-soft text-muted border-b border-line">
              <th className="py-3 px-4 sm:px-6">Customer</th>
              <th className="px-4 sm:px-6">Email</th>
              <th className="px-4 sm:px-6">Role</th>
              <th className="px-4 sm:px-6">Orders</th>
              <th className="px-4 sm:px-6">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-line last:border-0 hover:bg-bg-soft"
              >
                <td className="py-3 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
                      {initials(c.name)}
                    </div>
                    <span className="font-medium text-ink">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 text-muted">{c.email}</td>
                <td className="px-4 sm:px-6">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      c.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-bg-soft text-muted"
                    }`}
                  >
                    {c.role}
                  </span>
                </td>
                <td className="px-4 sm:px-6 text-ink">
                  {c._count?.orders ?? 0}
                </td>
                <td className="px-4 sm:px-6 text-muted">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="text-muted text-sm p-6">No customers yet.</p>
        )}
      </div>
    </main>
  );
}
