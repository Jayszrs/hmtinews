import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Target, Heart, Users, Lightbulb, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tentang")({
  component: TentangPage,
  head: () => ({
    meta: [
      { title: "Tentang HMTI" },
      {
        name: "description",
        content: "Sejarah, visi, misi, dan struktur Himpunan Mahasiswa Teknik Informatika.",
      },
      { property: "og:title", content: "Tentang HMTI" },
      { property: "og:description", content: "Sejarah, visi, misi, dan struktur HMTI." },
      { property: "og:url", content: "/tentang" },
    ],
    links: [{ rel: "canonical", href: "/tentang" }],
  }),
});

const MILESTONES = [
  {
    year: "2015",
    title: "HMTI Didirikan",
    desc: "12 mahasiswa pendiri memulai organisasi dari sebuah lab komputer.",
  },
  {
    year: "2018",
    title: "Hackathon Pertama",
    desc: "Menyelenggarakan kompetisi coding pertama dengan 80 peserta.",
  },
  {
    year: "2020",
    title: "Transformasi Digital",
    desc: "Beradaptasi penuh ke event online, capai 5x lipat peserta nasional.",
  },
  {
    year: "2023",
    title: "Mitra Industri 15+",
    desc: "Resmi bermitra dengan Gojek, Tokopedia, Telkom, dan lainnya.",
  },
  {
    year: "2026",
    title: "Ekosistem IT Kampus",
    desc: "Menjadi pusat aktivitas IT mahasiswa dengan 500+ anggota aktif.",
  },
];

const VALUES = [
  { icon: Lightbulb, title: "Inovasi", desc: "Mendorong eksplorasi ide dan teknologi baru." },
  { icon: Users, title: "Kolaborasi", desc: "Membangun budaya kerja tim lintas disiplin." },
  { icon: Shield, title: "Integritas", desc: "Bertindak jujur dan bertanggung jawab." },
  { icon: Heart, title: "Kepedulian", desc: "Menggunakan teknologi untuk dampak sosial." },
  { icon: Target, title: "Eksekusi", desc: "Tidak hanya berdiskusi — kami menghasilkan." },
  {
    icon: Sparkles,
    title: "Pertumbuhan",
    desc: "Belajar tanpa henti, individu maupun organisasi.",
  },
];

function TentangPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Tentang Kami"
        title="Lebih dari Sekadar Himpunan"
        subtitle="HMTI adalah rumah bagi mahasiswa Informatika untuk tumbuh, berkolaborasi, dan menciptakan dampak nyata melalui teknologi."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Tentang" }]}
      />

      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-line bg-surface p-8">
            <Target className="w-8 h-8 text-red mb-4" />
            <h2 className="font-display text-4xl text-bone">Visi</h2>
            <p className="mt-4 text-bone-muted leading-relaxed">
              Menjadi organisasi mahasiswa Teknik Informatika terdepan yang melahirkan pemimpin
              teknologi berkarakter, inovatif, dan berdampak bagi Indonesia.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-8">
            <Heart className="w-8 h-8 text-red mb-4" />
            <h2 className="font-display text-4xl text-bone">Misi</h2>
            <ul className="mt-4 space-y-2 text-bone-muted">
              <li className="flex gap-3">
                <span className="text-red">▸</span> Mengembangkan kompetensi teknis dan soft skill
                anggota.
              </li>
              <li className="flex gap-3">
                <span className="text-red">▸</span> Membangun jembatan antara akademis dan industri.
              </li>
              <li className="flex gap-3">
                <span className="text-red">▸</span> Mendorong riset dan inovasi mahasiswa
                Informatika.
              </li>
              <li className="flex gap-3">
                <span className="text-red">▸</span> Menciptakan komunitas IT yang inklusif dan
                suportif.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink-soft border-y border-line">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-red mb-3">Sejarah</div>
          <h2 className="font-display text-5xl text-bone mb-12">Perjalanan HMTI</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-red/30" />
            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative grid md:grid-cols-2 gap-4 md:gap-12 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red shadow-red" />
                  <div className="pl-12 md:pl-0 md:[direction:ltr]">
                    <div className="font-display text-5xl text-red leading-none">{m.year}</div>
                    <h3 className="mt-2 font-heading text-2xl font-bold text-bone">{m.title}</h3>
                    <p className="mt-2 text-bone-muted">{m.desc}</p>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-red mb-3">
            Nilai-Nilai
          </div>
          <h2 className="font-display text-5xl text-bone mb-12">Yang Kami Pegang</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-line bg-surface p-6 card-hover"
              >
                <v.icon className="w-7 h-7 text-red mb-4" />
                <h3 className="font-heading text-xl font-bold text-bone">{v.title}</h3>
                <p className="mt-2 text-sm text-bone-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
