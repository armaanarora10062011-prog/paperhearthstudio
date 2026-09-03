import { cn } from "../utils/cn";

type Stage = "analytics" | "report" | "send";

const stages: { id: Stage; num: string; title: string }[] = [
  { id: "analytics", num: "01", title: "Analytics" },
  { id: "report", num: "02", title: "Report" },
  { id: "send", num: "03", title: "Client" },
];

export function StageFlow({
  active,
  completed,
  onSelect,
}: {
  active: Stage;
  completed: Set<Stage>;
  onSelect: (s: Stage) => void;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {stages.map((s, i) => {
        const isActive = s.id === active;
        const isDone = completed.has(s.id);
        const reachable = isDone || isActive;
        return (
          <div key={s.id} className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => reachable && onSelect(s.id)}
              disabled={!reachable}
              className={cn(
                "group flex items-center gap-2 sm:gap-3 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-all",
                isActive
                  ? "bg-ink text-paper"
                  : isDone
                  ? "bg-paper text-ink border border-line hover:border-ink/40 cursor-pointer"
                  : "bg-transparent text-ink/35 border border-line/60 cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] sm:text-[11px] tracking-widest",
                  isActive ? "text-paper/70" : isDone ? "text-muted" : "text-ink/30"
                )}
              >
                {isDone && !isActive ? "✓" : s.num}
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-tight">
                {s.title}
              </span>
            </button>
            {i < stages.length - 1 && (
              <div
                className={cn(
                  "h-px w-6 sm:w-10 transition-colors",
                  isDone ? "bg-ink" : "bg-line"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export type { Stage };
