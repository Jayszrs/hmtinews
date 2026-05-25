type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
};

export function PageHero({ eyebrow, title, subtitle, crumbs }: Props) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 hero-bg overflow-hidden noise">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {crumbs && (
          <div className="font-mono text-xs uppercase tracking-widest text-bone-dim mb-5">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-2 text-red">/</span>}
                <span className={i === crumbs.length - 1 ? "text-bone" : ""}>{c.label}</span>
              </span>
            ))}
          </div>
        )}
        <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-red/40 bg-red/10 text-red font-mono text-xs uppercase tracking-widest mb-6">
          {eyebrow}
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-bone leading-[0.95] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-bone-muted text-lg leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
