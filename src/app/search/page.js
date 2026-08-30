"use client";
import { useState } from "react";
import Link from "next/link";
import { jerseys } from "../data/jerseys";
export default function Search() {
  const [query, setQuery] = useState("");
  const results = jerseys.filter((j) =>
    j.team.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="px-6 py-12">
      {" "}
      <h1 className="text-3xl font-bold mb-6">Search Jerseys</h1>{" "}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by team name..."
        className="border rounded-lg px-4 py-2 w-full max-w-md mb-8"
      />{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {" "}
        {results.map((jersey) => (
          <Link
            key={jersey.id}
            href={`/shop/${jersey.id}`}
            className="border rounded-lg p-4 text-center block hover:shadow-md"
          >
            {" "}
            <div className="bg-gray-100 h-40 mb-4 rounded"></div>{" "}
            <h2 className="font-semibold">{jersey.team}</h2>{" "}
            <p className="text-gray-600">KSh {jersey.price}</p>{" "}
          </Link>
        ))}{" "}
      </div>{" "}
      {query && results.length === 0 && (
        <p className="text-gray-500 mt-6">No jerseys found for "{query}".</p>
      )}{" "}
    </main>
  );
}
