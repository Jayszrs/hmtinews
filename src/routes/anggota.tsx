import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MemberCard } from "@/components/MemberCard";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getAll, type HmtiMember, KEYS, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/anggota")({
  component: AnggotaPage,
});

function AnggotaPage() {
  const [members, setMembers] = useState<HmtiMember[]>([]);
  const [year, setYear] = useState("Semua");
  const [query, setQuery] = useState("");

  useEffect(() => {
    seedInitialData();
    setMembers(getAll<HmtiMember>(KEYS.MEMBERS));
  }, []);

  const years = useMemo(
    () => ["Semua", ...Array.from(new Set(members.map((item) => item.year)))],
    [members],
  );
  const filtered = members.filter((member) => {
    const matchYear = year === "Semua" || member.year === year;
    const text = `${member.name} ${member.nim} ${member.division} ${member.position}`.toLowerCase();
    return matchYear && text.includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <section className="hmti-hero-pattern px-5 py-24 lg:px-8">
          <AnimatedSection className="mx-auto max-w-5xl">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-hmti-gold">
              Galeri Anggota
            </div>
            <h1 className="mt-4 text-5xl font-black leading-tight text-hmti-dark md:text-7xl">
              Anggota HMTI
            </h1>
            <p className="mt-5 max-w-2xl text-ink/65">
              Kartu anggota digital dengan visual seperti ID card fisik.
            </p>
          </AnimatedSection>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {years.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setYear(item)}
                  className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest ${
                    year === item
                      ? "border-hmti-gold bg-hmti-gold text-white"
                      : "border-line bg-card text-ink/60 hover:border-hmti-gold hover:text-hmti-gold"
                  }`}
                >
                  {item === "Semua" ? "Semua" : `Angkatan ${item}`}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari anggota..."
              className="h-11 rounded-md border border-line bg-card px-4 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-hmti-gold md:w-72"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((member, index) => (
              <AnimatedSection key={member.id} as="div" delay={index * 0.04}>
                <MemberCard member={member} />
              </AnimatedSection>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
