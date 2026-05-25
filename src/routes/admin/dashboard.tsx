import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarDays, FilePlus2, FileText, UsersRound, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  getAll,
  type HmtiEvent,
  type HmtiMember,
  KEYS,
  type NewsPost,
  seedInitialData,
} from "@/lib/storage";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [events, setEvents] = useState<HmtiEvent[]>([]);
  const [members, setMembers] = useState<HmtiMember[]>([]);

  useEffect(() => {
    seedInitialData();
    setNews(getAll<NewsPost>(KEYS.BERITA));
    setEvents(getAll<HmtiEvent>(KEYS.EVENTS));
    setMembers(getAll<HmtiMember>(KEYS.MEMBERS));
  }, []);

  const chart = useMemo(() => {
    const rows = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((month) => ({ month, berita: 0 }));
    news.forEach((item) => {
      const date = new Date(item.date);
      if (!Number.isNaN(date.getTime()) && date.getMonth() < rows.length)
        rows[date.getMonth()].berita += 1;
    });
    return rows;
  }, [news]);

  const cards = [
    { label: "Total Berita", value: news.length, icon: FileText },
    { label: "Total Event", value: events.length, icon: CalendarDays },
    { label: "Total Anggota", value: members.length, icon: UsersRound },
    {
      label: "Event Aktif",
      value: events.filter((event) => new Date(event.endAt).getTime() >= Date.now()).length,
      icon: Zap,
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <card.icon className="h-5 w-5 text-hmti-gold" />
            <div className="mt-4 font-display text-5xl">{card.value}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">
              {card.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-heading text-xl font-bold">Berita per Bulan</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,.45)" />
                <YAxis stroke="rgba(255,255,255,.45)" />
                <Tooltip
                  contentStyle={{ background: "#0a1f0f", border: "1px solid rgba(245,197,24,.3)" }}
                />
                <Bar dataKey="berita" fill="#f5c518" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-heading text-xl font-bold">Quick Actions</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["/admin/berita/tambah", "Tambah Berita"],
              ["/admin/event/tambah", "Tambah Event"],
              ["/admin/anggota/tambah", "Tambah Anggota"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-2 rounded-md border border-hmti-gold/35 px-4 py-3 text-sm text-hmti-gold hover:bg-hmti-gold hover:text-hmti-dark"
              >
                <FilePlus2 className="h-4 w-4" /> {label}
              </Link>
            ))}
          </div>
          <h3 className="mt-8 font-heading text-lg font-bold">Recent Activity</h3>
          <div className="mt-3 space-y-3 text-sm text-white/60">
            {news.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-md bg-white/[0.04] p-3">
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
