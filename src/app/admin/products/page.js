"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { Trash2, Pencil, X } from "lucide-react";

export default function AdminProducts() {
  const { token } = useAuth();
  const [jerseys, setJerseys] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [team, setTeam] = useState("");
  const [price, setPrice] = useState("");
  const [league, setLeague] = useState("");
  const [stock, setStock] = useState("");
  const [isClassic, setIsClassic] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  function loadJerseys() {
    fetch("http://192.168.100.16:5000/api/jerseys")
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }

  useEffect(() => {
    loadJerseys();
  }, []);

  function resetForm() {
    setEditingId(null);
    setTeam("");
    setPrice("");
    setLeague("");
    setStock("");
    setIsClassic(false);
    setExistingImages([]);
    setImageFiles([]);
  }

  function startEdit(jersey) {
    setEditingId(jersey.id);
    setTeam(jersey.team);
    setPrice(String(jersey.price));
    setLeague(jersey.league);
    setStock(String(jersey.stock));
    setIsClassic(jersey.isClassic);
    setExistingImages(jersey.images || []);
    setImageFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let imageUrls = existingImages;

    if (imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("images", file));

      const uploadRes = await fetch("http://192.168.100.16:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const uploadData = await uploadRes.json();
      imageUrls = uploadData.urls;
    }

    const body = JSON.stringify({
      team,
      price: Number(price),
      league,
      isClassic,
      stock: stock === "" ? 20 : Number(stock),
      images: imageUrls,
    });

    if (editingId) {
      await fetch(`http://192.168.100.16:5000/api/jerseys/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
    } else {
      await fetch("http://192.168.100.16:5000/api/jerseys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
    }

    resetForm();
    setUploading(false);
    loadJerseys();
  }

  async function handleDelete(id) {
    await fetch(`http://192.168.100.16:5000/api/jerseys/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (editingId === id) resetForm();
    loadJerseys();
  }

  return (
    <main className="p-4 sm:p-8 bg-bg-soft min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-navy">
        Products
      </h1>

      {/* Add / Edit form */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-ink">
            {editingId ? `Edit Jersey #${editingId}` : "Add New Jersey"}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-1 text-sm text-muted hover:text-navy"
            >
              <X size={16} />
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div>
            <label className="text-xs text-muted mb-1 block">Team</label>
            <input
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="border border-line rounded-lg px-3 py-2 w-full outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1 block">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-line rounded-lg px-3 py-2 w-full outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1 block">League</label>
            <input
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              className="border border-line rounded-lg px-3 py-2 w-full outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1 block">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="20"
              className="border border-line rounded-lg px-3 py-2 w-full outline-none focus:border-accent transition-colors"
            />
          </div>

          {editingId && existingImages.length > 0 && (
            <div className="sm:col-span-2 md:col-span-4">
              <label className="text-xs text-muted mb-1 block">
                Current Images (uploading new ones below will replace these)
              </label>
              <div className="flex gap-2 flex-wrap">
                {existingImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-14 w-14 object-cover rounded border border-line"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="sm:col-span-2 md:col-span-3">
            <label className="text-xs text-muted mb-1 block">
              {editingId
                ? "Replace Images (optional, up to 5)"
                : "Images (up to 5)"}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              className="text-sm w-full border border-line rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={isClassic}
                onChange={(e) => setIsClassic(e.target.checked)}
                className="accent-accent"
              />
              Classic/Vintage Kit
            </label>
          </div>

          <div className="sm:col-span-2 md:col-span-4">
            <button
              type="submit"
              disabled={uploading}
              className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              {uploading
                ? "Saving..."
                : editingId
                  ? "Update Jersey"
                  : "Add Jersey"}
            </button>
          </div>
        </form>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left bg-bg-soft text-muted border-b border-line">
              <th className="py-3 px-4 sm:px-6">Photo</th>
              <th className="px-4 sm:px-6">Team</th>
              <th className="px-4 sm:px-6">Price</th>
              <th className="px-4 sm:px-6">League</th>
              <th className="px-4 sm:px-6">Stock</th>
              <th className="px-4 sm:px-6">Tag</th>
              <th className="px-4 sm:px-6"></th>
            </tr>
          </thead>
          <tbody>
            {jerseys.map((jersey) => (
              <tr
                key={jersey.id}
                className={`border-b border-line last:border-0 hover:bg-bg-soft ${
                  editingId === jersey.id ? "bg-accent/10" : ""
                }`}
              >
                <td className="py-3 px-4 sm:px-6">
                  {jersey.images?.[0] ? (
                    <img
                      src={jersey.images[0]}
                      alt={jersey.team}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-bg-soft rounded"></div>
                  )}
                </td>
                <td className="px-4 sm:px-6 font-medium text-ink">
                  {jersey.team}
                </td>
                <td className="px-4 sm:px-6 text-ink">
                  KSh {jersey.price}
                </td>
                <td className="px-4 sm:px-6 text-muted">{jersey.league}</td>
                <td className="px-4 sm:px-6 text-muted">{jersey.stock}</td>
                <td className="px-4 sm:px-6">
                  {jersey.isClassic && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">
                      Classic
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(jersey)}
                      className="text-accent-dark hover:text-accent"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(jersey.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}