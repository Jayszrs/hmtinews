export type News = {
  slug: string; title: string; excerpt: string; category: string;
  author: string; date: string; readTime: string; image: string; featured?: boolean;
};

export type EventItem = {
  slug: string; title: string; excerpt: string; category: string;
  date: string; location: string; format: "Online" | "Offline" | "Hybrid";
  status: "Upcoming" | "Open" | "Full" | "Past"; price: string;
  capacity: number; registered: number; image: string;
};

export type Exhibit = {
  slug: string; title: string; team: string; category: string;
  tags: string[]; image: string; award?: string; year: number;
};

export type Member = {
  id: string; name: string; role: string; division: string;
  angkatan: number; company?: string; bio: string; skills: string[];
  avatar: string; type: "Pengurus" | "Anggota" | "Alumni" | "Mitra";
};

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D72323&color=F5F5F5&bold=true&size=256`;

export const news: News[] = [
  { slug: "ai-revolusi-pendidikan", title: "AI Generatif Mengubah Wajah Pendidikan Tinggi Indonesia", excerpt: "Bagaimana model bahasa besar mulai diintegrasikan ke kurikulum Teknik Informatika di berbagai kampus.", category: "AI & ML", author: "Rafi Pratama", date: "2026-05-20", readTime: "6 min", image: img("ai-edu"), featured: true },
  { slug: "workshop-react-19", title: "Workshop React 19: Server Components di Production", excerpt: "Liputan workshop intensif HMTI bersama engineer dari Tokopedia.", category: "Web Dev", author: "Sinta Maharani", date: "2026-05-18", readTime: "4 min", image: img("react19") },
  { slug: "cybersec-2026", title: "Tren Cybersecurity 2026: Zero Trust Jadi Standar", excerpt: "Riset terbaru menunjukkan adopsi arsitektur Zero Trust melonjak 240% YoY.", category: "Cybersecurity", author: "Bayu Aditya", date: "2026-05-15", readTime: "8 min", image: img("cyber") },
  { slug: "hackathon-asia", title: "Tim HMTI Lolos Final Hackathon Asia Pacific", excerpt: "Proyek SmartHarvest masuk 5 besar dari 1.200 tim peserta.", category: "Komunitas", author: "Dewi Lestari", date: "2026-05-10", readTime: "3 min", image: img("hack") },
  { slug: "rust-vs-go", title: "Rust vs Go: Pilihan Backend untuk 2026", excerpt: "Perbandingan benchmark, ergonomi, dan kurva belajar.", category: "Teknologi", author: "Andra Wijaya", date: "2026-05-08", readTime: "7 min", image: img("rustgo") },
  { slug: "mobile-flutter", title: "Flutter 4.0: Multi-Platform Tanpa Kompromi", excerpt: "Apa yang baru di rilis terbesar Flutter sepanjang sejarahnya.", category: "Mobile", author: "Citra Anggraini", date: "2026-05-05", readTime: "5 min", image: img("flutter4") },
  { slug: "riset-llm-kampus", title: "Riset LLM Bahasa Indonesia oleh Mahasiswa Informatika", excerpt: "Kolaborasi 4 kampus melahirkan model open-source 7B parameter.", category: "Riset", author: "Pandu Saputra", date: "2026-05-02", readTime: "9 min", image: img("llm-id") },
  { slug: "ux-trends", title: "5 Tren UX yang Mendominasi Aplikasi 2026", excerpt: "Dari spatial UI hingga AI-driven personalization.", category: "Web Dev", author: "Maya Putri", date: "2026-04-28", readTime: "5 min", image: img("uxtrend") },
  { slug: "open-source-id", title: "Komunitas Open Source Indonesia Tembus 50K Kontributor", excerpt: "Lonjakan signifikan setelah inisiatif HacktoberFest ID 2025.", category: "Komunitas", author: "Rio Hermawan", date: "2026-04-25", readTime: "4 min", image: img("oss-id") },
  { slug: "edge-computing", title: "Edge Computing untuk IoT Skala Kampus", excerpt: "Studi kasus deployment edge node di lingkungan akademis.", category: "Teknologi", author: "Yusuf Maulana", date: "2026-04-20", readTime: "6 min", image: img("edge") },
  { slug: "design-system-2026", title: "Membangun Design System dari Nol di Tim Kecil", excerpt: "Panduan praktis dari pengalaman tim HMTI Dev.", category: "Web Dev", author: "Nadya Kusuma", date: "2026-04-18", readTime: "8 min", image: img("ds-2026") },
  { slug: "wsl-vs-native", title: "WSL vs Native Linux: Mana untuk Dev Workflow?", excerpt: "Survei 500 developer Indonesia mengungkap preferensi mengejutkan.", category: "Teknologi", author: "Galang Pratama", date: "2026-04-12", readTime: "5 min", image: img("wsl") },
];

export const events: EventItem[] = [
  { slug: "hackathon-2026", title: "HMTI Hackathon 2026: Build for Indonesia", excerpt: "48 jam coding non-stop dengan hadiah total 50 juta rupiah.", category: "Hackathon", date: "2026-06-15", location: "Gedung Rektorat, Lt. 4", format: "Hybrid", status: "Open", price: "Gratis", capacity: 200, registered: 142, image: img("hackathon26", 1200, 700) },
  { slug: "seminar-ai-ethics", title: "Seminar Nasional: Etika AI di Era Generative", excerpt: "Diskusi panel bersama akademisi dan praktisi industri.", category: "Seminar", date: "2026-06-22", location: "Auditorium Utama", format: "Offline", status: "Open", price: "Rp 25.000", capacity: 300, registered: 87, image: img("ai-ethics", 1200, 700) },
  { slug: "workshop-nextjs", title: "Workshop Next.js 15 + Server Actions", excerpt: "Hands-on building production app dari nol.", category: "Workshop", date: "2026-07-02", location: "Lab Komputer 3", format: "Offline", status: "Upcoming", price: "Rp 50.000", capacity: 40, registered: 31, image: img("next15", 1200, 700) },
  { slug: "lomba-uiux", title: "UI/UX Design Competition 2026", excerpt: "Tantang kreativitasmu, juara dapat magang di startup unicorn.", category: "Lomba", date: "2026-07-10", location: "Online", format: "Online", status: "Open", price: "Gratis", capacity: 500, registered: 213, image: img("uiux-comp", 1200, 700) },
  { slug: "networking-mei", title: "Tech Networking Night Mei", excerpt: "Bertemu engineer dari Gojek, Tokopedia, Grab, dan lainnya.", category: "Networking", date: "2026-06-28", location: "WeWork Pacific Place", format: "Offline", status: "Full", price: "Gratis", capacity: 80, registered: 80, image: img("network-night", 1200, 700) },
  { slug: "study-group-rust", title: "Study Group: Rust Fundamentals", excerpt: "Belajar Rust bareng dari nol selama 6 minggu.", category: "Workshop", date: "2026-06-10", location: "Discord HMTI", format: "Online", status: "Open", price: "Gratis", capacity: 100, registered: 64, image: img("rust-study", 1200, 700) },
  { slug: "datathon-2026", title: "Datathon: Open Data Indonesia", excerpt: "Analisis data publik untuk dampak sosial.", category: "Hackathon", date: "2026-08-05", location: "Hybrid Campus + Online", format: "Hybrid", status: "Upcoming", price: "Gratis", capacity: 150, registered: 22, image: img("datathon", 1200, 700) },
  { slug: "career-fair", title: "IT Career Fair 2026", excerpt: "30+ perusahaan teknologi membuka rekrutmen langsung.", category: "Networking", date: "2026-09-12", location: "Aula Serbaguna", format: "Offline", status: "Upcoming", price: "Gratis", capacity: 1000, registered: 178, image: img("career-fair", 1200, 700) },
  { slug: "intro-cyber-past", title: "Intro to Cybersecurity (Recap)", excerpt: "Recap workshop pengenalan keamanan siber edisi April.", category: "Workshop", date: "2026-04-15", location: "Lab 2", format: "Offline", status: "Past", price: "Gratis", capacity: 50, registered: 50, image: img("cyber-past", 1200, 700) },
];

export const exhibits: Exhibit[] = [
  { slug: "smart-harvest", title: "SmartHarvest", team: "Tim Agritech", category: "IoT", tags: ["IoT", "ML", "Mobile"], image: img("smartharvest"), award: "Juara 1 Hackathon Asia 2026", year: 2026 },
  { slug: "lentera-edu", title: "LenteraEdu", team: "Tim EduTech", category: "Aplikasi Web", tags: ["React", "Node", "PostgreSQL"], image: img("lenteraedu"), award: "Featured", year: 2026 },
  { slug: "kasir-ai", title: "KasirAI", team: "Tim UMKM Power", category: "AI/ML", tags: ["Python", "Vision", "Flutter"], image: img("kasir-ai"), year: 2025 },
  { slug: "warung-konek", title: "WarungKonek", team: "Tim Konek", category: "Mobile App", tags: ["Flutter", "Firebase"], image: img("warung"), year: 2025 },
  { slug: "kampus-vr", title: "KampusVR", team: "Tim Imersi", category: "Game", tags: ["Unity", "C#", "VR"], image: img("kampusvr"), award: "Best UX 2025", year: 2025 },
  { slug: "secure-vote", title: "SecureVote", team: "Tim CryptoSec", category: "Aplikasi Web", tags: ["Rust", "Blockchain"], image: img("securevote"), year: 2026 },
  { slug: "tani-pintar", title: "TaniPintar Sensor", team: "Tim HardTech", category: "Hardware", tags: ["Arduino", "LoRa"], image: img("tanipintar"), year: 2025 },
  { slug: "moodly", title: "Moodly", team: "Tim Mind", category: "UI/UX", tags: ["Figma", "Research"], image: img("moodly"), award: "Featured", year: 2026 },
  { slug: "linguabot", title: "LinguaBot", team: "Tim NLP", category: "AI/ML", tags: ["Python", "NLP", "Transformers"], image: img("linguabot"), year: 2026 },
  { slug: "ride-share-kampus", title: "RideShareKampus", team: "Tim Mobility", category: "Mobile App", tags: ["React Native", "Maps"], image: img("rideshare"), year: 2025 },
  { slug: "code-arena", title: "CodeArena", team: "Tim CompetitiveProg", category: "Game", tags: ["Next.js", "WebSocket"], image: img("codearena"), year: 2026 },
  { slug: "med-track", title: "MedTrack", team: "Tim HealthTech", category: "IoT", tags: ["ESP32", "BLE"], image: img("medtrack"), year: 2025 },
];

export const members: Member[] = [
  { id: "1", name: "Rafi Pratama Aditya", role: "Ketua Umum", division: "BPH", angkatan: 2022, bio: "Full-stack developer dengan passion di developer experience dan komunitas open source.", skills: ["React", "Node.js", "TypeScript", "Leadership"], avatar: avatar("Rafi Pratama"), type: "Pengurus" },
  { id: "2", name: "Sinta Maharani Putri", role: "Sekretaris Jenderal", division: "BPH", angkatan: 2022, bio: "Tertarik pada product management dan UX research.", skills: ["Figma", "Notion", "UX Research"], avatar: avatar("Sinta Maharani"), type: "Pengurus" },
  { id: "3", name: "Bayu Aditya Wicaksana", role: "Kadiv Litbang", division: "Litbang", angkatan: 2023, bio: "Cybersecurity enthusiast, sering bicara di forum keamanan nasional.", skills: ["Pentesting", "Python", "Linux"], avatar: avatar("Bayu Aditya"), type: "Pengurus" },
  { id: "4", name: "Dewi Lestari Anjani", role: "Kadiv Eksternal", division: "Eksternal", angkatan: 2023, bio: "Membangun jembatan antara mahasiswa dan industri.", skills: ["Public Speaking", "Partnership"], avatar: avatar("Dewi Lestari"), type: "Pengurus" },
  { id: "5", name: "Andra Wijaya Saputra", role: "Software Engineer", division: "Alumni", angkatan: 2019, company: "Gojek", bio: "Backend engineer fokus pada distributed systems.", skills: ["Go", "Kafka", "K8s"], avatar: avatar("Andra Wijaya"), type: "Alumni" },
  { id: "6", name: "Citra Anggraini", role: "Mobile Engineer", division: "Alumni", angkatan: 2020, company: "Tokopedia", bio: "Flutter advocate dan speaker reguler di GDG.", skills: ["Flutter", "Dart", "Android"], avatar: avatar("Citra Anggraini"), type: "Alumni" },
  { id: "7", name: "Pandu Saputra", role: "AI Researcher", division: "Alumni", angkatan: 2018, company: "Kata.ai", bio: "Riset NLP untuk bahasa lokal Indonesia.", skills: ["PyTorch", "NLP", "Research"], avatar: avatar("Pandu Saputra"), type: "Alumni" },
  { id: "8", name: "Maya Putri Larasati", role: "Product Designer", division: "Alumni", angkatan: 2021, company: "Stripe", bio: "Designer yang juga ngoding. Eks intern Figma.", skills: ["Figma", "React", "Motion"], avatar: avatar("Maya Putri"), type: "Alumni" },
  { id: "9", name: "Rio Hermawan", role: "Anggota Aktif", division: "Media", angkatan: 2024, bio: "Content creator dan video editor untuk media HMTI.", skills: ["Premiere", "After Effects"], avatar: avatar("Rio Hermawan"), type: "Anggota" },
  { id: "10", name: "Nadya Kusuma Wardani", role: "Anggota Aktif", division: "Eventment", angkatan: 2024, bio: "Event planner dengan portofolio acara skala nasional.", skills: ["Event Management", "Sponsorship"], avatar: avatar("Nadya Kusuma"), type: "Anggota" },
  { id: "11", name: "Galang Pratama", role: "Anggota Aktif", division: "Litbang", angkatan: 2024, bio: "Backend developer dan kontributor open source.", skills: ["Rust", "Go", "PostgreSQL"], avatar: avatar("Galang Pratama"), type: "Anggota" },
  { id: "12", name: "Yusuf Maulana", role: "Anggota Aktif", division: "Litbang", angkatan: 2025, bio: "IoT hobbyist dengan banyak proyek mikrokontroler.", skills: ["Arduino", "ESP32", "C++"], avatar: avatar("Yusuf Maulana"), type: "Anggota" },
];

export const partners = [
  { name: "Gojek", industry: "Startup", alumni: 12 },
  { name: "Tokopedia", industry: "Korporat", alumni: 9 },
  { name: "Traveloka", industry: "Startup", alumni: 6 },
  { name: "Bank Mandiri", industry: "BUMN", alumni: 4 },
  { name: "Telkom Indonesia", industry: "BUMN", alumni: 8 },
  { name: "Kata.ai", industry: "Startup", alumni: 3 },
  { name: "Bukalapak", industry: "Startup", alumni: 5 },
  { name: "Microsoft Indonesia", industry: "Korporat", alumni: 2 },
];