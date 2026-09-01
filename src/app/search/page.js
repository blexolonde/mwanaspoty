"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default function Search() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/jerseys?search=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [query]);
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
            {jersey.images?.[0] ? (
              <img
                src={jersey.images?.[0]}
                alt={jersey.team}
                className="h-40 w-full object-contain bg-gray-50 mb-4 rounded"
              />
            ) : (
              <div className="bg-gray-100 h-40 mb-4 rounded"></div>
            )}{" "}
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
