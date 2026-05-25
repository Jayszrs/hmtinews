import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, FileText, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedSection, useGlobalScrollEffects } from "@/components/AnimatedSection";
import { EventCard } from "@/components/EventCard";
import { MemberCard } from "@/components/MemberCard";
import { NewsCard, NewsSkeleton } from "@/components/NewsCard";
import { ParallaxHero } from "@/components/ParallaxHero";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import {
  getAll,
  type HmtiEvent,
  type HmtiMember,
  KEYS,
  type NewsPost,
  seedInitialData,
} from "@/lib/storage";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HMTI Universitas Bani Saleh" },
      {
        name: "description",
        content:
          "Platform resmi HMTI untuk berita, event, anggota, struktural, dan dashboard organisasi.",
      },
    ],
  }),
});

function Index() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [events, setEvents] = useState<HmtiEvent[]>([]);
  const [members, setMembers] = useState<HmtiMember[]>([]);
  const [loading, setLoading] = useState(true);
  useGlobalScrollEffects();

  useEffect(() => {
    seedInitialData();
    setNews(getAll<NewsPost>(KEYS.BERITA).filter((item) => item.status === "Publish"));
    setEvents(getAll<HmtiEvent>(KEYS.EVENTS).filter((item) => item.status === "Publish"));
    setMembers(getAll<HmtiMember>(KEYS.MEMBERS));
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-hmti-dark text-white">
      <Navbar />
      <main>
        <ParallaxHero />
        <StatsStrip news={news.length} events={events.length} members={members.length} />
        <NewsSection loading={loading} news={news} />
        <EventSection events={events} />
        <MemberSection members={members} />
        <StructuralSection members={members} />
      </main>
      <Footer />
    </div>
  );
}

function SectionHead({
  id,
  eyebrow,
  title,
  sub,
}: {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <AnimatedSection id={id as never} className="mx-auto mb-10 max-w-3xl text-center">
      <div className="font-mono text-xs uppercase tracking-[0.28em] text-hmti-gold">{eyebrow}</div>
      <h2 className="mt-3 font-display text-5xl leading-none text-white md:text-6xl">{title}</h2>
      <p className="mt-4 text-white/62">{sub}</p>
    </AnimatedSection>
  );
}

function StatsStrip({ news, events, members }: { news: number; events: number; members: number }) {
  const stats = [
    { label: "Berita Aktif", value: news, icon: FileText },
    { label: "Event Terdata", value: events, icon: CalendarDays },
    { label: "Anggota", value: members, icon: UsersRound },
  ];
  return (
    <section className="border-y border-hmti-gold/15 bg-[#07170b]">
      <div className="mx-auto grid max-w-7xl gap-0 px-5 py-8 md:grid-cols-3 lg:px-8">
        {stats.map((stat) => (
          <AnimatedSection
            key={stat.label}
            as="div"
            className="flex items-center gap-4 border-white/10 py-4 md:border-r md:px-8 last:md:border-r-0"
          >
            <stat.icon className="h-8 w-8 text-hmti-gold" />
            <div>
              <div className="font-display text-5xl text-white">{stat.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                {stat.label}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

function NewsSection({ loading, news }: { loading: boolean; news: NewsPost[] }) {
  const list = news.slice(0, 3);
  return (
    <section id="berita" className="bg-hmti-dark px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          id="berita-title"
          eyebrow="Berita Terkini"
          title="Kabar Organisasi dan Akademik"
          sub="Semua informasi terbaru tersimpan di localStorage dan bisa dikelola dari dashboard admin."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {loading
            ? [0, 1, 2].map((item) => <NewsSkeleton key={item} />)
            : list.map((item, index) => (
                <AnimatedSection key={item.id} as="article" delay={index * 0.1}>
                  <NewsCard item={item} />
                </AnimatedSection>
              ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 rounded-md border border-hmti-gold/50 px-5 py-3 font-heading text-sm uppercase tracking-wider text-hmti-gold transition hover:bg-hmti-gold hover:text-hmti-dark"
          >
            Lihat Semua Berita <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EventSection({ events }: { events: HmtiEvent[] }) {
  const active = events
    .slice()
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, 3);
  const urgent = active.some((event) => {
    const diff = new Date(event.startAt).getTime() - Date.now();
    return diff > 0 && diff <= 1000 * 60 * 60 * 24 * 7;
  });

  return (
    <section id="event" className="border-y border-white/10 bg-[#07170b] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          id="event-title"
          eyebrow={urgent ? "Event Incoming - 7 Hari Lagi" : "Event Incoming"}
          title="Agenda Terdekat HMTI"
          sub="Countdown, status event, lokasi, dan banner dikelola dari dashboard admin."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {active.map((event, index) => (
            <AnimatedSection key={event.id} as="article" delay={index * 0.1}>
              <EventCard event={event} />
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/event"
            className="inline-flex items-center gap-2 rounded-md bg-hmti-gold px-5 py-3 font-heading text-sm uppercase tracking-wider text-hmti-dark transition hover:-translate-y-1 hover:shadow-gold"
          >
            Lihat Semua Event <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MemberSection({ members }: { members: HmtiMember[] }) {
  const [filter, setFilter] = useState("Semua");
  const years = ["Semua", "2022", "2023", "2024", "2025"];
  const filtered =
    filter === "Semua" ? members : members.filter((member) => member.year === filter);

  return (
    <section id="anggota" className="bg-hmti-dark px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          id="anggota-title"
          eyebrow="Anggota HMTI"
          title="Kartu Anggota Digital"
          sub="Kartu anggota memiliki 3D tilt, nomor kartu, data divisi, dan preview konsisten dengan dashboard."
        />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setFilter(year)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition ${
                filter === year
                  ? "border-hmti-gold bg-hmti-gold text-hmti-dark"
                  : "border-white/10 text-white/60 hover:border-hmti-gold hover:text-hmti-gold"
              }`}
            >
              {year === "Semua" ? "Semua" : `Angkatan ${year}`}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 8).map((member, index) => (
            <AnimatedSection key={member.id} as="div" delay={index * 0.08}>
              <MemberCard member={member} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function StructuralSection({ members }: { members: HmtiMember[] }) {
  const ketua =
    members.find((member) => member.position.toLowerCase().includes("ketua")) ?? members[0];
  const sekretaris =
    members.find((member) => member.position.toLowerCase().includes("sekretaris")) ?? members[1];
  const leaders = members.filter((member) => member.position.toLowerCase().includes("kadiv"));

  return (
    <section id="struktural" className="border-t border-white/10 bg-[#07170b] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          id="struktural-title"
          eyebrow="Struktural"
          title="Bagan Organisasi"
          sub="Visual organisasi menggunakan CSS grid dengan connector antar level."
        />
        <div className="mx-auto max-w-5xl">
          <OrgNode member={ketua} level="Ketua Umum" delay={0} />
          <div className="mx-auto h-10 w-px bg-hmti-gold/40" />
          <div className="grid gap-6 md:grid-cols-2">
            <OrgNode member={sekretaris} level="Sekretaris" delay={0.1} />
            <OrgNode member={members[2]} level="Bendahara" delay={0.15} />
          </div>
          <div className="mx-auto my-8 h-px max-w-3xl bg-hmti-gold/30" />
          <div className="grid gap-6 md:grid-cols-3">
            {leaders.slice(0, 3).map((member, index) => (
              <OrgNode
                key={member.id}
                member={member}
                level={member.division}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrgNode({ member, level, delay }: { member?: HmtiMember; level: string; delay: number }) {
  if (!member) return null;
  return (
    <AnimatedSection
      as="div"
      delay={delay}
      className="mx-auto max-w-sm rounded-lg border border-hmti-gold/25 bg-white/[0.04] p-5 text-center"
    >
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-hmti-gold bg-hmti-green font-heading text-lg">
        {member.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div className="mt-4 font-heading text-lg font-bold">{member.name}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
        {level}
      </div>
    </AnimatedSection>
  );
}
