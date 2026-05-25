import { Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { HmtiEvent } from "@/lib/storage";

function eventState(event: HmtiEvent) {
  const now = Date.now();
  const start = new Date(event.startAt).getTime();
  const end = new Date(event.endAt).getTime();
  if (now >= start && now <= end) return "Hari Ini";
  if (now > end) return "Selesai";
  return "Akan Datang";
}

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function EventCard({ event }: { event: HmtiEvent }) {
  const [now, setNow] = useState(Date.now());
  const startTime = useMemo(() => new Date(event.startAt).getTime(), [event.startAt]);
  const status = eventState(event);
  const within72h = startTime > now && startTime - now <= 1000 * 60 * 60 * 72;

  useEffect(() => {
    if (!within72h) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [within72h]);

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-hmti-gold/50">
      <Link to="/event/$id" params={{ id: event.id }} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={event.banner}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hmti-dark/90 via-transparent to-transparent" />
          <span
            className={`absolute left-3 top-3 rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
              status === "Hari Ini"
                ? "animate-pulse border-red-400 bg-red-500 text-white"
                : status === "Selesai"
                  ? "border-white/20 bg-white/10 text-white/60"
                  : "border-sky-300/40 bg-sky-400/15 text-sky-200"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-heading text-xl font-bold text-white transition group-hover:text-hmti-gold">
            {event.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/65">{event.description}</p>
          <div className="mt-4 space-y-2 text-sm text-white/65">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-hmti-gold" />
              {new Date(event.startAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-hmti-gold" />
              {new Date(event.startAt).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-hmti-gold" />
              {event.location}
            </div>
          </div>
          {within72h && (
            <div className="mt-5 rounded-md border border-hmti-gold/30 bg-hmti-gold/10 px-3 py-2 font-mono text-sm text-hmti-gold">
              Mulai dalam {formatCountdown(startTime - now)}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
