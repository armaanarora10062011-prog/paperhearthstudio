import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/utils/cn";

export default function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const id = `faq-${index}`;

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  }

  return (
    <div className="border-b border-ink/10">
      <h3>
        <button
          id={`${id}-header`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[var(--color-blue)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-display text-base font-medium tracking-tight md:text-lg">{question}</span>
          </span>
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/25 font-mono text-sm transition-transform duration-300",
              open && "rotate-45 border-[var(--color-blue)] text-[var(--color-blue)]"
            )}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        ref={panelRef}
        style={{
          maxHeight: open ? panelRef.current?.scrollHeight ?? 400 : 0,
        }}
        className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
      >
        <p className="max-w-2xl pb-6 pl-0 pr-10 text-[14.5px] leading-relaxed text-ink-soft md:pl-9">{answer}</p>
      </div>
    </div>
  );
}
