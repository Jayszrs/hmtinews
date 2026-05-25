import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HmtiLogo } from "@/components/HmtiLogo";
import { getAuthSession, logoutDemo } from "@/lib/storage";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/berita", label: "Berita", icon: FileText },
  { to: "/admin/event", label: "Event", icon: CalendarDays },
  { to: "/admin/anggota", label: "Anggota", icon: Users },
  { to: "/", label: "Website", icon: Home },
] as const;

export function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const session = typeof window === "undefined" ? null : getAuthSession();

  useEffect(() => {
    const current = getAuthSession();
    if (!current || current.role !== "admin") {
      void router.navigate({ to: "/login" });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-hmti-dark text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-white/10 bg-[#07170b] transition-all lg:block ${
          collapsed ? "w-20" : "w-60"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
          <HmtiLogo className="h-10 w-10" />
          {!collapsed && (
            <div>
              <div className="font-display text-2xl text-white">HMTI</div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-hmti-gold">
                Admin Panel
              </div>
            </div>
          )}
        </div>
        <nav className="space-y-1 p-3">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm transition ${
                  active
                    ? "bg-hmti-gold text-hmti-dark"
                    : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-white/35">
            <Settings className="h-4 w-4" />
            {!collapsed && "Pengaturan"}
          </div>
        </nav>
      </aside>

      <div className={`transition-all ${collapsed ? "lg:pl-20" : "lg:pl-60"}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-hmti-dark/80 px-5 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/70"
              onClick={() => setCollapsed((value) => !value)}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
                Admin / {path.split("/").filter(Boolean).slice(1).join(" / ")}
              </div>
              <h1 className="font-heading text-xl font-bold">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-sm md:block">
              <div className="font-medium">{session?.name ?? "Admin HMTI"}</div>
              <div className="text-xs text-white/45">Role admin</div>
            </div>
            <button
              type="button"
              onClick={() => {
                logoutDemo();
                void router.navigate({ to: "/login" });
              }}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-hmti-gold/40 px-3 text-sm text-hmti-gold transition hover:bg-hmti-gold hover:text-hmti-dark"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>
        <main className="px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
