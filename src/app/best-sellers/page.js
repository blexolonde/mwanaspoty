"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function BestSellers() {
  const [jerseys, setJerseys] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/best-sellers")
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }, []);
  return (
    <main className="px-6 py-12">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Best Sellers</h1>{" "}
      {jerseys.length === 0 && (
        <p className="text-gray-500">No sales data yet — check back soon!</p>
      )}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {" "}
        {jerseys.map((jersey) => (
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
                className="h-40 w-full object-cover mb-4 rounded"
              />
            ) : (
              <div className="bg-gray-100 h-40 mb-4 rounded"></div>
            )}{" "}
            <h2 className="font-semibold">{jersey.team}</h2>{" "}
            <p className="text-gray-600">KSh {jersey.price}</p>{" "}
          </Link>
        ))}{" "}
      </div>{" "}
    </main>
  );
}
