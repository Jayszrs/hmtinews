import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { getAll, KEYS, remove, save, type NewsPost, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/admin/berita/")({
  component: AdminBerita,
});

function AdminBerita() {
  const [rows, setRows] = useState<NewsPost[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  const load = () => setRows(getAll<NewsPost>(KEYS.BERITA));
  useEffect(() => {
    seedInitialData();
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((item) => {
      const matchText = item.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === "Semua" || item.category === category;
      const matchStatus = status === "Semua" || item.status === status;
      return matchText && matchCategory && matchStatus;
    });
  }, [category, query, rows, status]);

  return (
    <AdminLayout title="Manajemen Berita">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3">
            <Search className="h-4 w-4 text-hmti-gold" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari berita..."
              className="bg-transparent text-sm outline-none placeholder:text-white/35"
            />
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="admin-select"
          >
            {["Semua", "Akademik", "Organisasi", "Event", "Pengumuman", "Lainnya"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="admin-select"
          >
            {["Semua", "Draft", "Publish"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <Link to="/admin/berita/tambah" className="admin-primary">
          <Plus className="h-4 w-4" /> Tambah Berita
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-widest text-white/45">
            <tr>
              <th className="p-4">Thumbnail</th>
              <th className="p-4">Judul</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Penulis</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Status</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.slice(0, 10).map((item) => (
              <tr key={item.id} className="bg-white/[0.02]">
                <td className="p-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-12 w-20 rounded object-cover"
                  />
                </td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4 text-white/60">{item.category}</td>
                <td className="p-4 text-white/60">{item.author}</td>
                <td className="p-4 text-white/60">{item.date}</td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => {
                      save(KEYS.BERITA, {
                        ...item,
                        status: item.status === "Publish" ? "Draft" : "Publish",
                      });
                      load();
                    }}
                    className="rounded-full border border-hmti-gold/30 px-3 py-1 text-xs text-hmti-gold"
                  >
                    {item.status}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      to="/admin/berita/edit/$id"
                      params={{ id: item.id }}
                      className="admin-icon"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Hapus berita ini?")) {
                          remove(KEYS.BERITA, item.id);
                          load();
                        }
                      }}
                      className="admin-icon text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
