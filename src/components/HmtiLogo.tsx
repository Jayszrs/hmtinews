import { cn } from "@/lib/utils";

export function HmtiLogo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("inline-grid place-items-center", className)}>
      <img
        src="/hmti-logo.jpg"
        alt="Logo HMTI"
        className={cn("h-full w-full rounded-sm object-contain", imageClassName)}
      />
    </span>
  );
}
