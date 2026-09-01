"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";

export default function AdminProducts() {
  const { token } = useAuth();
  const [jerseys, setJerseys] = useState([]);
  const [team, setTeam] = useState("");
  const [price, setPrice] = useState("");
  const [league, setLeague] = useState("");
  const [isClassic, setIsClassic] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  function loadJerseys() {
    fetch("http://localhost:5000/api/jerseys")
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }

  useEffect(() => {
    loadJerseys();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setUploading(true);
    let imageUrls = [];
    if (imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("images", file));
      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const uploadData = await uploadRes.json();
      imageUrls = uploadData.urls;
    }
    await fetch("http://localhost:5000/api/jerseys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        team,
        price: Number(price),
        league,
        isClassic,
        images: imageUrls,
      }),
    });
    setTeam("");
    setPrice("");
    setLeague("");
    setIsClassic(false);
    setImageFiles([]);
    setUploading(false);
    loadJerseys();
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:5000/api/jerseys/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadJerseys();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <form onSubmit={handleAdd} className="flex gap-4 mb-8">
        <input
          placeholder="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          placeholder="League"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(Array.from(e.target.files))}
          className="text-sm"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isClassic}
            onChange={(e) => setIsClassic(e.target.checked)}
          />
          Classic/Vintage Kit
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Add Jersey"}
        </button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Team</th>
            <th>Price</th>
            <th>League</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jerseys.map((jersey) => (
            <tr key={jersey.id} className="border-b">
              <td className="py-2">{jersey.team}</td>
              <td>KSh {jersey.price}</td>
              <td>{jersey.league}</td>
              <td>
                <button
                  onClick={() => handleDelete(jersey.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}