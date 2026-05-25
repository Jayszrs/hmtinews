import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { members, partners } from "@/lib/mock-data";
import { Github, Linkedin, Mail } from "lucide-react";

export const Route = createFileRoute("/anggota")({
  component: AnggotaPage,
  head: () => ({
    meta: [
      { title: "Anggota & Mitra — HMTI" },
      { name: "description", content: "Kenali pengurus, anggota, alumni, dan mitra perusahaan di ekosistem HMTI." },
      { property: "og:title", content: "Anggota & Mitra — HMTI" },
      { property: "og:description", content: "Komunitas dan ekosistem IT HMTI." },
      { property: "og:url", content: "/anggota" },
    ],
    links: [{ rel: "canonical", href: "/anggota" }],
  }),
});

const TABS = ["Semua", "Pengurus", "Anggota", "Alumni"] as const;

function AnggotaPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("Semua");
  const [q, setQ] = useState("");

  const list = useMemo(() => members.filter(m =>
    (tab === "Semua" || m.type === tab) &&
    (!q || m.name.toLowerCase().includes(q.toLowerCase()) || m.skills.some(s => s.toLowerCase().includes(q.toLowerCase())))
  ), [tab, q]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Ekosistem IT"
        title="Komunitas & Ekosistem IT HMTI"
        subtitle="Kenali para anggota, alumni, dan mitra perusahaan yang membentuk ekosistem IT kampus kami."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Anggota" }]}
      />

      <section className="border-y border-line bg-ink-soft">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 h-10 rounded-md font-heading text-xs uppercase tracking-widest border transition-colors ${tab === t ? "bg-red text-bone border-red" : "border-line text-bone-muted hover:text-red hover:border-red"}`}>{t}</button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama atau skill..."
            className="lg:ml-auto w-full lg:w-72 h-10 px-3 rounded-md bg-ink border border-line text-sm text-bone placeholder:text-bone-dim focus:outline-none focus:border-red"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm font-mono text-bone-dim mb-6">{list.length} anggota</div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {list.map((m) => (
              <article key={m.id} className="group rounded-xl border border-line bg-surface p-6 card-hover flex flex-col items-center text-center">
                <span className="px-2.5 py-1 rounded bg-red/15 text-red font-mono text-[10px] uppercase tracking-widest mb-3">{m.type}</span>
                <img src={m.avatar} alt={m.name} className="w-24 h-24 rounded-full ring-2 ring-red/50 object-cover" />
                <div className="mt-4 font-heading text-base font-bold text-bone leading-tight">{m.name}</div>
                <div className="mt-1 text-xs text-red font-mono uppercase tracking-widest">{m.role}</div>
                {m.company && <div className="text-xs text-bone-dim mt-0.5">@ {m.company}</div>}
                <p className="mt-3 text-xs text-bone-muted line-clamp-3 leading-relaxed">{m.bio}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {m.skills.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-ink text-bone-muted text-[10px] font-mono border border-line">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  {[Github, Linkedin, Mail].map((Icon, i) => (
                    <a key={i} href="#" className="w-8 h-8 grid place-items-center rounded border border-line text-bone-muted hover:text-red hover:border-red transition-colors"><Icon className="w-3.5 h-3.5" /></a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="font-display text-4xl text-bone mb-2">Perusahaan & Instansi Mitra</h2>
            <p className="text-bone-muted mb-8">Perusahaan tempat alumni HMTI berkarya dan bermitra.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partners.map((p) => (
                <div key={p.name} className="rounded-xl border border-line bg-surface p-6 card-hover">
                  <div className="font-display text-2xl text-bone">{p.name}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-red mt-1">{p.industry}</div>
                  <div className="mt-4 text-sm text-bone-muted">{p.alumni} alumni HMTI</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}