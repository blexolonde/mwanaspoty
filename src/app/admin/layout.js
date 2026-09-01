"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Users,
  BarChart3,
} from "lucide-react";
const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Boxes },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];
export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();
  if (!user) return <p className="p-6">Please log in as an admin.</p>;
  if (user.role !== "admin") {
    return <p className="p-6">Access denied. Admins only.</p>;
  }
  return (
    <div className="flex">
      {" "}
      <aside className="w-16 bg-gray-100 min-h-screen flex flex-col items-center py-6 gap-2">
        {" "}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`p-3 rounded-lg hover:bg-gray-200 ${active ? "bg-black text-white hover:bg-black" : "text-gray-600"}`}
            >
              {" "}
              <Icon size={20} />{" "}
            </Link>
          );
        })}{" "}
      </aside>{" "}
      <div className="flex-1">{children}</div>{" "}
    </div>
  );
}
