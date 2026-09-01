"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
export default function CategoryPage() {
  const { league } = useParams();
  const decodedLeague = decodeURIComponent(league);
  const [jerseys, setJerseys] = useState([]);
  const [sort, setSort] = useState("featured");
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/jerseys?league=${encodeURIComponent(decodedLeague)}`,
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
    <main className="px-8 py-12 max-w-[1600px] mx-auto">
      {" "}
      <div className="flex justify-between items-center mb-8">
        {" "}
        <div>
          {" "}
          <h1 className="text-3xl font-bold">{decodedLeague}</h1>{" "}
          <p className="text-gray-500 text-sm">
            {jerseys.length} products
          </p>{" "}
        </div>{" "}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          {" "}
          <option value="featured">Sort by: Featured</option>{" "}
          <option value="price-asc">Price: Low to High</option>{" "}
          <option value="price-desc">Price: High to Low</option>{" "}
        </select>{" "}
      </div>{" "}
      {sortedJerseys.length === 0 && (
        <p className="text-gray-500">No jerseys in this league yet.</p>
      )}{" "}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {" "}
        {sortedJerseys.map((jersey) => (
          <div key={jersey.id} className="border rounded-lg p-5 flex flex-col">
            {" "}
            {jersey.images?.[0] ? (
              <img
                src={jersey.images?.[0]}
                alt={jersey.team}
                className="h-80 w-full object-contain bg-gray-50 mb-4 rounded"
              />
            ) : (
              <div className="bg-gray-100 h-80 w-full mb-4 rounded"></div>
            )}{" "}
            <p className="font-bold text-lg mb-1">KSh {jersey.price}</p>{" "}
            <p className="text-base text-gray-700 mb-3">{jersey.team}</p>{" "}
            <Link
              href={`/shop/${jersey.id}`}
              className="border border-green-600 text-green-700 rounded-full px-5 py-1 text-sm font-semibold text-center hover:bg-green-600 hover:text-white"
            >
              {" "}
              Buy now{" "}
            </Link>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </main>
  );
}
