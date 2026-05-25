import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { events } from "@/lib/mock-data";
import { Calendar, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/event")({
  component: EventPage,
  head: () => ({
    meta: [
      { title: "Event IT — HMTI" },
      { name: "description", content: "Workshop, seminar, hackathon, dan kompetisi IT dari HMTI." },
      { property: "og:title", content: "Event IT — HMTI" },
      { property: "og:description", content: "Agenda kegiatan IT yang wajib kamu ikuti." },
      { property: "og:url", content: "/event" },
    ],
    links: [{ rel: "canonical", href: "/event" }],
  }),
});

const FILTERS = ["Semua", "Workshop", "Seminar", "Hackathon", "Lomba", "Networking"];
const STATUS = ["Semua", "Open", "Upcoming", "Full", "Past"] as const;

function EventPage() {
  const [cat, setCat] = useState("Semua");
  const [status, setStatus] = useState<(typeof STATUS)[number]>("Semua");

  const list = useMemo(
    () =>
      events.filter(
        (e) =>
          (cat === "Semua" || e.category === cat) && (status === "Semua" || e.status === status),
      ),
    [cat, status],
  );

  const statusColor: Record<string, string> = {
    Upcoming: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    Open: "bg-green-500/20 text-green-400 border-green-500/40",
    Full: "bg-bone/10 text-bone-dim border-line",
    Past: "bg-red/10 text-red border-red/40",
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Event IT"
        title="Event & Kegiatan IT"
        subtitle="Workshop, seminar, hackathon, dan kompetisi IT untuk mengasah skill dan membangun jaringan."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Event" }]}
      />

      <section className="border-y border-line bg-ink-soft">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setCat(f)}
                className={`px-3 h-9 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-colors ${cat === f ? "bg-red text-bone border-red" : "border-line text-bone-muted hover:text-red hover:border-red"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 h-8 rounded-md font-mono text-[10px] uppercase tracking-widest border transition-colors ${status === s ? "bg-bone text-ink border-bone" : "border-line text-bone-dim hover:text-bone hover:border-bone-dim"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm font-mono text-bone-dim mb-6">{list.length} event</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((e) => (
              <article
                key={e.slug}
                className="group rounded-xl border border-line bg-surface overflow-hidden card-hover flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded border font-mono text-[10px] uppercase tracking-widest ${statusColor[e.status]}`}
                  >
                    {e.status}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-ink/80 backdrop-blur text-bone font-mono text-[10px] uppercase tracking-widest border border-line">
                    {e.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-xl font-bold text-bone leading-snug group-hover:text-red transition-colors">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-bone-muted line-clamp-2">{e.excerpt}</p>
                  <div className="mt-4 space-y-2 text-sm text-bone-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red shrink-0" /> {e.date} • {e.format}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red shrink-0" /> {e.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-red shrink-0" /> {e.registered}/{e.capacity}
                    </div>
                    <div className="h-1.5 rounded-full bg-ink overflow-hidden">
                      <div
                        className="h-full gradient-red"
                        style={{ width: `${Math.min(100, (e.registered / e.capacity) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
                    <span className="font-display text-2xl text-red">{e.price}</span>
                    <button
                      className="px-4 py-2 gradient-red text-bone rounded-md font-heading text-xs uppercase tracking-widest hover:shadow-red transition-shadow disabled:opacity-50"
                      disabled={e.status === "Full" || e.status === "Past"}
                    >
                      {e.status === "Past" ? "Selesai" : e.status === "Full" ? "Penuh" : "Daftar"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
