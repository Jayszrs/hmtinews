import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { exhibits } from "@/lib/mock-data";

export const Route = createFileRoute("/pameran")({
  component: PameranPage,
  head: () => ({
    meta: [
      { title: "Pameran IT — HMTI" },
      {
        name: "description",
        content: "Inovasi & karya mahasiswa Teknik Informatika dari berbagai bidang teknologi.",
      },
      { property: "og:title", content: "Pameran IT — HMTI" },
      { property: "og:description", content: "Karya web, mobile, AI, IoT, game, dan lainnya." },
      { property: "og:url", content: "/pameran" },
    ],
    links: [{ rel: "canonical", href: "/pameran" }],
  }),
});

const CATS = ["Semua", "Aplikasi Web", "Mobile App", "AI/ML", "IoT", "Game", "UI/UX", "Hardware"];

function PameranPage() {
  const [cat, setCat] = useState("Semua");
  const list = useMemo(() => exhibits.filter((e) => cat === "Semua" || e.category === cat), [cat]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Pameran IT"
        title="Pameran Inovasi IT"
        subtitle="Temukan karya-karya terbaik mahasiswa Informatika yang siap mengubah dunia."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Pameran" }]}
      />

      <section className="border-y border-line bg-ink-soft">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 h-9 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-colors ${cat === c ? "bg-red text-bone border-red" : "border-line text-bone-muted hover:text-red hover:border-red"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm font-mono text-bone-dim mb-6">{list.length} karya</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
            {list.map((e, i) => {
              const big = i % 7 === 0;
              return (
                <article
                  key={e.slug}
                  className={`group relative overflow-hidden rounded-xl border border-line bg-surface card-hover ${big ? "md:col-span-2 md:row-span-2" : ""}`}
                >
                  <img
                    src={e.image}
                    alt={e.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  {e.award && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-red text-bone font-mono text-[10px] uppercase tracking-widest">
                      🏆 {e.award}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-ink/70 backdrop-blur border border-line text-bone-muted font-mono text-[10px] uppercase tracking-widest">
                    {e.year}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-red mb-1">
                      {e.category}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-bone leading-snug">
                      {e.title}
                    </h3>
                    <div className="text-sm text-bone-muted mt-1">{e.team}</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-bone/10 text-bone-muted text-[10px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
