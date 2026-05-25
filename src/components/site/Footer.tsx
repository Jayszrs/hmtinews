import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube, Github, Code2, Mail, MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-red/30 bg-ink-soft mt-24">
      <div className="absolute inset-x-0 top-0 h-px gradient-red opacity-80" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-md gradient-red"><Code2 className="w-4 h-4" strokeWidth={2.5} /></span>
            <div className="font-display text-2xl tracking-wider">HM<span className="text-red">TI</span></div>
          </div>
          <p className="mt-4 text-sm text-bone-muted leading-relaxed">
            Himpunan Mahasiswa Teknik Informatika — pusat informasi, komunitas, dan ekosistem IT kampus.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Linkedin, Twitter, Youtube, Github].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="w-9 h-9 grid place-items-center rounded-md border border-line text-bone-muted hover:text-red hover:border-red hover:shadow-red transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading uppercase tracking-wider text-sm text-bone mb-4">Link Cepat</h4>
          <ul className="space-y-2.5 text-sm text-bone-muted">
            {[["/berita","Berita"],["/event","Event"],["/pameran","Pameran"],["/anggota","Anggota"],["/tentang","Tentang"]].map(([to,l]) => (
              <li key={to}><Link to={to} className="hover:text-red transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase tracking-wider text-sm text-bone mb-4">Kontak</h4>
          <ul className="space-y-3 text-sm text-bone-muted">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-red shrink-0" /> Sekretariat HMTI, Gedung Informatika Lt. 2</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-red shrink-0" /> halo@hmti.id</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-red shrink-0" /> +62 812 3456 7890</li>
            <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-red shrink-0" /> Senin – Jumat, 09:00 – 17:00</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase tracking-wider text-sm text-bone mb-4">Newsletter</h4>
          <p className="text-sm text-bone-muted mb-4">Dapatkan update berita & event langsung di email kamu.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email@kamu.com"
              className="flex-1 min-w-0 px-3 h-10 rounded-md bg-ink border border-line text-sm text-bone placeholder:text-bone-dim focus:outline-none focus:border-red"
            />
            <button className="px-4 h-10 gradient-red text-bone rounded-md font-heading text-sm uppercase tracking-wider hover:shadow-red transition-shadow">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-bone-dim font-mono">
          <div>© {new Date().getFullYear()} HMTI. All rights reserved.</div>
          <div className="flex gap-4"><a href="#" className="hover:text-red">Privasi</a><a href="#" className="hover:text-red">Syarat</a></div>
          <div>Made with <span className="text-red">❤</span> by HMTI Dev Team</div>
        </div>
      </div>
    </footer>
  );
}