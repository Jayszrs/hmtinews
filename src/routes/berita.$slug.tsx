import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Copy, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection, useGlobalScrollEffects } from "@/components/AnimatedSection";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getAll, type HmtiEvent, KEYS, type NewsPost, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/berita/$slug")({
  component: NewsDetail,
});

function NewsDetail() {
  const { slug } = useParams({ from: "/berita/$slug" });
  const [news, setNews] = useState<NewsPost[]>([]);
  const [events, setEvents] = useState<HmtiEvent[]>([]);
  useGlobalScrollEffects();

  useEffect(() => {
    seedInitialData();
    setNews(getAll<NewsPost>(KEYS.BERITA));
    setEvents(getAll<HmtiEvent>(KEYS.EVENTS));
  }, []);

  const item = news.find((post) => post.slug === slug);
  const related = useMemo(
    () => news.filter((post) => post.slug !== slug && post.category === item?.category).slice(0, 3),
    [item?.category, news, slug],
  );

  if (!item) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="mx-auto max-w-3xl px-5 py-40 text-center">
          <h1 className="text-5xl font-black text-hmti-dark">Berita tidak ditemukan</h1>
          <Link to="/berita" className="mt-6 inline-flex text-hmti-gold">
            Kembali ke berita
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <section className="relative min-h-[62vh] overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            data-parallax-speed="0.16"
            className="absolute inset-0 h-[120%] w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hmti-dark via-hmti-dark/60 to-hmti-dark/20" />
          <AnimatedSection className="relative mx-auto flex min-h-[62vh] max-w-5xl flex-col justify-end px-5 pb-16 lg:px-8">
            <span className="w-max rounded bg-hmti-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {item.category}
            </span>
            <h1 className="mt-5 font-display text-5xl leading-none md:text-7xl">{item.title}</h1>
            <p className="mt-4 text-white/65">
              {item.author} / {item.date}
            </p>
          </AnimatedSection>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_320px] lg:px-8">
          <article className="prose max-w-none prose-headings:text-hmti-dark prose-a:text-hmti-gold">
            <AnimatedSection>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </AnimatedSection>
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void navigator.clipboard?.writeText(shareUrl)}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-3 py-2 text-sm text-ink/70 hover:text-hmti-gold"
              >
                <Copy className="h-4 w-4" /> Copy Link
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${item.title} ${shareUrl}`)}`}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-3 py-2 text-sm text-ink/70 hover:text-hmti-gold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </article>
          <aside className="space-y-6">
            <div className="rounded-lg border border-line bg-card p-5 shadow-card">
              <h3 className="font-heading text-lg font-bold text-hmti-gold">Berita Terkait</h3>
              <div className="mt-4 space-y-3">
                {related.map((post) => (
                  <Link
                    key={post.id}
                    to="/berita/$slug"
                    params={{ slug: post.slug }}
                    className="block text-sm text-ink/70 hover:text-hmti-gold"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-line bg-card p-5 shadow-card">
              <h3 className="font-heading text-lg font-bold text-hmti-gold">Upcoming Event</h3>
              <div className="mt-4 space-y-3">
                {events.slice(0, 3).map((event) => (
                  <Link
                    key={event.id}
                    to="/event/$id"
                    params={{ id: event.id }}
                    className="block text-sm text-ink/70 hover:text-hmti-gold"
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
