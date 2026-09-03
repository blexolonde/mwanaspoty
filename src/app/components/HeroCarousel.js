"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  {
    src: "/hero/real madrid green 26-27 models.jpg",
    alt: "Green Real Madrid jersey modeling the 26-27 kits",
    position: "object-top",
  },
  {
    src: "/hero/dortmund yellow 26-27 models.jpg",
    alt: "Yellow Dortmund jersey modeling the 26-27 kits",
    position: "object-top",
  },
  {
    src: "/hero/Arsenal blue modeling 26-27.jpg",
    alt: "Arsenal 3rd kit 26-27 modeling",
    position: "object-[center_40%]",
  },
  {
    src: "/hero/bayern away 26-27.png",
    alt: "Three Bayern muchen players modeling the 26-27 kits",
    position: "object-[center_20%]",
  },
  {
    src: "/hero/-Azam-26-27 models.jpg",
    alt: "Azam players modeling the 26-27 kits",
    position: "object-top",
  },
  {
    src: "/hero/simba red.png",
    alt: "Simaba Tanzania player modeling the 26-27 kits",
    position: "object-[center_05%]",
  },
  {
    src: "/hero/man united.png",
    alt: "Man united 3 players modeling the 26-27 kits",
    position: "object-top",
  },
  {
    src: "/hero/juventus 3rd kit models.jpg",
    alt: "Juventus player modeling the away 26-27 kits",
    position: "object-top",
  },
  {
    src: "/hero/frankie barca.jpg",
    alt: "Barcelona player modeling the 26-27 kits",
    position: "object-[center_02%]",
  },
  {
    src: "/hero/Haaland home model 26-27.jpg",
    alt: "Image of Haaland wearing a Manchester City jersey",
    position: "object-top",
  },
  {
    src: "/hero/liverpool.png",
    alt: "Van dijk wearing a liverpool jersey",
    position: "object-top",
  },
  {
    src: "/hero/chelsea team phot.png",
    alt: "Chelsea team photo modeling the 26-27 kits",
    position: "object-[center_60%]",
  },
];

const DWELL_MS = 5500;
const TRANSITION_MS = 700;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);
  const total = HERO_IMAGES.length;
  const nextIndex = (index + 1) % total;

  function goTo(target) {
    if (total <= 1) return;
    clearTimeout(timerRef.current);
    const wrapped = (target + total) % total;
    if (wrapped === index) return;
    setLeaving(true);
    setTimeout(() => {
      setIndex(wrapped);
      setLeaving(false);
    }, TRANSITION_MS);
  }

  useEffect(() => {
    if (total <= 1) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goTo(index + 1), DWELL_MS);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="grid md:grid-cols-[42%_58%] min-h-[600px]">
        {/* Image half */}
        <div className="relative order-1 md:order-2 min-h-[320px] md:min-h-0">
          {/* Next image underneath */}
          <img
            key={`next-${nextIndex}`}
            src={HERO_IMAGES[nextIndex].src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover ${HERO_IMAGES[nextIndex].position}`}
          />
          {/* Current image on top, animates out */}
          <img
            key={`current-${index}`}
            src={HERO_IMAGES[index].src}
            alt={HERO_IMAGES[index].alt}
            className={`absolute inset-0 h-full w-full object-cover ${HERO_IMAGES[index].position} transition-all ease-in-out ${
              leaving
                ? "translate-x-[18%] opacity-0 duration-700"
                : "translate-x-0 opacity-100 duration-300"
            }`}
          />
          {/* Gradient blend */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:to-navy/10" />

          {total > 1 && (
            <>
              <button
                onClick={() => goTo(index - 1)}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => goTo(index + 1)}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Text half */}
        <div className="relative order-2 md:order-1 z-10 flex flex-col justify-center px-6 py-14 md:px-12 md:py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Authentic jerseys
            <br />
            for true fans
          </h1>
          <p className="mb-8 max-w-md text-lg text-white/70">
            Football jerseys & custom apparel, made for true fans across Kenya
            and beyond.
          </p>
          <Link
            href="/shop"
            className="inline-block w-fit rounded-full bg-accent px-8 py-3 font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Buy Now
          </Link>

          {total > 1 && (
            <div className="mt-10 flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
