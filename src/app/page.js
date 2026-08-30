"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function JerseySection({ title, jerseys, shopAllHref, shopAllLabel }) {
  const scrollRef = useRef(null);

  function scroll(direction) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  }

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      {jerseys.length === 0 && (
        <p className="text-center text-gray-400">No jerseys to show yet.</p>
      )}
      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow z-10 hidden md:block"
        >
          <ChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {jerseys.map((jersey) => (
            <div
              key={jersey.id}
              className="border rounded-lg p-4 text-center flex flex-col items-center min-w-[220px]"
            >
              <div className="bg-gray-100 h-40 w-full mb-4 rounded"></div>
              <p className="font-bold mb-1">KSh {jersey.price}</p>
              <p className="text-sm text-gray-700 mb-1">{jersey.team}</p>
              <p className="text-xs text-gray-400 mb-3">{jersey.league}</p>
              <Link
                href={`/shop/${jersey.id}`}
                className="border border-green-600 text-green-700 rounded-full px-5 py-1 text-sm font-semibold hover:bg-green-600 hover:text-white"
              >
                Buy now
              </Link>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow z-10 hidden md:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      {shopAllHref && (
        <div className="text-center mt-8">
          <Link
            href={shopAllHref}
            className="inline-block border border-black rounded-full px-6 py-2 font-semibold hover:bg-black hover:text-white"
          >
            {shopAllLabel}
          </Link>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [classicKits, setClassicKits] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/jerseys")
      .then((res) => res.json())
      .then((data) => setClassicKits(data.slice(0, 4)));
    fetch("http://localhost:5000/api/best-sellers")
      .then((res) => res.json())
      .then((data) => setTopSelling(data.slice(0, 4)));
  }, []);
  return (
    <main>
      {" "}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 text-white py-20 px-6 overflow-hidden">
        {" "}
        <div className="max-w-3xl">
          {" "}
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            {" "}
            AUTHENTIC JERSEYS
            <br />
            FOR TRUE FANS{" "}
          </h1>{" "}
          <p className="text-lg text-gray-300 mb-8">
            {" "}
            Football jerseys & custom apparel, made for true fans across Kenya
            and beyond.{" "}
          </p>{" "}
          <Link
            href="/shop"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full"
          >
            {" "}
            Shop Now{" "}
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <section className="text-center py-16 px-6">
        {" "}
        <h2 className="text-3xl font-extrabold text-orange-500 mb-3">
          MWANASPOTY
        </h2>{" "}
        <p className="text-gray-600 max-w-2xl mx-auto mb-2">
          {" "}
          Official-style jerseys, fast dispatch, and easy returns.{" "}
        </p>{" "}
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          {" "}
          Welcome to MwanaSpoty — your home for football jerseys and custom
          apparel. Browse top clubs from the Premier League, La Liga, and East
          African leagues, all in one place.{" "}
        </p>{" "}
        <Link
          href="/shop"
          className="inline-block border border-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white"
        >
          {" "}
          Browse All Jerseys{" "}
        </Link>{" "}
      </section>{" "}
      <JerseySection
        title="Classic Kits"
        jerseys={classicKits}
        shopAllHref="/shop"
        shopAllLabel="Shop Classic Kits"
      />{" "}
      <JerseySection
        title="Top Selling This Week"
        jerseys={topSelling}
        shopAllHref="/best-sellers"
        shopAllLabel="Shop Best Sellers"
      />{" "}
    </main>
  );
}
