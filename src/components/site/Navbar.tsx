import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HmtiLogo } from "@/components/HmtiLogo";
import { getSettings, setSettings } from "@/lib/storage";

const NAV = [
  { to: "/", label: "Beranda", section: "hero" },
  { to: "/berita", label: "Berita", section: "berita" },
  { to: "/event", label: "Event", section: "event" },
  { to: "/anggota", label: "Anggota", section: "anggota" },
  { to: "/tentang", label: "Struktural", section: "struktural" },
  { to: "/kontak", label: "Kontak", section: "kontak" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.theme);
    document.documentElement.classList.toggle("light", settings.theme === "light");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.45 },
    );
    NAV.map((item) => document.getElementById(item.section))
      .filter(Boolean)
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => setOpen(false), [path]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setSettings({ theme: next });
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-hmti-gold/20 bg-hmti-dark/82 shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <HmtiLogo className="h-12 w-12 transition group-hover:rotate-3" />
          <div className="leading-none">
            <div className="font-display text-3xl tracking-wider text-white">
              HM<span className="text-hmti-gold">TI</span>
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-white/50">
              Universitas Bani Saleh
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active =
              path === "/"
                ? activeSection === item.section
                : item.to === "/"
                  ? false
                  : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`underline-anim font-heading text-sm uppercase tracking-wider transition ${
                  active ? "text-hmti-gold" : "text-white/65 hover:text-white"
                }`}
                data-active={active}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div
            className={`flex h-10 items-center overflow-hidden rounded-md border border-white/10 bg-white/[0.03] transition-all ${
              searchOpen ? "w-56" : "w-10"
            }`}
          >
            <button
              type="button"
              aria-label="Cari"
              className="grid h-10 w-10 shrink-0 place-items-center text-white/65 hover:text-hmti-gold"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <Search className="h-4 w-4" />
            </button>
            <input
              placeholder="Cari berita..."
              className="min-w-0 flex-1 bg-transparent pr-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/65 transition hover:border-hmti-gold hover:text-hmti-gold"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="inline-flex h-10 items-center rounded-md border border-hmti-gold/50 px-4 font-heading text-sm uppercase tracking-wider text-hmti-gold transition hover:bg-hmti-gold hover:text-hmti-dark"
          >
            Login Admin
          </Link>
        </div>

        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-md border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-hmti-dark/95 backdrop-blur-xl transition-all lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-3 font-heading text-sm uppercase tracking-wider text-white/75 hover:bg-white/8 hover:text-hmti-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="mt-2 rounded-md border border-hmti-gold/50 px-3 py-3 text-center font-heading text-sm uppercase tracking-wider text-hmti-gold"
          >
            Login Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
