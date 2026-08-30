"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Shop() {
  const [jerseys, setJerseys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jerseys")
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }, []);

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop Jerseys</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {jerseys.map((jersey) => (
          <Link
            key={jersey.id}
            href={`/shop/${jersey.id}`}
            className="border rounded-lg p-4 text-center block hover:shadow-md"
          >
            <div className="bg-gray-100 h-40 mb-4 rounded"></div>
            <h2 className="font-semibold">{jersey.team}</h2>
            <p className="text-gray-600">KSh {jersey.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}