"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categories() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/leagues")
      .then((res) => res.json())
      .then((data) => setLeagues(data));
  }, []);

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop by League</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {leagues.map((league) => (
          <Link
            key={league}
            href={`/categories/${encodeURIComponent(league)}`}
            className="border rounded-lg p-8 text-center font-semibold hover:shadow-md"
          >
            {league}
          </Link>
        ))}
      </div>
    </main>
  );
}
