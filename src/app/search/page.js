"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jerseys?search=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [query]);

  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-navy">
        Search Jerseys
      </h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by team name..."
        className="border border-line rounded-lg px-4 py-2 w-full max-w-md mb-8 outline-none focus:border-accent transition-colors"
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {results.map((jersey) => (
          <Link
            key={jersey.id}
            href={`/shop/${jersey.id}`}
            className="border border-line rounded-lg p-3 sm:p-4 text-center block hover:shadow-md hover:border-accent transition-all"
          >
            {jersey.images?.[0] ? (
              <img
                src={jersey.images?.[0]}
                alt={jersey.team}
                className="h-32 sm:h-40 w-full object-contain bg-bg-soft mb-3 sm:mb-4 rounded"
              />
            ) : (
              <div className="bg-bg-soft h-32 sm:h-40 mb-3 sm:mb-4 rounded"></div>
            )}
            <h2 className="font-semibold text-sm sm:text-base text-ink">
              {jersey.team}
            </h2>
            <p className="text-muted text-sm sm:text-base">
              KSh {jersey.price}
            </p>
          </Link>
        ))}
      </div>
      {query && results.length === 0 && (
        <p className="text-muted mt-6">No jerseys found for "{query}".</p>
      )}
    </main>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <main className="px-4 sm:px-6 py-10 sm:py-12">
          <p className="text-muted">Loading search...</p>
        </main>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
