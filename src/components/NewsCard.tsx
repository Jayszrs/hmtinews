import { Link } from "@tanstack/react-router";
import { Calendar, UserRound } from "lucide-react";
import type { NewsPost } from "@/lib/storage";

export function NewsCard({ item }: { item: NewsPost }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-hmti-gold/50 hover:shadow-gold">
      <Link to="/berita/$slug" params={{ slug: item.slug }} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded bg-hmti-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-hmti-dark">
            {item.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="line-clamp-2 font-heading text-xl font-bold leading-snug text-white transition group-hover:text-hmti-gold">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">{item.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-white/50">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-hmti-gold" /> {item.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <UserRound className="h-3.5 w-3.5 text-hmti-gold" /> {item.author}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function NewsSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="aspect-video animate-pulse bg-white/10" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}
