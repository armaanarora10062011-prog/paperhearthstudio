import { cn } from "@/utils/cn";

export default function SectionLabel({
  index,
  label,
  className,
  light,
}: {
  index: string;
  label: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase",
        light ? "text-white/60" : "text-ink-soft/60",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-[var(--color-blue)]" : "bg-[var(--color-blue)]")} />
      <span>[ {index} ]</span>
      <span>{label}</span>
    </div>
  );
}
