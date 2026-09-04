"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch(
      "`${process.env.NEXT_PUBLIC_API_URL}/api/register`",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    router.push("/login");
  }
  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12 max-w-md mx-auto">
      {" "}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Register
      </h1>{" "}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {" "}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-line rounded-lg px-4 py-2 outline-none focus:border-accent transition-colors"
          required
        />{" "}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-line rounded-lg px-4 py-2 outline-none focus:border-accent transition-colors"
          required
        />{" "}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-line rounded-lg px-4 py-2 outline-none focus:border-accent transition-colors"
          required
        />{" "}
        {error && <p className="text-red-600 text-sm">{error}</p>}{" "}
        <button
          type="submit"
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
        >
          {" "}
          Register{" "}
        </button>{" "}
      </form>{" "}
    </main>
  );
}
