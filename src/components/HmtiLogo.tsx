import { cn } from "@/lib/utils";

export function HmtiLogo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("hmti-logo-grid", className)}>
      <img src="/hmti-logo.jpg" alt="Logo HMTI" className={cn("hmti-logo-image", imageClassName)} />
    </span>
  );
}
