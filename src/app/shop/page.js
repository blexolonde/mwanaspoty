"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Shop() {
  const [jerseys, setJerseys] = useState([]);

  useEffect(() => {
    fetch("http://192.168.100.16:5000/api/jerseys")
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }, []);

  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Shop Jerseys
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {jerseys.map((jersey) => (
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
    </main>
  );
}
