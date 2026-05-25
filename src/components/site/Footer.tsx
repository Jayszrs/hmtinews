import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { HmtiLogo } from "@/components/HmtiLogo";

export function Footer() {
  return (
    <footer id="kontak" className="border-t border-hmti-gold/20 bg-[#07170b] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <HmtiLogo className="h-12 w-12" />
            <div>
              <div className="font-display text-3xl">HMTI</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
                Teknik Informatika
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
            Platform resmi Himpunan Mahasiswa Teknik Informatika Universitas Bani Saleh untuk
            berita, event, anggota, dan manajemen organisasi.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm uppercase tracking-wider text-hmti-gold">
            Quick Links
          </h4>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/65">
            {[
              ["/berita", "Berita"],
              ["/event", "Event"],
              ["/anggota", "Anggota"],
              ["/tentang", "Struktural"],
              ["/kontak", "Kontak"],
              ["/login", "Admin"],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="hover:text-hmti-gold">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm uppercase tracking-wider text-hmti-gold">Kontak</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hmti-gold" />
              Sekretariat HMTI, Universitas Bani Saleh
            </div>
            <div className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-hmti-gold" />
              halo@hmti.id
            </div>
            <div className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-hmti-gold" />
              +62 812 3456 7890
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            {[Instagram, Youtube, Linkedin, Github].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social media"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/60 transition hover:border-hmti-gold hover:text-hmti-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center font-mono text-xs text-white/40">
        Copyright {new Date().getFullYear()} HMTI Universitas Bani Saleh. All rights reserved.
      </div>
    </footer>
  );
}
