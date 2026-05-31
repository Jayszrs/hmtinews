import { cn } from "@/lib/utils";
import logo from "@/assets/hmti-logo.png";

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
        src={logo}
        alt="Logo HMTI"
        className={cn("h-full w-full object-contain", imageClassName)}
      />
    </span>
  );
}
