"use client";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
export default function Account() {
  const { user } = useAuth();
  if (!user) return <p className="p-6">Please log in to view your account.</p>;
  return (
    <main className="px-6 py-12 max-w-xl mx-auto">
      {" "}
      <h1 className="text-3xl font-bold mb-8">My Account</h1>{" "}
      <p className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>{" "}
      <p className="mb-8">
        <strong>Email:</strong> {user.email}
      </p>{" "}
      <Link href="/account/orders" className="underline font-semibold">
        {" "}
        View My Orders{" "}
      </Link>{" "}
    </main>
  );
}
