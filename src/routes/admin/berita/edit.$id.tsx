import { createFileRoute, useParams } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminNewsForm } from "@/components/AdminNewsForm";
import { getById, KEYS, type NewsPost } from "@/lib/storage";

export const Route = createFileRoute("/admin/berita/edit/$id")({
  component: EditBerita,
});

function EditBerita() {
  const { id } = useParams({ from: "/admin/berita/edit/$id" });
  const [item, setItem] = useState<NewsPost | null>(null);

  useEffect(() => {
    setItem(getById<NewsPost>(KEYS.BERITA, id));
  }, [id]);

  return (
    <AdminLayout title="Edit Berita">
      <Toaster richColors position="top-right" />
      {item ? (
        <AdminNewsForm initial={item} />
      ) : (
        <div className="text-white/60">Berita tidak ditemukan.</div>
      )}
    </AdminLayout>
  );
}
