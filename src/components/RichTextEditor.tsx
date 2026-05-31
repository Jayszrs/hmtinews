import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";
import { useRef } from "react";

const tools = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
  { label: "H2", icon: Heading2, command: "formatBlock", value: "h2" },
  { label: "H3", icon: Heading3, command: "formatBlock", value: "h3" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" },
  { label: "List", icon: List, command: "insertUnorderedList" },
  { label: "Ordered", icon: ListOrdered, command: "insertOrderedList" },
] as const;

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    onChange(editorRef.current?.innerHTML ?? "");
  };

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
      <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            onClick={() => exec(tool.command, (tool as { value?: string }).value)}
            className="grid h-9 w-9 place-items-center rounded-md text-white/70 transition hover:bg-hmti-gold hover:text-white"
            aria-label={tool.label}
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Masukkan URL");
            if (url) exec("createLink", url);
          }}
          className="grid h-9 w-9 place-items-center rounded-md text-white/70 transition hover:bg-hmti-gold hover:text-white"
          aria-label="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl min-h-64 p-4 text-sm leading-7 text-white/80 outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
