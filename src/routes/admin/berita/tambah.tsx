import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminNewsForm } from "@/components/AdminNewsForm";

export const Route = createFileRoute("/admin/berita/tambah")({
  component: TambahBerita,
});

function TambahBerita() {
  return (
    <AdminLayout title="Tambah Berita">
      <Toaster richColors position="top-right" />
      <AdminNewsForm />
    </AdminLayout>
  );
}
