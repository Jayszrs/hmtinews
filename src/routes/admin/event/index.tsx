import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { getAll, type HmtiEvent, KEYS, remove, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/admin/event/")({
  component: AdminEvent,
});

function AdminEvent() {
  const [events, setEvents] = useState<HmtiEvent[]>([]);
  const [filter, setFilter] = useState("Semua");
  const load = () => setEvents(getAll<HmtiEvent>(KEYS.EVENTS));

  useEffect(() => {
    seedInitialData();
    load();
  }, []);

  const list = events.filter((event) => filter === "Semua" || event.status === filter);

  return (
    <AdminLayout title="Manajemen Event">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {["Semua", "Publish", "Draft", "Arsip"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest ${
                filter === item
                  ? "border-hmti-gold bg-hmti-gold text-white"
                  : "border-white/10 text-white/60"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <Link to="/admin/event/tambah" className="admin-primary">
          <Plus className="h-4 w-4" /> Tambah Event
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {list.map((event) => (
          <article
            key={event.id}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
          >
            <img
              src={event.banner}
              alt={event.title}
              className="aspect-video w-full object-cover"
            />
            <div className="p-5">
              <div className="font-heading text-xl font-bold">{event.title}</div>
              <div className="mt-2 text-sm text-white/55">
                {new Date(event.startAt).toLocaleString("id-ID")}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full border border-hmti-gold/30 px-3 py-1 text-xs text-hmti-gold">
                  {event.status}
                </span>
                <div className="flex gap-2">
                  <Link to="/admin/event/tambah" search={{ id: event.id }} className="admin-icon">
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Hapus event ini?")) {
                        remove(KEYS.EVENTS, event.id);
                        load();
                      }
                    }}
                    className="admin-icon text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
}
