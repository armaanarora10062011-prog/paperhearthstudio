import { cn } from "../utils/cn";

type Step = {
  id: string;
  label: string;
  short: string;
};

const STEPS: Step[] = [
  { id: "identify", label: "IDENTIFY", short: "01" },
  { id: "browse", label: "BROWSE", short: "02" },
  { id: "shortlist", label: "SHORTLIST", short: "03" },
  { id: "personalize", label: "PERSONALIZE", short: "04" },
  { id: "contact", label: "CONTACT", short: "05" },
];

type Props = {
  current: string;
  counts: Record<string, number>;
  onJump?: (step: string) => void;
};

export default function WorkflowStepper({ current, counts, onJump }: Props) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <div className="w-full">
      <ol className="flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentIndex;
          const isComplete = idx < currentIndex;
          const isLast = idx === STEPS.length - 1;
          const count = counts[step.id] ?? 0;

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex-1 min-w-0",
                !isLast && "sm:pr-2"
              )}
            >
              <button
                type="button"
                onClick={() => onJump?.(step.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all sm:flex-col sm:items-start sm:gap-1.5 sm:px-4 sm:py-3",
                  "border-slate-200 bg-white",
                  isActive &&
                    "border-slate-900 bg-slate-900 text-white shadow-sm",
                  isComplete &&
                    "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white",
                  !isActive && !isComplete && "text-slate-500",
                  onJump && "cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold tracking-wide",
                    isActive && "bg-white/15 text-white",
                    isComplete && "bg-slate-900 text-white",
                    !isActive && !isComplete && "bg-slate-100 text-slate-500"
                  )}
                >
                  {isComplete ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  ) : (
                    step.short
                  )}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span
                    className={cn(
                      "text-[11px] font-semibold tracking-[0.14em]",
                      isActive ? "text-white" : "text-slate-500"
                    )}
                  >
                    STEP {step.short}
                  </span>
                  <span
                    className={cn(
                      "truncate text-sm font-semibold tracking-wide",
                      isActive ? "text-white" : "text-slate-900"
                    )}
                  >
                    {step.label}
                  </span>
                </span>
                {count > 0 && (
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>

              {/* Vertical connector on mobile, horizontal on sm+ */}
              {!isLast && (
                <div
                  aria-hidden
                  className="mx-auto my-1 h-3 w-px bg-slate-200 sm:hidden"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
