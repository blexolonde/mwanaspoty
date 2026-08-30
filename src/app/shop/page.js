import Link from "next/link";
import { jerseys } from "../data/jerseys";

export default function Shop() {
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
