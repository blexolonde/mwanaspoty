"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    login(data.user, data.token);
    router.push("/");
  }
  return (
    <main className="px-6 py-12 max-w-md mx-auto">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Login</h1>{" "}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {" "}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-4 py-2"
          required
        />{" "}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-4 py-2"
          required
        />{" "}
        {error && <p className="text-red-600 text-sm">{error}</p>}{" "}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
        >
          {" "}
          Login{" "}
        </button>{" "}
      </form>{" "}
    </main>
  );
}
