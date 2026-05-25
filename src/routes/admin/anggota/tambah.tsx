import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Printer, Save } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUpload } from "@/components/ImageUpload";
import { MemberCard } from "@/components/MemberCard";
import { createMember, KEYS, save, type HmtiMember } from "@/lib/storage";

export const Route = createFileRoute("/admin/anggota/tambah")({
  component: TambahAnggota,
});

function TambahAnggota() {
  const router = useRouter();
  const [member, setMember] = useState<HmtiMember>(
    createMember({ name: "", nim: "", year: "2024", division: "Teknologi Informasi" }),
  );

  const update = (patch: Partial<HmtiMember>) => setMember((value) => ({ ...value, ...patch }));

  const submit = () => {
    if (!member.name.trim() || !member.nim.trim()) {
      toast.error("Nama dan NIM wajib diisi.");
      return;
    }
    save(KEYS.MEMBERS, member);
    toast.success("Anggota disimpan.");
    void router.navigate({ to: "/admin/anggota" });
  };

  const downloadPng = async () => {
    const win = window as typeof window & {
      html2canvas?: (node: HTMLElement) => Promise<HTMLCanvasElement>;
    };
    if (!win.html2canvas) {
      await new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    }
    const node = document.getElementById("member-card-preview");
    if (!node || !win.html2canvas) return;
    const canvas = await win.html2canvas(node);
    const link = document.createElement("a");
    link.download = `${member.cardNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AdminLayout title="Tambah Anggota">
      <Toaster richColors position="top-right" />
      <div className="grid gap-6 lg:grid-cols-[1fr_440px]">
        <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 md:grid-cols-2">
          <Field
            label="Nama Lengkap"
            value={member.name}
            onChange={(value) => update({ name: value })}
          />
          <Field
            label="NIM / Nomor Induk"
            value={member.nim}
            onChange={(value) => update({ nim: value })}
          />
          <label>
            <span className="mb-2 block text-sm text-white/70">Program Studi</span>
            <select
              value={member.program}
              onChange={(event) => update({ program: event.target.value })}
              className="admin-input"
            >
              {["Teknik Informatika", "Sistem Informasi", "Teknik Komputer"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <Field
            label="Angkatan"
            value={member.year}
            onChange={(value) => update({ year: value })}
          />
          <label>
            <span className="mb-2 block text-sm text-white/70">Divisi</span>
            <select
              value={member.division}
              onChange={(event) => update({ division: event.target.value })}
              className="admin-input"
            >
              {[
                "Akademik",
                "Minat Bakat",
                "Sosial",
                "Hubungan Masyarakat",
                "Kewirausahaan",
                "Teknologi Informasi",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <Field
            label="Jabatan"
            value={member.position}
            onChange={(value) => update({ position: value })}
          />
          <Field
            label="Email"
            value={member.email}
            onChange={(value) => update({ email: value })}
          />
          <Field
            label="No HP"
            value={member.phone}
            onChange={(value) => update({ phone: value })}
          />
          <label>
            <span className="mb-2 block text-sm text-white/70">Status Keaktifan</span>
            <select
              value={member.status}
              onChange={(event) => update({ status: event.target.value as HmtiMember["status"] })}
              className="admin-input"
            >
              {["Aktif", "Non-Aktif", "Alumni"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <div className="md:col-span-2">
            <ImageUpload
              label="Upload Foto Anggota"
              value={member.photo}
              onChange={(photo) => update({ photo })}
              ratio="aspect-square max-w-52"
              round
            />
          </div>
        </div>
        <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-heading text-xl font-bold">Preview Kartu Realtime</h2>
          <div id="member-card-preview" className="mt-5">
            <MemberCard member={member} interactive={false} />
          </div>
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={submit} className="admin-primary w-full">
              <Save className="h-4 w-4" /> Simpan Anggota
            </button>
            <button type="button" onClick={() => window.print()} className="admin-secondary w-full">
              <Printer className="h-4 w-4" /> Cetak Kartu
            </button>
            <button
              type="button"
              onClick={() => void downloadPng()}
              className="admin-secondary w-full"
            >
              Download PNG
            </button>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="admin-input"
      />
    </label>
  );
}
