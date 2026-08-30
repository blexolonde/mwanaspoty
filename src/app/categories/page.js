import Link from "next/link";
import { jerseys } from "../data/jerseys";
export default function Categories() {
  const leagues = [...new Set(jerseys.map((j) => j.league))];
  return (
    <main className="px-6 py-12">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Shop by League</h1>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {" "}
        {leagues.map((league) => (
          <Link
            key={league}
            href={`/categories/${encodeURIComponent(league)}`}
            className="border rounded-lg p-8 text-center font-semibold hover:shadow-md"
          >
            {" "}
            {league}{" "}
          </Link>
        ))}{" "}
      </div>{" "}
    </main>
  );
}
