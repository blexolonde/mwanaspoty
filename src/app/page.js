"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";

function JerseySection({ title, jerseys, shopAllHref, shopAllLabel }) {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(jerseys.length / itemsPerPage));

  const isHoveredRef = useRef(false);
  const manualPauseUntilRef = useRef(0);
  const resumeTimeoutRef = useRef(null);

  function scrollToPage(target) {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: target * width, behavior: "smooth" });
    }
  }

  function goToPage(newPage) {
    const wrapped = (newPage + totalPages) % totalPages;
    setPage(wrapped);
    scrollToPage(wrapped);

    manualPauseUntilRef.current = Date.now() + 5000;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      resumeTimeoutRef.current = null;
    }, 5000);
  }

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      if (isHoveredRef.current || Date.now() < manualPauseUntilRef.current)
        return;
      setPage((prev) => {
        const next = (prev + 1) % totalPages;
        scrollToPage(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      {jerseys.length === 0 && (
        <p className="text-center text-gray-400">No jerseys to show yet.</p>
      )}
      <div
        className="relative max-w-6xl mx-auto"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {jerseys.map((jersey) => (
            <div
              key={jersey.id}
              className="border rounded-lg p-4 flex flex-col min-w-[260px]"
            >
              {jersey.images?.[0] ? (
                <img
                  src={jersey.images?.[0]}
                  alt={jersey.team}
                  className="h-64 w-full object-contain bg-gray-50 mb-4 rounded"
                />
              ) : (
                <div className="bg-gray-100 h-64 w-full mb-4 rounded"></div>
              )}
              <p className="font-bold text-lg mb-1">KSh {jersey.price}</p>
              <p className="text-sm text-gray-700 mb-3">{jersey.team}</p>
              <Link
                href={`/shop/${jersey.id}`}
                className="border border-green-600 text-green-700 rounded-full px-5 py-1 text-sm font-semibold text-center hover:bg-green-600 hover:text-white"
              >
                Buy now
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => goToPage(page - 1)}
            className="text-gray-500 hover:text-black"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === page ? "w-6 bg-black" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goToPage(page + 1)}
            className="text-gray-500 hover:text-black"
          >
            <ChevronRight size={18} />
          </button>
        </div>
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
    fetch("http://localhost:5000/api/jerseys?classic=true")
      .then((res) => res.json())
      .then((data) => setClassicKits(data.slice(0, 12)));
    fetch("http://localhost:5000/api/best-sellers")
      .then((res) => res.json())
      .then((data) => setTopSelling(data.slice(0, 12)));
  }, []);

  return (
    <main>
      <HeroCarousel />

      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-extrabold text-orange-500 mb-3">
          MWANASPOTY
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-2">
          Official-style jerseys, fast dispatch, and easy returns.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Welcome to MwanaSpoty — your home for football jerseys and custom
          apparel. Browse top clubs from the Premier League, La Liga, and East
          African leagues, all in one place.
        </p>
        <Link
          href="/shop"
          className="inline-block border border-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white"
        >
          Browse All Jerseys
        </Link>
      </section>

      <JerseySection
        title="Classic Kits"
        jerseys={classicKits}
        shopAllHref="/shop"
        shopAllLabel="Shop Classic Kits"
      />
      <JerseySection
        title="Top Selling This Week"
        jerseys={topSelling}
        shopAllHref="/best-sellers"
        shopAllLabel="Shop Best Sellers"
      />
    </main>
  );
}
