import { Link, useRouterState } from "@tanstack/react-router";
import { Laptop, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

type ThemeMode = "dark" | "light" | "system";

function applyTheme(mode: ThemeMode) {
  const isLight =
    mode === "light" ||
    (mode === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches);
  document.documentElement.classList.toggle("light", isLight);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [themeMenu, setThemeMenu] = useState(false);
  const themeRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.theme);
    applyTheme(settings.theme);
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (getSettings().theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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
      .filter((node): node is HTMLElement => node !== null)
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pickTheme = (mode: ThemeMode) => {
    setTheme(mode);
    setSettings({ theme: mode });
    applyTheme(mode);
    setThemeMenu(false);
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/85 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-border/60 bg-background/90 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <HmtiLogo className="h-14 w-14 overflow-hidden rounded-md border border-border bg-white p-1 transition group-hover:rotate-3" />
          <div className="leading-none">
            <div className="text-2xl font-black tracking-tight text-foreground">
              HM<span className="text-primary">TI</span>
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
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
                  active ? "text-primary" : "text-foreground/65 hover:text-foreground"
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
            className={`flex h-10 items-center overflow-hidden rounded-md border border-border bg-background/50 transition-all ${
              searchOpen ? "w-56" : "w-10"
            }`}
          >
            <button
              type="button"
              aria-label="Cari"
              className="grid h-10 w-10 shrink-0 place-items-center text-foreground/65 hover:text-primary"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <Search className="h-4 w-4" />
            </button>
            <input
              placeholder="Cari berita..."
              className="min-w-0 flex-1 bg-transparent pr-3 text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </div>
          <div ref={themeRef} className="relative">
            <button
              type="button"
              onClick={() => setThemeMenu((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
              aria-label="Pilih tema"
            >
              <ThemeIcon className="h-4 w-4" />
            </button>
            {themeMenu && (
              <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-md border border-border bg-background/95 p-1 shadow-lg backdrop-blur-xl">
                {(
                  [
                    { mode: "light", label: "Light", Icon: Sun },
                    { mode: "dark", label: "Dark", Icon: Moon },
                    { mode: "system", label: "System", Icon: Laptop },
                  ] as const
                ).map(({ mode, label, Icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => pickTheme(mode)}
                    className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition hover:bg-muted ${
                      theme === mode ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/login"
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-hmti-gold-light"
          >
            Login Admin
          </Link>
        </div>

        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-md border border-border text-foreground lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider text-foreground/80 hover:bg-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground"
          >
            Login Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
