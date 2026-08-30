"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return <p className="p-6">Please log in as an admin.</p>;
  if (user.role !== "admin") {
    return <p className="p-6">Access denied. Admins only.</p>;
  }
  return (
    <div className="flex">
      {" "}
      <aside className="w-48 bg-gray-100 min-h-screen p-4">
        {" "}
        <h2 className="font-bold mb-4">Admin</h2>{" "}
        <nav className="flex flex-col gap-2">
          {" "}
          <Link href="/admin">Dashboard</Link>{" "}
          <Link href="/admin/products">Products</Link>{" "}
          <Link href="/admin/orders">Orders</Link>{" "}
          <Link href="/admin/customers">Customers</Link>{" "}
        </nav>{" "}
      </aside>{" "}
      <div className="flex-1">{children}</div>{" "}
    </div>
  );
}
