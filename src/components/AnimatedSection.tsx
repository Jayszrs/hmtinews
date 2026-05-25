import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  children,
  className,
  as: Tag = "section",
  delay = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  delay?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal-on-scroll", className)}
      style={{ transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function useGlobalScrollEffects() {
  useEffect(() => {
    let ticking = false;
    const update = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
      document.querySelectorAll<HTMLElement>("[data-parallax-speed]").forEach((node) => {
        const speed = Number(node.dataset.parallaxSpeed ?? "0.2");
        node.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
