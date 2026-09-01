"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { Trash2 } from "lucide-react";

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
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="font-semibold mb-4">Add New Jersey</h2>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Team</label>
            <input
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">League</label>
            <input
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">
              Images (up to 5)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              className="text-sm w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isClassic}
                onChange={(e) => setIsClassic(e.target.checked)}
              />
              Classic/Vintage Kit
            </label>
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={uploading}
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Add Jersey"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50 text-gray-500 border-b">
              <th className="py-3 px-6">Photo</th>
              <th className="px-6">Team</th>
              <th className="px-6">Price</th>
              <th className="px-6">League</th>
              <th className="px-6">Stock</th>
              <th className="px-6">Tag</th>
              <th className="px-6"></th>
            </tr>
          </thead>
          <tbody>
            {jerseys.map((jersey) => (
              <tr
                key={jersey.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 px-6">
                  {jersey.images?.[0] ? (
                    <img
                      src={jersey.images[0]}
                      alt={jersey.team}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-100 rounded"></div>
                  )}
                </td>
                <td className="px-6 font-medium">{jersey.team}</td>
                <td className="px-6">KSh {jersey.price}</td>
                <td className="px-6 text-gray-500">{jersey.league}</td>
                <td className="px-6 text-gray-500">{jersey.stock}</td>
                <td className="px-6">
                  {jersey.isClassic && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">
                      Classic
                    </span>
                  )}
                </td>
                <td className="px-6">
                  <button
                    onClick={() => handleDelete(jersey.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
