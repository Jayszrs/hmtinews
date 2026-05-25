import { useRef, useState } from "react";
import { HmtiLogo } from "@/components/HmtiLogo";
import type { HmtiMember } from "@/lib/storage";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MemberCard({
  member,
  interactive = true,
}: {
  member: HmtiMember;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width - 0.5) * 20).toFixed(2);
    const rotateX = ((0.5 - y / rect.height) * 20).toFixed(2);
    setStyle({ transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setStyle({ transform: "perspective(600px) rotateX(0) rotateY(0)" })}
      className="member-card relative overflow-hidden rounded-xl border border-hmti-gold/35 p-5 text-white shadow-2xl transition duration-200"
      style={style}
    >
      <div className="card-shine" />
      <div className="relative z-10 flex items-start justify-between">
        <HmtiLogo className="h-11 w-11" />
        <span className="rounded-full border border-hmti-gold/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
          {member.status}
        </span>
      </div>
      <div className="relative z-10 mt-6 flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-hmti-gold bg-hmti-mid text-xl font-bold">
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
          ) : (
            initials(member.name)
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-heading text-xl font-bold">
            {member.name || "Nama Anggota"}
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-hmti-gold">
            {member.position || "Anggota"}
          </p>
          <p className="mt-2 text-sm text-white/70">{member.program}</p>
        </div>
      </div>
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 text-xs text-white/72">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
            NIM
          </span>
          {member.nim || "-"}
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
            Angkatan
          </span>
          {member.year || "-"}
        </div>
        <div className="col-span-2">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-hmti-gold">
            Divisi
          </span>
          {member.division || "-"}
        </div>
      </div>
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-widest text-white/60">
        <span>{member.cardNumber}</span>
        <span>HMTI UBS</span>
      </div>
    </div>
  );
}
