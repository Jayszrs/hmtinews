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
      className={`pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-[#070707] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(230,0,35,0.26),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_20%)]" />
      <div className="relative flex flex-col items-center gap-7">
        <div className="relative grid h-32 w-32 place-items-center">
          <div className="absolute inset-0 rounded-[18px] bg-white/5 blur-sm" />
          <HmtiLogo
            className="relative h-28 w-28 overflow-hidden rounded-[14px] opacity-42 mix-blend-screen"
            imageClassName="opacity-80 grayscale"
          />
          <div className="pixel-sweep absolute inset-2 rounded-[14px]" />
        </div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span
              key={index}
              className="pixel-loader-block h-3 w-3 bg-white/18"
              style={{ animationDelay: `${index * 0.08}s` }}
            />
          ))}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.55em] text-white/60">
          Loading
        </div>
      </div>
    </div>
  );
}
