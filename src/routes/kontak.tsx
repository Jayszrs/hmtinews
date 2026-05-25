import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/kontak")({
  component: KontakPage,
  head: () => ({
    meta: [
      { title: "Kontak — HMTI" },
      { name: "description", content: "Hubungi HMTI untuk kemitraan, informasi, atau bergabung." },
      { property: "og:title", content: "Kontak — HMTI" },
      { property: "og:description", content: "Hubungi tim HMTI." },
      { property: "og:url", content: "/kontak" },
    ],
    links: [{ rel: "canonical", href: "/kontak" }],
  }),
});

function KontakPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Mari Berkolaborasi"
        subtitle="Punya pertanyaan, ide kemitraan, atau ingin bergabung? Kami siap mendengar."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Kontak" }]}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 rounded-xl border border-line bg-surface p-8">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-red mx-auto mb-4" />
                <h3 className="font-display text-4xl text-bone">Pesan Terkirim!</h3>
                <p className="mt-3 text-bone-muted">Tim HMTI akan merespons dalam 1×24 jam.</p>
                <button onClick={() => setSent(false)} className="mt-6 px-5 py-3 border border-line rounded-md font-heading text-xs uppercase tracking-widest text-bone hover:border-red hover:text-red">Kirim lagi</button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <h2 className="font-display text-3xl text-bone">Kirim Pesan</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Nama"><input required className="input" placeholder="Nama lengkap" /></Field>
                  <Field label="Email"><input type="email" required className="input" placeholder="email@kamu.com" /></Field>
                </div>
                <Field label="Subjek">
                  <select className="input" defaultValue="">
                    <option value="" disabled>Pilih topik</option>
                    <option>Kemitraan</option><option>Informasi Event</option>
                    <option>Gabung HMTI</option><option>Lainnya</option>
                  </select>
                </Field>
                <Field label="Pesan"><textarea rows={6} required className="input resize-none" placeholder="Tulis pesan kamu..." /></Field>
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 gradient-red text-bone rounded-md font-heading text-sm uppercase tracking-widest hover:shadow-red transition-shadow">
                  Kirim Pesan <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-4">
            {[
              { Icon: MapPin, label: "Alamat", value: "Sekretariat HMTI, Gedung Informatika Lt. 2" },
              { Icon: Mail, label: "Email", value: "halo@hmti.id" },
              { Icon: Phone, label: "WhatsApp", value: "+62 812 3456 7890" },
              { Icon: Clock, label: "Jam Operasional", value: "Senin – Jumat, 09:00 – 17:00" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-line bg-surface p-5 flex gap-4 card-hover">
                <span className="w-10 h-10 grid place-items-center rounded-md gradient-red shrink-0"><Icon className="w-4 h-4 text-bone" /></span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-bone-dim">{label}</div>
                  <div className="mt-1 text-bone">{value}</div>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-line bg-surface overflow-hidden aspect-video grid place-items-center text-bone-dim font-mono text-xs uppercase tracking-widest">
              [ Peta Lokasi Sekretariat ]
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: var(--ink);
          border: 1px solid var(--line);
          color: var(--bone);
          border-radius: 0.5rem;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color .2s;
        }
        .input:focus { border-color: var(--red); }
        .input::placeholder { color: var(--bone-dim); }
      `}</style>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mb-2">{label}</div>
      {children}
    </label>
  );
}