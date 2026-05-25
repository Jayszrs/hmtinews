import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";
import { createNews, KEYS, save, type NewsPost } from "@/lib/storage";
import { useState } from "react";

export function AdminNewsForm({ initial }: { initial?: NewsPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "<p>Tulis konten berita di sini.</p>");
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? "");
  const [category, setCategory] = useState<NewsPost["category"]>(initial?.category ?? "Organisasi");
  const [author, setAuthor] = useState(initial?.author ?? "Admin HMTI");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [tags, setTags] = useState(initial?.tags.join(", ") ?? "");

  const submit = (status: NewsPost["status"]) => {
    const plain = content.replace(/<[^>]+>/g, "").trim();
    if (!title.trim()) {
      toast.error("Judul wajib diisi.");
      return;
    }
    if (plain.length < 50) {
      toast.error("Konten minimal 50 karakter.");
      return;
    }
    const item = createNews({
      ...initial,
      title,
      content,
      category,
      author,
      date,
      status,
      thumbnail: thumbnail || undefined,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    save(KEYS.BERITA, item);
    toast.success(status === "Publish" ? "Berita dipublish." : "Draft disimpan.");
    void router.navigate({ to: "/admin/berita" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Judul Berita</span>
          <input
            value={title}
            maxLength={150}
            onChange={(event) => setTitle(event.target.value)}
            className="admin-input"
            placeholder="Judul berita"
          />
        </label>
        <RichTextEditor value={content} onChange={setContent} />
        <ImageUpload label="Upload Thumbnail" value={thumbnail} onChange={setThumbnail} />
      </div>
      <aside className="space-y-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Kategori</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as NewsPost["category"])}
            className="admin-input"
          >
            {["Akademik", "Organisasi", "Event", "Pengumuman", "Lainnya"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Penulis</span>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="admin-input"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Tanggal Publikasi</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="admin-input"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Tags</span>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className="admin-input"
            placeholder="react, kampus, event"
          />
        </label>
        <div className="flex gap-3">
          <button type="button" onClick={() => submit("Draft")} className="admin-secondary">
            Simpan Draft
          </button>
          <button type="button" onClick={() => submit("Publish")} className="admin-primary">
            Publish Sekarang
          </button>
        </div>
      </aside>
    </div>
  );
}
