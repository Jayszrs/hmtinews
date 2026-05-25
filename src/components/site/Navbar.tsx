import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Search, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/berita", label: "Berita" },
  { to: "/event", label: "Event" },
  { to: "/pameran", label: "Pameran" },
  { to: "/anggota", label: "Anggota" },
  { to: "/tentang", label: "Tentang" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.5)]" : "bg-transparent"
      } border-b border-[color-mix(in_oklab,var(--red)_15%,transparent)]`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-md gradient-red shadow-red">
            <Code2 className="w-4 h-4 text-bone" strokeWidth={2.5} />
          </span>
          <div className="leading-none">
            <div className="font-display text-2xl tracking-wider text-bone">
              HM<span className="text-red">TI</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-dim mt-0.5">
              Teknik Informatika
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => {
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`underline-anim font-heading text-sm uppercase tracking-wider transition-colors ${
                  active ? "text-red" : "text-bone-muted hover:text-bone"
                }`}
                data-active={active}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button aria-label="Cari" className="w-9 h-9 grid place-items-center rounded-md border border-line text-bone-muted hover:text-red hover:border-red transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <Link
            to="/kontak"
            className="px-4 h-9 inline-flex items-center font-heading text-sm uppercase tracking-wider gradient-red text-bone rounded-md hover:shadow-red transition-shadow"
          >
            Gabung HMTI
          </Link>
        </div>

        <button
          className="lg:hidden w-10 h-10 grid place-items-center text-bone"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink-soft border-t border-line">
          <nav className="px-5 py-6 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-3 rounded-md font-heading uppercase tracking-wider text-sm ${
                    active ? "text-red bg-[color-mix(in_oklab,var(--red)_10%,transparent)]" : "text-bone-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/kontak" className="mt-3 px-4 py-3 text-center font-heading uppercase tracking-wider text-sm gradient-red text-bone rounded-md">
              Gabung HMTI
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}