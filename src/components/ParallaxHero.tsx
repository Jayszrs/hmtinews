import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HmtiLogo } from "@/components/HmtiLogo";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=2200&q=85";

export function ParallaxHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-hmti-dark pt-20 text-white">
      <div id="hero-bg" data-parallax-speed="0.16" className="absolute inset-0 h-[115%]" />
      <img
        src={HERO_IMAGE}
        alt="Mahasiswa HMTI berkegiatan di kampus"
        className="absolute inset-0 h-[115%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-5 py-12 lg:px-8">
        <AnimatedSection className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
            <HmtiLogo className="h-8 w-8 overflow-hidden rounded bg-white" />
            HMTI Universitas Bani Saleh
          </div>
          <div className="mb-4 inline-flex w-max items-center gap-2 rounded bg-hmti-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Portal Resmi Organisasi
          </div>
          <h1 className="binary-title relative max-w-4xl overflow-hidden text-[clamp(2.8rem,8vw,6.9rem)] font-black leading-[0.94] text-white">
            Selamat Datang
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
            Masuk ke ruang digital HMTI Universitas Bani Saleh: tempat kabar organisasi, agenda
            kegiatan, profil anggota, dan dokumentasi perjalanan mahasiswa Informatika dirangkum
            dengan tampilan yang rapi, cepat, dan mudah dijelajahi.
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
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-hmti-gold hover:text-hmti-gold"
            >
              Agenda Event
            </Link>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-hmti-dark/88 px-5 py-3 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden text-xs font-bold uppercase tracking-widest">
          <CalendarDays className="h-4 w-4 shrink-0 text-hmti-gold" />
          <div className="marquee">
            <span>Berita resmi HMTI Universitas Bani Saleh</span>
            <span>Agenda kegiatan dan workshop mahasiswa</span>
            <span>Profil anggota, struktural, dan dokumentasi organisasi</span>
            <span>Berita resmi HMTI Universitas Bani Saleh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
