import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";

function readFile(file: File, onChange: (value: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onChange(String(reader.result));
  reader.readAsDataURL(file);
}

export function ImageUpload({
  label,
  value,
  onChange,
  ratio = "aspect-video",
  round = false,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  ratio?: string;
  round?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB.");
      return;
    }
    readFile(file, onChange);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/80">{label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
        onDragOver={(event) => event.preventDefault()}
        className={`${ratio} w-full overflow-hidden border border-dashed border-hmti-gold/45 bg-white/[0.03] text-white/70 transition hover:border-hmti-gold ${
          round ? "rounded-full" : "rounded-lg"
        }`}
      >
        {value ? (
          <span className="relative block h-full w-full">
            <img src={value} alt={label} className="h-full w-full object-cover" />
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-hmti-dark/80">
              <X className="h-4 w-4" />
            </span>
          </span>
        ) : (
          <span className="flex h-full min-h-36 flex-col items-center justify-center gap-2 px-4 text-center">
            <ImagePlus className="h-8 w-8 text-hmti-gold" />
            <span className="font-heading uppercase tracking-wider">{label}</span>
            <span className="text-xs text-white/50">
              Klik atau drag & drop JPG, PNG, WebP maks 5MB
            </span>
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  );
}
