"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
export default function AdminAnalytics() {
  const { token } = useAuth();
  const [bestSellers, setBestSellers] = useState([]);
  const [bestLeagues, setBestLeagues] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [segments, setSegments] = useState({ high: 0, medium: 0, low: 0 });
  const [trend, setTrend] = useState([]);
  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    fetch("http://localhost:5000/api/admin/analytics/best-sellers", { headers })
      .then((res) => res.json())
      .then(setBestSellers);
    fetch("http://localhost:5000/api/admin/analytics/best-leagues", { headers })
      .then((res) => res.json())
      .then(setBestLeagues);
    fetch("http://localhost:5000/api/admin/analytics/low-stock", { headers })
      .then((res) => res.json())
      .then(setLowStock);
    fetch("http://localhost:5000/api/admin/analytics/segments", { headers })
      .then((res) => res.json())
      .then(setSegments);
    fetch("http://localhost:5000/api/admin/analytics/sales-trend", { headers })
      .then((res) => res.json())
      .then(setTrend);
  }, [token]);
  return (
    <main className="p-8">
      {" "}
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>{" "}
      <div className="grid grid-cols-2 gap-8">
        {" "}
        <section>
          {" "}
          <h2 className="font-semibold mb-2">Best-Selling Jerseys</h2>{" "}
          {bestSellers.map((b) => (
            <div key={b.team} className="flex justify-between border-b py-1">
              {" "}
              <span>{b.team}</span>
              <span>{b.sold} sold</span>{" "}
            </div>
          ))}{" "}
        </section>{" "}
        <section>
          {" "}
          <h2 className="font-semibold mb-2">Best-Selling Leagues</h2>{" "}
          {bestLeagues.map((l) => (
            <div key={l.league} className="flex justify-between border-b py-1">
              {" "}
              <span>{l.league}</span>
              <span>{l.sold} sold</span>{" "}
            </div>
          ))}{" "}
        </section>{" "}
        <section>
          {" "}
          <h2 className="font-semibold mb-2">Customer Segments</h2>{" "}
          <p>High spenders: {segments.high}</p>{" "}
          <p>Medium spenders: {segments.medium}</p>{" "}
          <p>Low spenders: {segments.low}</p>{" "}
        </section>{" "}
        <section>
          {" "}
          <h2 className="font-semibold mb-2">Low Stock Alerts</h2>{" "}
          {lowStock.length === 0 && (
            <p className="text-gray-500">All jerseys well stocked.</p>
          )}{" "}
          {lowStock.map((j) => (
            <div
              key={j.id}
              className="flex justify-between border-b py-1 text-red-600"
            >
              {" "}
              <span>{j.team}</span>
              <span>{j.stock} left</span>{" "}
            </div>
          ))}{" "}
        </section>{" "}
        <section className="col-span-2">
          {" "}
          <h2 className="font-semibold mb-2">Sales Trend (Last 7 Days)</h2>{" "}
          {trend.length === 0 && (
            <p className="text-gray-500">No sales in the last 7 days.</p>
          )}{" "}
          {trend.map((t) => (
            <div key={t.date} className="flex justify-between border-b py-1">
              {" "}
              <span>{t.date}</span>
              <span>KSh {t.total}</span>{" "}
            </div>
          ))}{" "}
        </section>{" "}
      </div>{" "}
    </main>
  );
}
