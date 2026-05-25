import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUpload } from "@/components/ImageUpload";
import { createEvent, getById, type HmtiEvent, KEYS, save } from "@/lib/storage";

export const Route = createFileRoute("/admin/event/tambah")({
  component: TambahEvent,
});

function TambahEvent() {
  const router = useRouter();
  const [initial, setInitial] = useState<HmtiEvent | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [location, setLocation] = useState("");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [capacity, setCapacity] = useState(100);
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<HmtiEvent["status"]>("Publish");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;
    const item = getById<HmtiEvent>(KEYS.EVENTS, id);
    if (!item) return;
    setInitial(item);
    setTitle(item.title);
    setDescription(item.description);
    setBanner(item.banner);
    setStartAt(item.startAt.slice(0, 16));
    setEndAt(item.endAt.slice(0, 16));
    setLocation(item.location);
    setRegistrationUrl(item.registrationUrl);
    setCapacity(item.capacity);
    setTags(item.tags.join(", "));
    setStatus(item.status);
  }, []);

  const submit = () => {
    if (!title.trim() || description.trim().length < 100) {
      toast.error("Nama event wajib diisi dan deskripsi minimal 100 karakter.");
      return;
    }
    const item = createEvent({
      ...initial,
      title,
      description,
      banner: banner || undefined,
      startAt: new Date(startAt || Date.now()).toISOString(),
      endAt: new Date(endAt || Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      location,
      registrationUrl,
      capacity,
      status,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    save(KEYS.EVENTS, item);
    toast.success("Event disimpan.");
    void router.navigate({ to: "/admin/event" });
  };

  return (
    <AdminLayout title="Tambah Event">
      <Toaster richColors position="top-right" />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="admin-input"
            placeholder="Nama Event"
          />
          <ImageUpload label="Upload Banner Event 16:9" value={banner} onChange={setBanner} />
          <p className="text-xs text-white/45">Rekomendasi 1200x675px atau rasio 16:9.</p>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="admin-input min-h-40"
            placeholder="Deskripsi lengkap minimal 100 karakter"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="datetime-local"
              value={startAt}
              onChange={(event) => setStartAt(event.target.value)}
              className="admin-input"
            />
            <input
              type="datetime-local"
              value={endAt}
              onChange={(event) => setEndAt(event.target.value)}
              className="admin-input"
            />
          </div>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="admin-input"
            placeholder="Lokasi / Venue"
          />
          <input
            value={registrationUrl}
            onChange={(event) => setRegistrationUrl(event.target.value)}
            className="admin-input"
            placeholder="Link Pendaftaran"
          />
        </div>
        <aside className="space-y-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <input
            type="number"
            value={capacity}
            onChange={(event) => setCapacity(Number(event.target.value))}
            className="admin-input"
            placeholder="Kapasitas"
          />
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className="admin-input"
            placeholder="Tags event"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as HmtiEvent["status"])}
            className="admin-input"
          >
            {["Draft", "Publish", "Arsip"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button type="button" onClick={() => setPreview(true)} className="admin-secondary">
            <Eye className="h-4 w-4" /> Preview
          </button>
          <button type="button" onClick={submit} className="admin-primary w-full">
            Simpan Event
          </button>
        </aside>
      </div>
      {preview && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5"
          onClick={() => setPreview(false)}
        >
          <div className="max-w-xl overflow-hidden rounded-lg border border-hmti-gold/30 bg-hmti-dark">
            {banner && (
              <img src={banner} alt={title} className="aspect-video w-full object-cover" />
            )}
            <div className="p-5">
              <h2 className="font-heading text-2xl font-bold">{title || "Nama Event"}</h2>
              <p className="mt-2 text-white/65">{description || "Deskripsi event"}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
