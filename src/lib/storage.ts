export const KEYS = {
  BERITA: "hmti_berita",
  EVENTS: "hmti_events",
  MEMBERS: "hmti_members",
  AUTH: "hmti_auth_session",
  SETTINGS: "hmti_settings",
} as const;

export type NewsStatus = "Draft" | "Publish";
export type EventStatus = "Draft" | "Publish" | "Arsip";
export type MemberStatus = "Aktif" | "Non-Aktif" | "Alumni";
export type Role = "admin" | "member";

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Akademik" | "Organisasi" | "Event" | "Pengumuman" | "Lainnya";
  author: string;
  date: string;
  status: NewsStatus;
  tags: string[];
  thumbnail: string;
};

export type HmtiEvent = {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  registrationUrl: string;
  capacity: number;
  tags: string[];
  status: EventStatus;
  banner: string;
};

export type HmtiMember = {
  id: string;
  cardNumber: string;
  name: string;
  nim: string;
  program: string;
  year: string;
  division: string;
  position: string;
  email: string;
  phone: string;
  status: MemberStatus;
  photo?: string;
};

export type AuthSession = {
  username: string;
  role: Role;
  name: string;
  loggedInAt: string;
};

export type HmtiSettings = {
  theme: "dark" | "light";
};

const img = (seed: string, w = 1200, h = 675) =>
  `https://picsum.photos/seed/hmti-${seed}/${w}/${h}`;

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getAll<T>(key: string): T[] {
  return read<T[]>(key, []);
}

export function getById<T extends { id: string }>(key: string, id: string): T | null {
  return getAll<T>(key).find((item) => item.id === id) ?? null;
}

export function save<T extends { id: string }>(key: string, item: T): void {
  const rows = getAll<T>(key);
  const index = rows.findIndex((row) => row.id === item.id);
  const next = index >= 0 ? rows.map((row) => (row.id === item.id ? item : row)) : [item, ...rows];
  write(key, next);
}

export function remove(key: string, id: string): void {
  write(
    key,
    getAll<{ id: string }>(key).filter((item) => item.id !== id),
  );
}

export function getSettings(): HmtiSettings {
  return read<HmtiSettings>(KEYS.SETTINGS, { theme: "dark" });
}

export function setSettings(settings: HmtiSettings) {
  write(KEYS.SETTINGS, settings);
}

export function getAuthSession(): AuthSession | null {
  return read<AuthSession | null>(KEYS.AUTH, null);
}

export function loginDemo(username: string, password: string): AuthSession | null {
  const match =
    username === "admin" && password === "admin123"
      ? ({ role: "admin", name: "Admin HMTI" } as const)
      : username === "member" && password === "member123"
        ? ({ role: "member", name: "Member HMTI" } as const)
        : null;

  if (!match) return null;

  const session: AuthSession = {
    username,
    role: match.role,
    name: match.name,
    loggedInAt: new Date().toISOString(),
  };
  write(KEYS.AUTH, session);
  return session;
}

export function logoutDemo() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(KEYS.AUTH);
}

export function createNews(values: Partial<NewsPost> & Pick<NewsPost, "title" | "content">) {
  const title = values.title.trim();
  return {
    id: values.id ?? generateId(),
    slug: values.slug ?? toSlug(title),
    title,
    excerpt: values.excerpt ?? values.content.replace(/<[^>]+>/g, "").slice(0, 150),
    content: values.content,
    category: values.category ?? "Organisasi",
    author: values.author ?? "Admin HMTI",
    date: values.date ?? new Date().toISOString().slice(0, 10),
    status: values.status ?? "Publish",
    tags: values.tags ?? [],
    thumbnail: values.thumbnail ?? img(title),
  } satisfies NewsPost;
}

export function createEvent(values: Partial<HmtiEvent> & Pick<HmtiEvent, "title" | "description">) {
  const startAt = values.startAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString();
  return {
    id: values.id ?? generateId(),
    title: values.title,
    description: values.description,
    startAt,
    endAt: values.endAt ?? new Date(new Date(startAt).getTime() + 1000 * 60 * 60 * 4).toISOString(),
    location: values.location ?? "Kampus Universitas Bani Saleh",
    registrationUrl: values.registrationUrl ?? "#",
    capacity: values.capacity ?? 100,
    tags: values.tags ?? [],
    status: values.status ?? "Publish",
    banner: values.banner ?? img(values.title),
  } satisfies HmtiEvent;
}

export function createMember(values: Partial<HmtiMember> & Pick<HmtiMember, "name" | "nim">) {
  const id = values.id ?? generateId();
  return {
    id,
    cardNumber: values.cardNumber ?? `HMTI-${id.slice(0, 4).toUpperCase()}`,
    name: values.name,
    nim: values.nim,
    program: values.program ?? "Teknik Informatika",
    year: values.year ?? "2024",
    division: values.division ?? "Teknologi Informasi",
    position: values.position ?? "Anggota",
    email: values.email ?? "",
    phone: values.phone ?? "",
    status: values.status ?? "Aktif",
    photo: values.photo,
  } satisfies HmtiMember;
}

const seedNews: NewsPost[] = [
  createNews({
    title: "HMTI Resmikan Kabinet Akselerasi Digital",
    excerpt: "Kepengurusan baru membawa fokus kolaborasi, riset mahasiswa, dan program industri.",
    category: "Organisasi",
    author: "Redaksi HMTI",
    date: "2026-05-20",
    thumbnail: img("kabinet"),
    content:
      "<h2>Kabinet baru resmi berjalan</h2><p>HMTI Universitas Bani Saleh memulai periode kepengurusan baru dengan fokus pada penguatan komunitas teknologi, program mentoring, dan kolaborasi lintas angkatan.</p>",
  }),
  createNews({
    title: "Workshop React 19 dan TanStack Start Dibuka",
    excerpt: "Sesi hands-on untuk mahasiswa yang ingin membangun aplikasi web modern.",
    category: "Akademik",
    author: "Divisi Akademik",
    date: "2026-05-18",
    thumbnail: img("react"),
    content:
      "<p>Workshop ini membahas routing, server rendering, state management, dan deployment modern untuk aplikasi React produksi.</p>",
  }),
  createNews({
    title: "Open Recruitment Panitia TechFest 2026",
    excerpt: "Kesempatan bergabung dalam tim event teknologi tahunan terbesar HMTI.",
    category: "Event",
    author: "Divisi Event",
    date: "2026-05-14",
    thumbnail: img("techfest"),
    content:
      "<p>TechFest 2026 membuka rekrutmen panitia untuk bidang acara, publikasi, sponsorship, dan teknologi.</p>",
  }),
  createNews({
    title: "Pengumuman Jadwal Study Group Semester Ini",
    excerpt: "Materi meliputi UI/UX, backend, cybersecurity, dan mobile development.",
    category: "Pengumuman",
    author: "BPH HMTI",
    date: "2026-05-10",
    thumbnail: img("study-group"),
    content:
      "<p>Study group semester ini berjalan setiap pekan dengan mentor dari pengurus, alumni, dan praktisi industri.</p>",
  }),
  createNews({
    title: "Tim HMTI Menang Kompetisi UI/UX Nasional",
    excerpt: "Karya mahasiswa Informatika meraih penghargaan untuk solusi layanan kampus.",
    category: "Akademik",
    author: "Media HMTI",
    date: "2026-05-04",
    thumbnail: img("uiux"),
    content:
      "<p>Tim HMTI meraih juara melalui riset pengguna yang matang, prototipe interaktif, dan presentasi produk yang solid.</p>",
  }),
];

const now = Date.now();
const seedEvents: HmtiEvent[] = [
  createEvent({
    title: "TechFest HMTI 2026",
    description: "Festival teknologi dengan seminar, kompetisi, pameran karya, dan networking.",
    startAt: new Date(now + 1000 * 60 * 60 * 48).toISOString(),
    endAt: new Date(now + 1000 * 60 * 60 * 56).toISOString(),
    location: "Auditorium Universitas Bani Saleh",
    capacity: 450,
    tags: ["festival", "seminar", "kompetisi"],
    banner: img("festival"),
  }),
  createEvent({
    title: "Kelas Intensif Cybersecurity",
    description: "Pelatihan dasar keamanan web, threat modelling, dan praktik CTF.",
    startAt: new Date(now - 1000 * 60 * 60).toISOString(),
    endAt: new Date(now + 1000 * 60 * 60 * 3).toISOString(),
    location: "Lab Komputer 2",
    capacity: 60,
    tags: ["security", "ctf"],
    banner: img("cyber"),
  }),
  createEvent({
    title: "Seminar Karier Alumni",
    description: "Diskusi karier bersama alumni HMTI yang bekerja di industri teknologi.",
    startAt: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
    endAt: new Date(now - 1000 * 60 * 60 * 24 * 10 + 1000 * 60 * 60 * 2).toISOString(),
    location: "Ruang Serbaguna",
    capacity: 120,
    tags: ["karier", "alumni"],
    banner: img("career"),
  }),
];

const seedMembers: HmtiMember[] = [
  createMember({
    name: "Rafi Pratama",
    nim: "221001001",
    year: "2022",
    position: "Ketua",
    division: "BPH",
  }),
  createMember({
    name: "Sinta Maharani",
    nim: "221001015",
    year: "2022",
    position: "Sekretaris",
    division: "BPH",
  }),
  createMember({
    name: "Bayu Aditya",
    nim: "231001020",
    year: "2023",
    position: "Kadiv",
    division: "Akademik",
  }),
  createMember({
    name: "Dewi Lestari",
    nim: "231001033",
    year: "2023",
    position: "Kadiv",
    division: "Hubungan Masyarakat",
  }),
  createMember({ name: "Rio Hermawan", nim: "241001044", year: "2024", division: "Minat Bakat" }),
  createMember({ name: "Nadya Kusuma", nim: "241001050", year: "2024", division: "Sosial" }),
  createMember({
    name: "Galang Pratama",
    nim: "251001008",
    year: "2025",
    division: "Teknologi Informasi",
  }),
  createMember({
    name: "Yusuf Maulana",
    nim: "251001013",
    year: "2025",
    division: "Kewirausahaan",
  }),
];

export function seedInitialData() {
  if (!canUseStorage()) return;
  if (!window.localStorage.getItem(KEYS.BERITA)) write(KEYS.BERITA, seedNews);
  if (!window.localStorage.getItem(KEYS.EVENTS)) write(KEYS.EVENTS, seedEvents);
  if (!window.localStorage.getItem(KEYS.MEMBERS)) write(KEYS.MEMBERS, seedMembers);
  if (!window.localStorage.getItem(KEYS.SETTINGS)) write(KEYS.SETTINGS, { theme: "dark" });
}
