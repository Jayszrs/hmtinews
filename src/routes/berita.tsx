import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { news } from "@/lib/mock-data";
import { Search, Eye, Bookmark, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/berita")({
  component: BeritaPage,
  head: () => ({
    meta: [
      { title: "Berita IT — HMTI" },
      {
        name: "description",
        content:
          "Kumpulan berita, opini, dan artikel seputar teknologi informasi dan komunitas HMTI.",
      },
      { property: "og:title", content: "Berita IT — HMTI" },
      { property: "og:description", content: "Berita, opini, dan artikel IT pilihan HMTI." },
      { property: "og:url", content: "/berita" },
    ],
    links: [{ rel: "canonical", href: "/berita" }],
  }),
});

const CATS = [
  "Semua",
  "Teknologi",
  "AI & ML",
  "Web Dev",
  "Mobile",
  "Cybersecurity",
  "Riset",
  "Komunitas",
];

function BeritaPage() {
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      news.filter(
        (n) =>
          (cat === "Semua" || n.category === cat) &&
          (!q || n.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  const [featured, ...rest] = list.length ? list : news;

  return (
    <PageShell>
      <PageHero
        eyebrow="Berita IT"
        title="Berita & Artikel IT"
        subtitle="Kumpulan berita, opini, dan artikel seputar teknologi informasi dan komunitas HMTI."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Berita" }]}
      />

      <section className="sticky top-16 z-30 bg-ink/90 backdrop-blur-lg border-y border-line">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone-dim" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full h-10 pl-9 pr-3 rounded-md bg-ink-soft border border-line text-sm text-bone placeholder:text-bone-dim focus:outline-none focus:border-red"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-2 px-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 px-3 h-9 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-colors ${
                  cat === c
                    ? "bg-red text-bone border-red"
                    : "border-line text-bone-muted hover:text-red hover:border-red"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm font-mono text-bone-dim mb-6">
            Menampilkan {list.length} artikel
          </div>

          <article className="group rounded-xl overflow-hidden border border-line bg-surface card-hover mb-10">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-red text-bone font-mono text-[10px] uppercase tracking-widest rounded">
                  📌 Artikel Unggulan
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="text-xs font-mono uppercase tracking-widest text-red">
                  {featured.category}
                </div>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-bone leading-tight group-hover:text-red transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-bone-muted">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-xs font-mono text-bone-dim uppercase tracking-widest">
                  <span>{featured.author}</span>
                  <span className="text-red">•</span>
                  <span>{featured.date}</span>
                  <span className="text-red">•</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </article>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((n) => (
              <article
                key={n.slug}
                className="group rounded-xl overflow-hidden border border-line bg-surface card-hover flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-ink/80 backdrop-blur text-red border border-red/40 font-mono text-[10px] uppercase tracking-widest rounded">
                    {n.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-bone leading-snug group-hover:text-red transition-colors line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm text-bone-muted line-clamp-2">{n.excerpt}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs font-mono text-bone-dim">
                    <span>{n.date}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {Math.floor(Math.random() * 900) + 100}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> {Math.floor(Math.random() * 30)}
                      </span>
                      <Bookmark className="w-3 h-3 hover:text-red cursor-pointer" />
                    </div>
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
