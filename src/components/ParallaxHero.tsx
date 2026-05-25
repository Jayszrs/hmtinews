import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HmtiLogo } from "@/components/HmtiLogo";

export function ParallaxHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-hmti-dark pt-20 text-white"
    >
      <div
        id="hero-bg"
        data-parallax-speed="0.4"
        className="hmti-hero-pattern absolute inset-0 h-[120%]"
      />
      <div data-parallax-speed="0.18" className="floating-shape left-[8%] top-[20%]" />
      <div data-parallax-speed="0.08" className="floating-shape hex right-[10%] top-[18%]" />
      <div data-parallax-speed="-0.08" className="floating-shape small bottom-[18%] right-[18%]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-5 py-16 lg:px-8">
        <AnimatedSection className="max-w-5xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-hmti-gold/40 bg-hmti-gold/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-hmti-gold">
            <HmtiLogo className="h-8 w-8" />
            Himpunan Mahasiswa Teknik Informatika
          </div>
          <h1 className="max-w-5xl font-display text-[clamp(4rem,11vw,9rem)] leading-[0.86] text-white">
            HMTI
            <span className="block gold-text">UNIVERSITAS BANI SALEH</span>
          </h1>
          <p className="typewriter mt-7 max-w-2xl text-lg leading-relaxed text-white/78 md:text-xl">
            Ekosistem mahasiswa informatika untuk belajar, berkarya, dan memimpin inovasi kampus.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/berita"
              className="group inline-flex items-center gap-2 rounded-md bg-hmti-gold px-6 py-4 font-heading text-sm uppercase tracking-wider text-hmti-dark transition hover:-translate-y-1 hover:shadow-gold"
            >
              Lihat Berita
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/tentang"
              className="inline-flex items-center gap-2 rounded-md border border-hmti-gold/50 px-6 py-4 font-heading text-sm uppercase tracking-wider text-hmti-gold transition hover:-translate-y-1 hover:bg-hmti-gold hover:text-hmti-dark"
            >
              Tentang Kami
            </Link>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-hmti-gold">
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
