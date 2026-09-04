"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const SEGMENT_COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold mb-4 text-navy">{title}</h2>
      {children}
    </div>
  );
}

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

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/best-sellers`,
      { headers },
    )
      .then((res) => res.json())
      .then(setBestSellers);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/best-leagues`,
      { headers },
    )
      .then((res) => res.json())
      .then(setBestLeagues);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/low-stock`, {
      headers,
    })
      .then((res) => res.json())
      .then(setLowStock);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/segments`, {
      headers,
    })
      .then((res) => res.json())
      .then(setSegments);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/sales-trend`,
      { headers },
    )
      .then((res) => res.json())
      .then(setTrend);
  }, [token]);

  const segmentData = [
    { name: "High Spenders", value: segments.high },
    { name: "Medium Spenders", value: segments.medium },
    { name: "Low Spenders", value: segments.low },
  ];

  return (
    <main className="p-4 sm:p-8 bg-bg-soft min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Best-Selling Jerseys">
          {bestSellers.length === 0 ? (
            <p className="text-muted text-sm">No sales data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={bestSellers}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="team" width={120} />
                <Tooltip />
                <Bar dataKey="sold" fill="#123524" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Best-Selling Leagues">
          {bestLeagues.length === 0 ? (
            <p className="text-muted text-sm">No sales data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={bestLeagues}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="league" width={120} />
                <Tooltip />
                <Bar dataKey="sold" fill="#D4A72C" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Customer Segments">
          {segments.high + segments.medium + segments.low === 0 ? (
            <p className="text-muted text-sm">No customer spend data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={segmentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {segmentData.map((entry, i) => (
                    <Cell key={entry.name} fill={SEGMENT_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Low Stock Alerts">
          {lowStock.length === 0 ? (
            <p className="text-muted text-sm">All jerseys well stocked.</p>
          ) : (
            <div className="space-y-2">
              {lowStock.map((j) => (
                <div
                  key={j.id}
                  className="flex justify-between text-sm border-b border-line pb-2 text-ink"
                >
                  <span>{j.team}</span>
                  <span className="text-red-600 font-semibold">
                    {j.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Sales Trend (Last 7 Days)">
          {trend.length === 0 ? (
            <p className="text-muted text-sm">No sales in the last 7 days.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#D4A72C"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </main>
  );
}
