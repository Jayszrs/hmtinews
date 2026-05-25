import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { getAll, type HmtiMember, KEYS, remove, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/admin/anggota/")({
  component: AdminAnggota,
});

function AdminAnggota() {
  const [members, setMembers] = useState<HmtiMember[]>([]);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("Semua");
  const load = () => setMembers(getAll<HmtiMember>(KEYS.MEMBERS));

  useEffect(() => {
    seedInitialData();
    load();
  }, []);

  const filtered = useMemo(
    () =>
      members.filter((member) => {
        const haystack =
          `${member.name} ${member.nim} ${member.division} ${member.position}`.toLowerCase();
        return haystack.includes(query.toLowerCase()) && (year === "Semua" || member.year === year);
      }),
    [members, query, year],
  );

  const exportCsv = () => {
    const csv = [
      ["Nama", "NIM", "Angkatan", "Divisi", "Jabatan"].join(","),
      ...filtered.map((member) =>
        [member.name, member.nim, member.year, member.division, member.position]
          .map((cell) => `"${cell.replaceAll('"', '""')}"`)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "anggota-hmti.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Manajemen Anggota">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="admin-input md:w-72"
            placeholder="Cari anggota..."
          />
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="admin-select"
          >
            {["Semua", "2022", "2023", "2024", "2025"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={exportCsv} className="admin-secondary">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <Link to="/admin/anggota/tambah" className="admin-primary">
            <Plus className="h-4 w-4" /> Tambah Anggota
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-widest text-white/45">
            <tr>
              <th className="p-4">Foto</th>
              <th className="p-4">Nama</th>
              <th className="p-4">NIM</th>
              <th className="p-4">Angkatan</th>
              <th className="p-4">Divisi</th>
              <th className="p-4">Jabatan</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((member) => (
              <tr key={member.id}>
                <td className="p-4">
                  <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-hmti-green text-xs">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      member.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium">{member.name}</td>
                <td className="p-4 text-white/60">{member.nim}</td>
                <td className="p-4 text-white/60">{member.year}</td>
                <td className="p-4 text-white/60">{member.division}</td>
                <td className="p-4 text-white/60">{member.position}</td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Hapus anggota ini?")) {
                        remove(KEYS.MEMBERS, member.id);
                        load();
                      }
                    }}
                    className="admin-icon text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
