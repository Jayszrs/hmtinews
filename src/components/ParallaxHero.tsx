import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HmtiLogo } from "@/components/HmtiLogo";

export function ParallaxHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background pt-24 text-foreground">
      <div
        id="hero-bg"
        data-parallax-speed="0.16"
        className="hmti-hero-pattern absolute inset-0 h-[115%]"
      />
      <div className="relative mx-auto grid min-h-[78vh] max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.35fr_.65fr] lg:px-8 lg:py-14">
        <AnimatedSection className="flex flex-col justify-end border-b-4 border-hmti-gold pb-8 lg:border-b-0 lg:border-r-4 lg:pr-10">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-hmti-gold">
            <HmtiLogo className="h-9 w-9" />
            HMTI Newsroom
          </div>
          <div className="mb-4 inline-flex w-max items-center gap-2 rounded-full bg-hmti-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Breaking Update
          </div>
          <h1 className="max-w-4xl text-[clamp(2.9rem,7vw,6.8rem)] font-black leading-[0.95] text-hmti-dark">
            Portal Berita HMTI Universitas Bani Saleh
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink/68 md:text-lg">
            Update organisasi, agenda kampus, karya mahasiswa, dan informasi akademik dikemas dalam
            tampilan editorial modern dengan palet hitam, marun, merah, krem, dan abu hangat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/berita"
              className="group inline-flex items-center gap-2 rounded-md bg-hmti-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:shadow-gold"
            >
              Baca Berita
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/event"
              className="inline-flex items-center gap-2 rounded-md border border-hmti-dark/20 bg-white/50 px-5 py-3 text-sm font-bold uppercase tracking-wider text-hmti-dark transition hover:border-hmti-gold hover:text-hmti-gold"
            >
              Agenda Event
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="flex flex-col justify-end">
          <div className="rounded-xl border border-line bg-card p-5 shadow-card">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-hmti-dark">
              <img
                src="/hmti-logo.jpg"
                alt="Logo HMTI"
                className="h-full w-full object-contain p-12 opacity-95"
              />
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-hmti-gold">
              <CalendarDays className="h-4 w-4" />
              Edisi Organisasi
            </div>
            <h2 className="mt-3 text-2xl font-black leading-tight text-hmti-dark">
              Redaksi digital untuk kegiatan, anggota, dan arsip HMTI.
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink/62">
              Tampilan dibuat lebih familiar seperti portal news: headline jelas, kartu rapih, dan
              hierarki informasi lebih mudah discan.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
