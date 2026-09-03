const CLUBS = [
  { slug: "arsenal.football-logos.cc", name: "Arsenal" },
  { slug: "aston-villa.football-logos.cc", name: "Aston Villa" },
  { slug: "atletico-madrid.football-logos.cc", name: "Atlético Madrid" },
  { slug: "barcelona.football-logos.cc", name: "Barcelona" },
  { slug: "bayern-munchen.football-logos.cc", name: "Bayern München" },
  { slug: "bodo-glimt.football-logos.cc", name: "Bodø/Glimt" },
  { slug: "borussia-dortmund.football-logos.cc", name: "Borussia Dortmund" },
  { slug: "club-brugge.football-logos.cc", name: "Club Brugge" },
  { slug: "fc-porto.football-logos.cc", name: "FC Porto" },
  { slug: "fenerbahce.football-logos.cc", name: "Fenerbahçe" },
  { slug: "feyenoord.football-logos.cc", name: "Feyenoord" },
  { slug: "galatasaray.football-logos.cc", name: "Galatasaray" },
  { slug: "inter.football-logos.cc", name: "Inter Milan" },
  { slug: "lille.football-logos.cc", name: "Lille" },
  { slug: "liverpool.football-logos.cc", name: "Liverpool" },
  { slug: "manchester-city.football-logos.cc", name: "Manchester City" },
  { slug: "manchester-united.football-logos.cc", name: "Manchester United" },
  { slug: "napoli.football-logos.cc", name: "Napoli" },
  {
    slug: "paris-saint-germain.football-logos.cc",
    name: "Paris Saint-Germain",
  },
  { slug: "psv.football-logos.cc", name: "PSV Eindhoven" },
  { slug: "rb-leipzig.football-logos.cc", name: "RB Leipzig" },
  { slug: "rc-lens.football-logos.cc", name: "RC Lens" },
  { slug: "real-betis.football-logos.cc", name: "Real Betis" },
  { slug: "real-madrid.football-logos.cc", name: "Real Madrid" },
  { slug: "roma.football-logos.cc", name: "AS Roma" },
  { slug: "sporting-cp.football-logos.cc", name: "Sporting CP" },
  { slug: "vfb-stuttgart.football-logos.cc", name: "VfB Stuttgart" },
  { slug: "villarreal.football-logos.cc", name: "Villarreal" },
];

const LOGO_EXTENSION = ".png";

export default function ChampionsLeagueLogos() {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-extrabold text-orange-500 text-center mb-3">
        Champions League Merchandise
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Official club crests from Europe's biggest competition.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-x-4 gap-y-8 max-w-6xl mx-auto">
        {CLUBS.map((club) => (
          <div
            key={club.slug}
            className="flex flex-col items-center text-center"
          >
            <img
              src={`/hero/ucl-hero-logo/${club.slug}${LOGO_EXTENSION}`}
              alt={club.name}
              className="h-16 w-16 object-contain mb-2"
            />
            <p className="text-xs text-gray-600">{club.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
