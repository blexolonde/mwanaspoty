"use client";
import { LEAGUES } from "./leaguesData";

const LOGO_EXTENSION = ".png";

/**
 * Auto-scrolling logo marquee, right to left, continuous loop.
 * Pass `league` matching a key in leaguesData.js (e.g. "Premier League", "La Liga").
 * If that league has no clubs yet (empty array), renders nothing.
 */
export default function LeagueLogoMarquee({ league, speedSeconds = 30 }) {
  const data = LEAGUES[league];

  if (!data || !data.clubs || data.clubs.length === 0) {
    return null;
  }

  const { folder, clubs } = data;
  // duplicate the list so the loop is seamless
  const track = [...clubs, ...clubs];

  return (
    <div className="relative overflow-hidden py-4 sm:py-6 bg-bg-soft border-y border-line">
      <div
        className="flex w-max gap-8 sm:gap-12 items-center animate-marquee"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {track.map((club, i) => (
          <div
            key={`${club.slug}-${i}`}
            className="flex flex-col items-center gap-1 shrink-0"
            title={club.name}
          >
            <img
              src={`${folder}/${club.slug}${LOGO_EXTENSION}`}
              alt={club.name}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-bg-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-bg-soft to-transparent" />

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
