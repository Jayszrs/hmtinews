import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Calendar, ExternalLink, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedSection, useGlobalScrollEffects } from "@/components/AnimatedSection";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getAll, type HmtiEvent, KEYS, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/event/$id")({
  component: EventDetail,
});

function EventDetail() {
  const { id } = useParams({ from: "/event/$id" });
  const [events, setEvents] = useState<HmtiEvent[]>([]);
  const [now, setNow] = useState(Date.now());
  useGlobalScrollEffects();

  useEffect(() => {
    seedInitialData();
    setEvents(getAll<HmtiEvent>(KEYS.EVENTS));
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const event = events.find((item) => item.id === id);
  if (!event) {
    return (
      <div className="min-h-screen bg-hmti-dark text-white">
        <Navbar />
        <div className="mx-auto max-w-3xl px-5 py-40 text-center">
          <h1 className="font-display text-6xl">Event tidak ditemukan</h1>
          <Link to="/event" className="mt-6 inline-flex text-hmti-gold">
            Kembali ke event
          </Link>
        </div>
      </div>
    );
  }

  const start = new Date(event.startAt).getTime();
  const remain = Math.max(0, Math.floor((start - now) / 1000));
  const days = Math.floor(remain / 86400);
  const hours = Math.floor((remain % 86400) / 3600);
  const minutes = Math.floor((remain % 3600) / 60);
  const seconds = remain % 60;

  return (
    <div className="min-h-screen bg-hmti-dark text-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative min-h-[64vh] overflow-hidden">
          <img
            src={event.banner}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hmti-dark via-hmti-dark/70 to-hmti-dark/20" />
          <AnimatedSection className="relative mx-auto flex min-h-[64vh] max-w-6xl flex-col justify-end px-5 pb-16 lg:px-8">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-hmti-gold">
              Detail Event
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none md:text-7xl">
              {event.title}
            </h1>
          </AnimatedSection>
        </section>
        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1fr_360px] lg:px-8">
          <AnimatedSection>
            <p className="text-lg leading-8 text-white/70">{event.description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Info
                icon={Calendar}
                label="Tanggal"
                value={new Date(event.startAt).toLocaleString("id-ID")}
              />
              <Info icon={MapPin} label="Lokasi" value={event.location} />
              <Info icon={Users} label="Kapasitas" value={`${event.capacity} peserta`} />
            </div>
          </AnimatedSection>
          <aside className="rounded-lg border border-hmti-gold/25 bg-white/[0.04] p-6">
            <div className="font-heading text-xl font-bold text-hmti-gold">Countdown</div>
            <div className="mt-5 grid grid-cols-4 gap-2 text-center">
              {[
                ["Hari", days],
                ["Jam", hours],
                ["Menit", minutes],
                ["Detik", seconds],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-hmti-gold/10 p-3">
                  <div className="font-display text-3xl text-hmti-gold">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/45">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={event.registrationUrl}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-hmti-gold px-4 py-3 font-heading text-sm uppercase tracking-wider text-hmti-dark"
            >
              Link Pendaftaran <ExternalLink className="h-4 w-4" />
            </a>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <Icon className="h-5 w-5 text-hmti-gold" />
      <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </div>
      <div className="mt-1 text-sm text-white/75">{value}</div>
    </div>
  );
}
