import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Lock, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { HmtiLogo } from "@/components/HmtiLogo";
import { loginDemo, seedInitialData } from "@/lib/storage";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    seedInitialData();
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const session = loginDemo(username, password);
    if (!session) {
      setError(true);
      window.setTimeout(() => setError(false), 550);
      return;
    }
    setSuccess(true);
    window.setTimeout(() => {
      void router.navigate({ to: session.role === "admin" ? "/admin/dashboard" : "/" });
    }, 700);
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-hmti-dark px-5 text-white">
      <div className="hmti-hero-pattern absolute inset-0 opacity-80" />
      <div className="login-overlay fixed inset-0 z-50 grid place-items-center bg-hmti-dark">
        <div className="text-center">
          <HmtiLogo className="mx-auto h-28 w-28 animate-[logoEntrance_1.2s_cubic-bezier(.2,1.2,.2,1)_both]" />
          <div className="mt-7 animate-[fade-up_.7s_1.2s_both] font-heading text-xl uppercase tracking-[0.28em] text-hmti-gold">
            HMTI — Himpunan Mahasiswa Teknik Informatika
          </div>
          <div className="mx-auto mt-8 h-1 w-72 overflow-hidden rounded-full bg-white/10">
            <div className="h-full animate-[loadingBar_.7s_1.8s_both] bg-gradient-to-r from-hmti-gold to-hmti-gold-light" />
          </div>
        </div>
      </div>

      <form
        onSubmit={submit}
        className={`relative z-10 w-full max-w-md rounded-xl border border-hmti-gold/35 bg-[#07170b]/88 p-8 shadow-2xl backdrop-blur-xl transition ${
          error ? "animate-[loginShake_.45s_ease]" : ""
        } ${success ? "[transform:rotateY(180deg)]" : ""}`}
      >
        <HmtiLogo className="mx-auto h-16 w-16" />
        <h1 className="mt-6 text-center font-display text-5xl">Login HMTI</h1>
        <p className="mt-2 text-center text-sm text-white/55">
          Demo: admin/admin123 atau member/member123
        </p>

        <div className="mt-8 space-y-5">
          <FloatingInput
            icon={UserRound}
            label="Username"
            value={username}
            onChange={setUsername}
          />
          <FloatingInput
            icon={Lock}
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          {error && <p className="text-sm text-red-300">Kredensial salah. Coba lagi.</p>}
          <button
            type="submit"
            className="relative h-12 w-full overflow-hidden rounded-md bg-hmti-gold font-heading text-sm uppercase tracking-wider text-hmti-dark transition hover:-translate-y-0.5 hover:shadow-gold"
          >
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
}

function FloatingInput({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="group relative block">
      <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hmti-gold" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        className="peer h-12 w-full rounded-md border border-white/10 bg-white/[0.04] px-10 pt-3 text-sm text-white outline-none transition focus:border-hmti-gold"
        required
      />
      <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm text-white/45 transition peer-valid:top-2 peer-valid:text-[10px] peer-valid:text-hmti-gold peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-hmti-gold">
        {label}
      </span>
    </label>
  );
}
