import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Lightbulb, Shield, Sparkles, Target, Users } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

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

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85";

const SNAPSHOT = [
  ["500+", "Anggota aktif dan alumni"],
  ["15+", "Mitra komunitas dan industri"],
  ["2015", "Tahun perjalanan dimulai"],
];

const MILESTONES = [
  {
    year: "2015",
    title: "HMTI Didirikan",
    desc: "Mahasiswa pendiri memulai organisasi dari lab komputer dan forum belajar kecil.",
  },
  {
    year: "2018",
    title: "Hackathon Pertama",
    desc: "Kompetisi coding perdana membuka ruang karya dan kolaborasi lintas angkatan.",
  },
  {
    year: "2020",
    title: "Transformasi Digital",
    desc: "Program kerja beradaptasi ke format online dan menjangkau peserta lebih luas.",
  },
  {
    year: "2023",
    title: "Mitra Industri 15+",
    desc: "HMTI memperkuat relasi dengan komunitas teknologi, alumni, dan perusahaan digital.",
  },
  {
    year: "2026",
    title: "Ekosistem IT Kampus",
    desc: "HMTI berkembang menjadi pusat aktivitas teknologi, mentoring, dan dokumentasi kampus.",
  },
];

const VALUES = [
  { icon: Lightbulb, title: "Inovasi", desc: "Mendorong eksplorasi ide dan teknologi baru." },
  { icon: Users, title: "Kolaborasi", desc: "Membangun budaya kerja tim lintas disiplin." },
  { icon: Shield, title: "Integritas", desc: "Bertindak jujur dan bertanggung jawab." },
  { icon: Heart, title: "Kepedulian", desc: "Menggunakan teknologi untuk dampak sosial." },
  {
    icon: Target,
    title: "Eksekusi",
    desc: "Tidak berhenti di wacana, HMTI bergerak menghasilkan.",
  },
  {
    icon: Sparkles,
    title: "Pertumbuhan",
    desc: "Belajar tanpa henti, baik sebagai individu maupun organisasi.",
  },
];

function TentangPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-hmti-dark pt-20 text-white">
        <img
          src={ABOUT_IMAGE}
          alt="Mahasiswa HMTI berkumpul dan belajar bersama"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/86 via-black/58 to-black/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-black/20" />
        <div className="relative mx-auto grid min-h-[78svh] max-w-7xl items-end gap-10 px-5 py-16 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-4xl pb-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-white/60">
              Beranda <span className="mx-2 text-hmti-gold">/</span> Tentang
            </div>
            <div className="mb-5 inline-flex items-center rounded bg-hmti-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Tentang Kami
            </div>
            <h1 className="text-[clamp(3rem,7vw,6.6rem)] font-black leading-[0.95]">
              Lebih dari Sekadar Himpunan
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              HMTI adalah rumah bertumbuh bagi mahasiswa Informatika Universitas Bani Saleh: tempat
              belajar teknologi, membangun relasi, mengelola kegiatan, dan menciptakan karya yang
              berdampak untuk kampus maupun masyarakat.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/anggota"
                className="inline-flex items-center gap-2 rounded-md bg-hmti-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:shadow-red"
              >
                Lihat Anggota <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-hmti-gold hover:text-hmti-gold"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/18 bg-black/38 p-5 backdrop-blur-md">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-hmti-gold">
              Snapshot Organisasi
            </div>
            <div className="mt-5 space-y-4">
              {SNAPSHOT.map(([value, label]) => (
                <div key={label} className="border-t border-white/14 pt-4">
                  <div className="text-4xl font-black leading-none text-white">{value}</div>
                  <div className="mt-2 text-sm text-white/68">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 text-foreground">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-border bg-card p-8 shadow-card">
            <Target className="mb-5 h-8 w-8 text-hmti-gold" />
            <h2 className="text-4xl font-black">Visi</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Menjadi organisasi mahasiswa Teknik Informatika terdepan yang melahirkan pemimpin
              teknologi berkarakter, inovatif, dan berdampak bagi Indonesia.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-8 shadow-card">
            <Heart className="mb-5 h-8 w-8 text-hmti-gold" />
            <h2 className="text-4xl font-black">Misi</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              {[
                "Mengembangkan kompetensi teknis dan soft skill anggota.",
                "Membangun jembatan antara akademis dan industri.",
                "Mendorong riset dan inovasi mahasiswa Informatika.",
                "Menciptakan komunitas IT yang inklusif dan suportif.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-hmti-gold">-</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20 text-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-hmti-gold">
            Sejarah
          </div>
          <h2 className="mb-12 text-5xl font-black">Perjalanan HMTI</h2>
          <div className="relative">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-hmti-gold/30 md:left-1/2" />
            <div className="space-y-12">
              {MILESTONES.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${
                    index % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className="absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-hmti-gold shadow-red md:left-1/2" />
                  <div className="pl-12 md:pl-0 md:[direction:ltr]">
                    <div className="text-5xl font-black leading-none text-hmti-gold">
                      {milestone.year}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold">{milestone.title}</h3>
                    <p className="mt-2 text-muted-foreground">{milestone.desc}</p>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 text-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-hmti-gold">
            Nilai-Nilai
          </div>
          <h2 className="mb-12 text-5xl font-black">Yang Kami Pegang</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="card-hover rounded-lg border border-border bg-card p-6"
              >
                <value.icon className="mb-4 h-7 w-7 text-hmti-gold" />
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
