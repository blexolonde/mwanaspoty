"use client";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
export default function Account() {
  const { user } = useAuth();
  if (!user)
    return (
      <p className="p-6 text-muted">Please log in to view your account.</p>
    );
  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12 max-w-xl mx-auto">
      {" "}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        My Account
      </h1>{" "}
      <p className="mb-2 text-ink">
        <strong>Name:</strong> {user.name}
      </p>{" "}
      <p className="mb-8 text-ink">
        <strong>Email:</strong> {user.email}
      </p>{" "}
      <Link
        href="/account/orders"
        className="underline font-semibold text-accent-dark hover:text-accent"
      >
        {" "}
        View My Orders{" "}
      </Link>{" "}
    </main>
  );
}
