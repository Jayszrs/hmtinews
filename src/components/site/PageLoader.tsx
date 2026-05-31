import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HmtiLogo } from "@/components/HmtiLogo";

export function PageLoader() {
  const isLoading = useRouterState({ select: (s) => s.isLoading || s.isTransitioning });
  const [firstLoad, setFirstLoad] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setFirstLoad(false);
      setVisible(false);
    }, 1100);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (firstLoad) return;
    if (isLoading) {
      setVisible(true);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), 350);
    return () => window.clearTimeout(t);
  }, [isLoading, firstLoad]);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-[#0a0a0a] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(230,0,35,0.35) 0%, transparent 55%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-28 w-28">
          <div
            className="absolute -inset-3 rounded-full animate-[spin_1.6s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #ff2a44 70%, transparent 100%)",
              mask: "radial-gradient(circle, transparent 58%, #000 60%)",
              WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%)",
            }}
          />
          <HmtiLogo className="relative h-full w-full animate-[pulse_1.8s_ease-in-out_infinite]" />
        </div>
        <div className="font-display text-[11px] uppercase tracking-[0.5em] text-white/70">
          HMTI
        </div>
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden] [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}