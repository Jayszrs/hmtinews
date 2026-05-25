import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Sparkles,
  Zap,
  Users,
  Trophy,
  Code2,
  Quote,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { news, events, exhibits, members, partners } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HMTI — Himpunan Mahasiswa Teknik Informatika" },
      {
        name: "description",
        content:
          "Mendorong inovasi, kolaborasi, dan pengembangan mahasiswa Informatika menuju ekosistem teknologi yang berdampak.",
      },
      { property: "og:title", content: "HMTI — Himpunan Mahasiswa Teknik Informatika" },
      {
        property: "og:description",
        content: "Pusat berita, event, pameran, dan komunitas IT kampus.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <NewsSection />
        <EventsSection />
        <ExhibitsSection />
        <Counters />
        <MembersSection />
        <Testimonial />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden noise pt-20">
      <div className="absolute inset-0 grid-lines opacity-70" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-red/30 blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-red/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 w-full">
        <div className="inline-flex items-center gap-2 px-3 h-8 rounded-full border border-red/40 bg-red/10 text-red font-mono text-xs uppercase tracking-widest mb-8 animate-fade-up">
          <Zap className="w-3.5 h-3.5" /> Organisasi Teknologi Terdepan
        </div>

        <h1
          className="font-display text-hero text-bone max-w-5xl animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          HIMPUNAN MAHASISWA
          <br />
          <span className="text-red">TEKNIK INFORMATIKA</span>
        </h1>

        <p
          className="mt-7 max-w-2xl text-bone-muted text-lg md:text-xl leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Mendorong inovasi, kolaborasi, dan pengembangan diri mahasiswa Informatika menuju
          ekosistem teknologi yang berdampak nyata.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-4 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <Link
            to="/berita"
            className="group inline-flex items-center gap-2 px-7 py-4 gradient-red text-bone rounded-md font-heading uppercase tracking-wider text-sm hover:shadow-red hover:scale-[1.02] transition-all"
          >
            Explore Berita Terbaru
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/event"
            className="group inline-flex items-center gap-2 px-7 py-4 border border-bone/30 text-bone rounded-md font-heading uppercase tracking-wider text-sm hover:bg-bone hover:text-ink transition-colors"
          >
            Lihat Event Mendatang
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            { n: "500+", l: "Anggota" },
            { n: "50+", l: "Event/Tahun" },
            { n: "20+", l: "Mitra Industri" },
            { n: "10+", l: "Tahun Berdiri" },
          ].map((s) => (
            <div key={s.l} className="border-l-2 border-red pl-4">
              <div className="font-display text-5xl text-red leading-none">{s.n}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-bone-dim">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    "Pendaftaran Hackathon 2026 Dibuka",
    "Tim HMTI Lolos Final Hackathon Asia",
    "Workshop Next.js 15 Tersedia",
    "Career Fair September",
    "Open Recruitment Pengurus 2026",
    "Riset LLM Bahasa Indonesia",
  ];
  const row = [...items, ...items];
  return (
    <section className="border-y border-red/40 bg-red overflow-hidden">
      <div className="marquee py-3 text-bone font-heading uppercase tracking-widest text-sm">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <Sparkles className="w-4 h-4 text-bone/80" />
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  to,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  to: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-10">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-red mb-3">{eyebrow}</div>
        <h2 className="font-display text-4xl md:text-5xl text-bone max-w-2xl leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-bone-muted max-w-xl">{sub}</p>
      </div>
      <Link
        to={to}
        className="hidden md:inline-flex items-center gap-2 font-heading uppercase tracking-wider text-sm text-bone hover:text-red transition-colors shrink-0"
      >
        Lihat Semua <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function NewsSection() {
  const [featured, ...rest] = news;
  const list = rest.slice(0, 3);
  return (
    <section className="py-24 lg:py-32 bg-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Berita IT"
          title="Kabar Terkini dari Dunia Informatika"
          sub="Informasi terbaru seputar teknologi, riset, dan perkembangan komunitas HMTI."
          to="/berita"
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="card-hover group relative overflow-hidden rounded-xl border border-line bg-surface">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-red text-bone font-mono text-[10px] uppercase tracking-widest rounded">
                {featured.category}
              </span>
            </div>
            <div className="p-7">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-bone leading-tight group-hover:text-red transition-colors">
                {featured.title}
              </h3>
              <p className="mt-3 text-bone-muted line-clamp-2">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs font-mono text-bone-dim uppercase tracking-widest">
                <span>{featured.author}</span>
                <span className="text-red">•</span>
                <span>{featured.date}</span>
                <span className="text-red">•</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-4">
            {list.map((n) => (
              <article
                key={n.slug}
                className="group flex gap-5 p-4 rounded-lg border border-line bg-surface card-hover"
              >
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-28 h-28 object-cover rounded-md shrink-0"
                />
                <div className="min-w-0 flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red mb-1">
                    {n.category}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-bone leading-snug group-hover:text-red transition-colors line-clamp-2">
                    {n.title}
                  </h4>
                  <p className="mt-1 text-sm text-bone-muted line-clamp-1">{n.excerpt}</p>
                  <div className="mt-auto pt-2 text-xs font-mono text-bone-dim">
                    {n.date} • {n.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const list = events.filter((e) => e.status !== "Past").slice(0, 3);
  const statusColor: Record<string, string> = {
    Upcoming: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    Open: "bg-green-500/20 text-green-400 border-green-500/40",
    Full: "bg-bone/10 text-bone-dim border-line",
  };
  return (
    <section className="py-24 lg:py-32 bg-ink-soft border-y border-line">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Event IT"
          title="Agenda Kegiatan yang Wajib Kamu Ikuti"
          sub="Workshop, seminar, hackathon, dan kompetisi untuk mengasah skill dan membangun jaringan."
          to="/event"
        />
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
                    <Calendar className="w-4 h-4 text-red shrink-0" /> {e.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red shrink-0" /> {e.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red shrink-0" /> {e.registered}/{e.capacity}{" "}
                    terdaftar
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
                  <span className="font-display text-2xl text-red">{e.price}</span>
                  <button className="px-4 py-2 gradient-red text-bone rounded-md font-heading text-xs uppercase tracking-widest hover:shadow-red transition-shadow">
                    Daftar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExhibitsSection() {
  const list = exhibits.slice(0, 6);
  return (
    <section className="py-24 lg:py-32 bg-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Pameran IT"
          title="Inovasi & Karya Anak Informatika"
          sub="Karya-karya terbaik mahasiswa Informatika yang siap mengubah dunia."
          to="/pameran"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {list.map((e, i) => {
            const big = i === 0 || i === 5;
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
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90" />
                {e.award && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-red text-bone font-mono text-[10px] uppercase tracking-widest">
                    🏆 {e.award}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-red mb-1">
                    {e.category}
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-bone leading-snug">
                    {e.title}
                  </h3>
                  <div className="text-sm text-bone-muted mt-1">{e.team}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {e.tags.slice(0, 3).map((t) => (
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
  );
}

function Counters() {
  const stats = [
    { n: "500+", l: "Anggota Aktif", icon: Users },
    { n: "50+", l: "Event Tahunan", icon: Calendar },
    { n: "30+", l: "Proyek Inovatif", icon: Code2 },
    { n: "15+", l: "Mitra Industri", icon: Trophy },
  ];
  return (
    <section className="relative py-20 bg-ink border-y border-line overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-red/30">
        {stats.map((s) => (
          <div key={s.l} className="lg:px-8 flex flex-col items-start">
            <s.icon className="w-6 h-6 text-red mb-3" />
            <div className="font-display text-6xl text-red leading-none">{s.n}</div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest text-bone-muted">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MembersSection() {
  const list = members.slice(0, 8);
  return (
    <section className="py-24 lg:py-32 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Ekosistem IT"
          title="Anggota & Mitra dalam Komunitas HMTI"
          sub="Para individu yang membentuk ekosistem teknologi kampus kami."
          to="/anggota"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((m) => (
            <article
              key={m.id}
              className="group rounded-xl border border-line bg-surface p-6 card-hover text-center"
            >
              <div className="relative inline-block">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-20 h-20 rounded-full ring-2 ring-red/50 object-cover"
                />
              </div>
              <div className="mt-4 font-heading text-base font-bold text-bone leading-tight">
                {m.name}
              </div>
              <div className="mt-1 text-xs text-red font-mono uppercase tracking-widest">
                {m.role}
              </div>
              <p className="mt-3 text-xs text-bone-muted line-clamp-2 leading-relaxed">{m.bio}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {m.skills.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-ink text-bone-muted text-[10px] font-mono border border-line"
                  >
                    {s}
                  </span>
                ))}
                {m.skills.length > 2 && (
                  <span className="text-[10px] font-mono text-bone-dim">
                    +{m.skills.length - 2}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-bone-dim mb-6 text-center">
            Perusahaan Mitra
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="font-display text-2xl text-bone-dim hover:text-red transition-colors cursor-default"
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-24 lg:py-32 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <Quote className="w-16 h-16 text-red mx-auto mb-6" />
        <p className="font-display text-3xl md:text-5xl text-bone leading-tight">
          "HMTI bukan sekadar himpunan — ia adalah ekosistem yang membentuk saya jadi engineer yang
          berani mengambil tanggung jawab besar di industri."
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <img
            src={members[4].avatar}
            alt={members[4].name}
            className="w-14 h-14 rounded-full ring-2 ring-red"
          />
          <div className="text-left">
            <div className="font-heading font-bold text-bone">{members[4].name}</div>
            <div className="text-sm text-red font-mono uppercase tracking-widest">
              {members[4].company} • Angkatan {members[4].angkatan}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden gradient-red">
      <div className="absolute inset-0 noise" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-bone/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-ink/30 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <h2 className="font-display text-5xl md:text-7xl text-bone leading-[0.95]">
          Siap Bergabung dengan HMTI?
        </h2>
        <p className="mt-5 text-bone/90 text-lg max-w-xl mx-auto">
          Jadilah bagian dari komunitas IT terdepan dan wujudkan inovasi bersama.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/kontak"
            className="px-7 py-4 bg-bone text-ink rounded-md font-heading uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform"
          >
            Daftar Sekarang
          </Link>
          <Link
            to="/tentang"
            className="px-7 py-4 border border-bone text-bone rounded-md font-heading uppercase tracking-wider text-sm hover:bg-bone hover:text-ink transition-colors"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </section>
  );
}
