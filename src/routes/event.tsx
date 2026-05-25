import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection, useGlobalScrollEffects } from "@/components/AnimatedSection";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getAll, type HmtiEvent, KEYS, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/event")({
  component: EventPage,
});

function stateOf(event: HmtiEvent) {
  const now = Date.now();
  const start = new Date(event.startAt).getTime();
  const end = new Date(event.endAt).getTime();
  if (now >= start && now <= end) return "Berlangsung";
  if (now > end) return "Selesai";
  return "Akan Datang";
}

function EventPage() {
  const [events, setEvents] = useState<HmtiEvent[]>([]);
  const [filter, setFilter] = useState("Semua");
  useGlobalScrollEffects();

  useEffect(() => {
    seedInitialData();
    setEvents(getAll<HmtiEvent>(KEYS.EVENTS).filter((event) => event.status === "Publish"));
  }, []);

  const list = useMemo(() => {
    return events
      .filter((event) => filter === "Semua" || stateOf(event) === filter)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events, filter]);

  return (
    <div className="min-h-screen bg-hmti-dark text-white">
      <Navbar />
      <main className="pt-20">
        <section className="hmti-hero-pattern px-5 py-24 lg:px-8">
          <AnimatedSection className="mx-auto max-w-5xl">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-hmti-gold">
              Kalender Kegiatan
            </div>
            <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">Event HMTI</h1>
            <p className="mt-5 max-w-2xl text-white/65">
              Agenda publik, workshop, seminar, dan kompetisi HMTI.
            </p>
          </AnimatedSection>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {["Semua", "Akan Datang", "Berlangsung", "Selesai"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest ${
                  filter === item
                    ? "border-hmti-gold bg-hmti-gold text-hmti-dark"
                    : "border-white/10 text-white/60 hover:border-hmti-gold hover:text-hmti-gold"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {list.map((event, index) => (
              <AnimatedSection key={event.id} as="article" delay={index * 0.05}>
                <EventCard event={event} />
              </AnimatedSection>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
