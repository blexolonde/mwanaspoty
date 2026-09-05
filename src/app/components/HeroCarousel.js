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
    src: "/hero/Bayern away 26-27.png",
    alt: "Three Bayern München players modeling the 26-27 kits",
    position: "object-[center_20%]",
  },
  {
    src: "/hero/Azam-26-27 models.png",
    alt: "Azam players modeling the 26-27 kits",
    position: "object-top",
  },
  {
    src: "/hero/simba red.png",
    alt: "Simba Tanzania player modeling the 26-27 kits",
    position: "object-[center_05%]",
  },
  {
    src: "/hero/man united.png",
    alt: "Manchester United players modeling the 26-27 kits",
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
    src: "/hero/ajax team.jpg",
    alt: "Ajax players modeling the 26-27 away kits",
    position: "object-[center_02%]",
  },
  {
    src: "/hero/Afc-leopard models.png",
    alt: "Afc-leopard players modeling the 26-27 kits",
    position: "object-[center_02%]",
  },
  {
    src: "/hero/Haaland home model 26-27.jpg",
    alt: "Haaland wearing a Manchester City jersey",
    position: "object-top",
  },
  {
    src: "/hero/liverpool.png",
    alt: "Van Dijk wearing a Liverpool jersey",
    position: "object-top",
  },
  {
    src: "/hero/chelsea team phot.png",
    alt: "Chelsea team photo modeling the 26-27 kits",
    position: "object-[center_60%]",
  },
  {
    src: "/hero/Yanga home 26-27 models.jpg",
    alt: "Yanga home models the 26-27 kits",
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

  const imageClass = (pos) =>
    `absolute inset-0 h-full w-full object-cover ${pos}`;

  const TextBlock = ({ dotClass, containerClass, headingClass, pClass }) => (
    <div className={containerClass}>
      <h1 className={headingClass}>
        Authentic jerseys
        <br />
        for true fans
      </h1>
      <p className={pClass}>
        Football jerseys & custom apparel, made for true fans across Kenya and
        beyond.
      </p>
      <Link
        href="/shop"
        className="inline-block w-fit rounded-full bg-accent px-7 sm:px-8 py-3 font-semibold text-white hover:bg-accent-dark transition-colors"
      >
        Buy Now
      </Link>

      {total > 1 && (
        <div className="mt-8 sm:mt-10 flex gap-2 flex-wrap">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : dotClass
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const NavButtons = ({ zClass }) =>
    total > 1 && (
      <>
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className={`absolute left-3 top-1/2 ${zClass} flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className={`absolute right-3 top-1/2 ${zClass} flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50`}
        >
          <ChevronRight size={18} />
        </button>
      </>
    );

  return (
    <section className="relative bg-navy text-white overflow-hidden">
      {/* ---------- MOBILE / TABLET (below md): full-bleed image, text overlaid ---------- */}
      <div className="md:hidden relative min-h-[520px] sm:min-h-[600px]">
        <img
          key={`m-next-${nextIndex}`}
          src={HERO_IMAGES[nextIndex].src}
          alt=""
          aria-hidden="true"
          className={imageClass(HERO_IMAGES[nextIndex].position)}
        />
        <img
          key={`m-current-${index}`}
          src={HERO_IMAGES[index].src}
          alt={HERO_IMAGES[index].alt}
          className={`${imageClass(HERO_IMAGES[index].position)} transition-all ease-in-out ${
            leaving
              ? "translate-x-[18%] opacity-0 duration-700"
              : "translate-x-0 opacity-100 duration-300"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/20 to-transparent" />

        <NavButtons zClass="z-20" />

        <TextBlock
          dotClass="w-2 bg-white/40"
          containerClass="relative z-10 flex h-full min-h-[520px] sm:min-h-[600px] flex-col justify-end px-6 py-10 sm:px-10 sm:py-14 max-w-2xl"
          headingClass="mb-4 text-3xl sm:text-4xl font-extrabold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          pClass="mb-6 sm:mb-8 max-w-md text-base sm:text-lg text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* ---------- DESKTOP (md and up): original side-by-side layout ---------- */}
      <div className="hidden md:grid md:grid-cols-[42%_58%] min-h-[600px]">
        <div className="relative order-2 min-h-0">
          <img
            key={`d-next-${nextIndex}`}
            src={HERO_IMAGES[nextIndex].src}
            alt=""
            aria-hidden="true"
            className={imageClass(HERO_IMAGES[nextIndex].position)}
          />
          <img
            key={`d-current-${index}`}
            src={HERO_IMAGES[index].src}
            alt={HERO_IMAGES[index].alt}
            className={`${imageClass(HERO_IMAGES[index].position)} transition-all ease-in-out ${
              leaving
                ? "translate-x-[18%] opacity-0 duration-700"
                : "translate-x-0 opacity-100 duration-300"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent to-navy/10" />

          <NavButtons zClass="z-10" />
        </div>

        <TextBlock
          dotClass="w-2 bg-white/30"
          containerClass="relative order-1 z-10 flex flex-col justify-center px-12 py-16"
          headingClass="mb-4 text-5xl font-extrabold leading-tight"
          pClass="mb-8 max-w-md text-lg text-white/70"
        />
      </div>
    </section>
  );
}
