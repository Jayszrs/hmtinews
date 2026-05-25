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
          ? "border-line bg-card/95 shadow-[0_10px_30px_rgba(26,21,21,0.12)] backdrop-blur-xl"
          : "border-line bg-card/92 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <HmtiLogo className="h-12 w-12 transition group-hover:rotate-3" />
          <div className="leading-none">
            <div className="text-2xl font-black tracking-tight text-hmti-dark">
              HM<span className="text-hmti-gold">TI</span>
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-ink/45">
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
                  active ? "text-hmti-gold" : "text-ink/65 hover:text-hmti-dark"
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
            className={`flex h-10 items-center overflow-hidden rounded-md border border-line bg-background transition-all ${
              searchOpen ? "w-56" : "w-10"
            }`}
          >
            <button
              type="button"
              aria-label="Cari"
              className="grid h-10 w-10 shrink-0 place-items-center text-ink/65 hover:text-hmti-gold"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <Search className="h-4 w-4" />
            </button>
            <input
              placeholder="Cari berita..."
              className="min-w-0 flex-1 bg-transparent pr-3 text-sm text-ink outline-none placeholder:text-ink/35"
            />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-md border border-line text-ink/65 transition hover:border-hmti-gold hover:text-hmti-gold"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="inline-flex h-10 items-center rounded-md bg-hmti-gold px-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-hmti-gold-light"
          >
            Login Admin
          </Link>
        </div>

        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-md border border-line text-hmti-dark lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-card/98 backdrop-blur-xl transition-all lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider text-ink/75 hover:bg-background hover:text-hmti-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="mt-2 rounded-md bg-hmti-gold px-3 py-3 text-center text-sm font-bold uppercase tracking-wider text-white"
          >
            Login Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
