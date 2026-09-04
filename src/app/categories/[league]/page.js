"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LeagueLogoMarquee from "../../components/LeagueLogoMarquee";

export default function CategoryPage() {
  const { league } = useParams();
  const decodedLeague = decodeURIComponent(league);
  const [jerseys, setJerseys] = useState([]);
  const [sort, setSort] = useState("featured");
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jerseys?league=${encodeURIComponent(decodedLeague)}`,
    )
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }, [decodedLeague]);
  const sortedJerseys = [...jerseys].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });
  return (
    <main className="max-w-[1600px] mx-auto">
      {" "}
      <div className="px-4 sm:px-8 pt-8 sm:pt-12 pb-6">
        {" "}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
          {" "}
          <div>
            {" "}
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">
              {decodedLeague}
            </h1>{" "}
            <p className="text-muted text-sm">{jerseys.length} products</p>{" "}
          </div>{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-line rounded px-3 py-2 text-sm text-ink outline-none focus:border-accent transition-colors w-full sm:w-auto"
          >
            {" "}
            <option value="featured">Sort by: Featured</option>{" "}
            <option value="price-asc">Price: Low to High</option>{" "}
            <option value="price-desc">Price: High to Low</option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      <LeagueLogoMarquee league={decodedLeague} />
      <div className="px-4 sm:px-8 py-8 sm:py-12">
        {" "}
        {sortedJerseys.length === 0 && (
          <p className="text-muted">No jerseys in this league yet.</p>
        )}{" "}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
          {" "}
          {sortedJerseys.map((jersey) => (
            <div
              key={jersey.id}
              className="border border-line rounded-lg p-3 sm:p-5 flex flex-col"
            >
              {" "}
              {jersey.images?.[0] ? (
                <img
                  src={jersey.images?.[0]}
                  alt={jersey.team}
                  className="h-48 sm:h-64 md:h-80 w-full object-contain bg-bg-soft mb-4 rounded"
                />
              ) : (
                <div className="bg-bg-soft h-48 sm:h-64 md:h-80 w-full mb-4 rounded"></div>
              )}{" "}
              <p className="font-bold text-base sm:text-lg mb-1 text-navy">
                KSh {jersey.price}
              </p>{" "}
              <p className="text-sm sm:text-base text-muted mb-3">
                {jersey.team}
              </p>{" "}
              <Link
                href={`/shop/${jersey.id}`}
                className="border border-accent text-accent-dark rounded-full px-5 py-1 text-sm font-semibold text-center hover:bg-accent hover:text-white transition-colors"
              >
                {" "}
                Buy now{" "}
              </Link>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}
