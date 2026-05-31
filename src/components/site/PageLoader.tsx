import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl" />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, rgba(230,0,35,0.9), rgba(10,10,10,0.2) 70%)",
            }}
          />
          <div className="absolute inset-3 rounded-2xl border border-white/10 animate-[spin_1.4s_linear_infinite]"
            style={{
              borderTopColor: "#ff2a44",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
            }}
          />
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