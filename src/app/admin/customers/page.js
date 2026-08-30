"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";

export default function AdminCustomers() {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/admin/customers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, [token]);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Customers</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="py-2">{c.name}</td>
              <td>{c.email}</td>
              <td>{c.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
