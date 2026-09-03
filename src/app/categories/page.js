"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categories() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    fetch("http://192.168.100.16:5000/api/leagues")
      .then((res) => res.json())
      .then((data) => setLeagues(data));
  }, []);

  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Shop by League
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {leagues.map((league) => (
          <Link
            key={league}
            href={`/categories/${encodeURIComponent(league)}`}
            className="border border-line rounded-lg p-6 sm:p-8 text-center font-semibold text-ink hover:shadow-md hover:border-accent transition-all"
          >
            {league}
          </Link>
        ))}
      </div>
    </main>
  );
}
