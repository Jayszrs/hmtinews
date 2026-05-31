import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection, useGlobalScrollEffects } from "@/components/AnimatedSection";
import { NewsCard } from "@/components/NewsCard";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getAll, KEYS, type NewsPost, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/berita")({
  component: BeritaPage,
});

function BeritaPage() {
  const [items, setItems] = useState<NewsPost[]>([]);
  const [category, setCategory] = useState("Semua");
  const [visible, setVisible] = useState(6);
  useGlobalScrollEffects();

  useEffect(() => {
    seedInitialData();
    setItems(getAll<NewsPost>(KEYS.BERITA).filter((item) => item.status === "Publish"));
  }, []);

  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const filtered =
    category === "Semua" ? items : items.filter((item) => item.category === category);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <section className="hmti-hero-pattern relative overflow-hidden px-5 py-24 lg:px-8">
          <div data-parallax-speed="0.18" className="floating-shape right-[12%] top-[24%]" />
          <AnimatedSection className="mx-auto max-w-5xl">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-hmti-gold">
              Arsip Berita
            </div>
            <h1 className="mt-4 text-5xl font-black leading-tight text-foreground md:text-7xl">
              Berita HMTI
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Informasi akademik, organisasi, event, dan pengumuman resmi HMTI.
            </p>
          </AnimatedSection>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest ${
                  category === item
                    ? "border-hmti-gold bg-hmti-gold text-white"
                    : "border-border bg-card text-muted-foreground hover:border-hmti-gold hover:text-hmti-gold"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {filtered.slice(0, visible).map((item, index) => (
              <AnimatedSection key={item.id} as="article" delay={index * 0.05}>
                <NewsCard item={item} />
              </AnimatedSection>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisible((value) => value + 6)}
                className="rounded-md bg-hmti-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-white"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
