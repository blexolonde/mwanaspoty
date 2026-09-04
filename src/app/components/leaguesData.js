// Central place to register each league's clubs + logo folder.
// To add a new league: add a new key below with its folder path and club list.
// The folder should match wherever you placed that league's logos in /public.

export const LEAGUES = {
  "Premier League": {
    folder: "/hero/Epl-logos",
    clubs: [
      { slug: "arsenal.football-logos.cc", name: "Arsenal" },
      { slug: "aston-villa.football-logos.cc", name: "Aston Villa" },
      { slug: "bournemouth.football-logos.cc", name: "Bournemouth" },
      { slug: "brentford.football-logos.cc", name: "Brentford" },
      { slug: "brighton.football-logos.cc", name: "Brighton" },
      { slug: "chelsea.football-logos.cc", name: "Chelsea" },
      { slug: "coventry-city.football-logos.cc", name: "Coventry City" },
      { slug: "crystal-palace.football-logos.cc", name: "Crystal Palace" },
      { slug: "everton.football-logos.cc", name: "Everton" },
      { slug: "fulham.football-logos.cc", name: "Fulham" },
      { slug: "hull-city.football-logos.cc", name: "Hull City" },
      { slug: "ipswich.football-logos.cc", name: "Ipswich Town" },
      { slug: "leeds-united.football-logos.cc", name: "Leeds United" },
      { slug: "liverpool.football-logos.cc", name: "Liverpool" },
      { slug: "manchester-city.football-logos.cc", name: "Manchester City" },
      {
        slug: "manchester-united.football-logos.cc",
        name: "Manchester United",
      },
      { slug: "newcastle.football-logos.cc", name: "Newcastle United" },
      {
        slug: "nottingham-forest.football-logos.cc",
        name: "Nottingham Forest",
      },
      { slug: "sunderland.football-logos.cc", name: "Sunderland" },
      { slug: "tottenham.football-logos.cc", name: "Tottenham Hotspur" },
    ],
  },

  "La Liga": {
    folder: "/hero/la-liga-logos",
    clubs: [
      { slug: "athletic-club.football-logos.cc", name: "Athletic Club" },
      { slug: "atletico-madrid.football-logos.cc", name: "Atlético Madrid" },
      { slug: "barcelona.football-logos.cc", name: "Barcelona" },
      { slug: "celta.football-logos.cc", name: "Celta Vigo" },
      { slug: "deportivo.football-logos.cc", name: "Alavés" },
      {
        slug: "deportivo-la-coruna.football-logos.cc",
        name: "Deportivo La Coruña",
      },
      { slug: "elche.football-logos.cc", name: "Elche" },
      { slug: "espanyol.football-logos.cc", name: "Espanyol" },
      { slug: "getafe.football-logos.cc", name: "Getafe" },
      { slug: "levante.football-logos.cc", name: "Levante" },
      { slug: "malaga.football-logos.cc", name: "Málaga" },
      { slug: "osasuna.football-logos.cc", name: "Osasuna" },
      { slug: "racing.football-logos.cc", name: "Racing Santander" },
      { slug: "rayo-vallecano.football-logos.cc", name: "Rayo Vallecano" },
      { slug: "real-betis.football-logos.cc", name: "Real Betis" },
      { slug: "real-madrid.football-logos.cc", name: "Real Madrid" },
      { slug: "real-sociedad.football-logos.cc", name: "Real Sociedad" },
      { slug: "sevilla.football-logos.cc", name: "Sevilla" },
      { slug: "valencia.football-logos.cc", name: "Valencia" },
      { slug: "villarreal.football-logos.cc", name: "Villarreal" },
    ],
  },

  Bundesliga: {
    folder: "/hero/Bundesliga-logos",
    clubs: [
      { slug: "augsburg.football-logos.cc", name: "Augsburg" },
      { slug: "bayer-leverkusen.football-logos.cc", name: "Bayer Leverkusen" },
      { slug: "bayern-munchen.football-logos.cc", name: "Bayern München" },
      {
        slug: "borussia-dortmund.football-logos.cc",
        name: "Borussia Dortmund",
      },
      {
        slug: "borussia-monchengladbach.football-logos.cc",
        name: "Borussia Mönchengladbach",
      },
      {
        slug: "eintracht-frankfurt.football-logos.cc",
        name: "Eintracht Frankfurt",
      },
      { slug: "freiburg.football-logos.cc", name: "Freiburg" },
      { slug: "hamburger-sv.football-logos.cc", name: "Hamburger SV" },
      { slug: "hoffenheim.football-logos.cc", name: "Hoffenheim" },
      { slug: "koln.football-logos.cc", name: "Köln" },
      { slug: "mainz-05.football-logos.cc", name: "Mainz 05" },
      { slug: "paderborn.football-logos.cc", name: "Paderborn" },
      { slug: "rb-leipzig.football-logos.cc", name: "RB Leipzig" },
      { slug: "schalke-04.football-logos.cc", name: "Schalke 04" },
      { slug: "sv-elversberg.football-logos.cc", name: "SV Elversberg" },
      { slug: "union-berlin.football-logos.cc", name: "Union Berlin" },
      { slug: "vfb-stuttgart.football-logos.cc", name: "VfB Stuttgart" },
      { slug: "werder-bremen.football-logos.cc", name: "Werder Bremen" },
    ],
  },

  "Serie A": {
    folder: "/hero/Serie-A-logos",
    clubs: [
      { slug: "atalanta.football-logos.cc", name: "Atalanta" },
      { slug: "bologna.football-logos.cc", name: "Bologna" },
      { slug: "cagliari.football-logos.cc", name: "Cagliari" },
      { slug: "como-1907.football-logos.cc", name: "Como 1907" },
      { slug: "fiorentina.football-logos.cc", name: "Fiorentina" },
      { slug: "frosinone.football-logos.cc", name: "Frosinone" },
      { slug: "genoa.football-logos.cc", name: "Genoa" },
      { slug: "inter.football-logos.cc", name: "Inter Milan" },
      { slug: "juventus.football-logos.cc", name: "Juventus" },
      { slug: "lazio.football-logos.cc", name: "Lazio" },
      { slug: "lecce.football-logos.cc", name: "Lecce" },
      { slug: "milan.football-logos.cc", name: "AC Milan" },
      { slug: "monza.football-logos.cc", name: "Monza" },
      { slug: "napoli.football-logos.cc", name: "Napoli" },
      { slug: "parma.football-logos.cc", name: "Parma" },
      { slug: "roma.football-logos.cc", name: "AS Roma" },
      { slug: "sassuolo.football-logos.cc", name: "Sassuolo" },
      { slug: "torino.football-logos.cc", name: "Torino" },
      { slug: "udinese.football-logos.cc", name: "Udinese" },
      { slug: "venezia.football-logos.cc", name: "Venezia" },
    ],
  },

  // Fill these in the same shape once you've added each league's logo folder
  // to /public/hero/. Example once ready:
  //
  // "Ligue 1": {
  //   folder: "/hero/Ligue1-logos",
  //   clubs: [
  //     { slug: "psg.football-logos.cc", name: "Paris Saint-Germain" },
  //     ...
  //   ],
  // },

  "Ligue 1": { folder: "/hero/Ligue1-logos", clubs: [] },
  "Liga NOS": { folder: "/hero/LigaNOS-logos", clubs: [] },
  Eredivisie: { folder: "/hero/Eredivisie-logos", clubs: [] },
  "South African Premiership": {
    folder: "/hero/SAPremiership-logos",
    clubs: [],
  },
  KPL: { folder: "/hero/KPL-logos", clubs: [] },
  "Tanzania League": { folder: "/hero/TanzaniaLeague-logos", clubs: [] },
  "Uganda League": { folder: "/hero/UgandaLeague-logos", clubs: [] },
};
