import type { Prospect } from "../data/prospects";
import { cn } from "../utils/cn";

type Props = {
  prospects: Prospect[];
  contactedIds: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function ShortlistPanel({
  prospects,
  contactedIds,
  selectedId,
  onSelect,
  onRemove,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            Shortlist
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {prospects.length === 0
              ? "Shortlist prospects from the list to personalize outreach."
              : "Select a prospect to draft a personalized pitch."}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">
          {prospects.length}
        </span>
      </header>

      {prospects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Your shortlist is empty
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Hit <span className="font-semibold">SHORTLIST</span> on any
            prospect to bring it here.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {prospects.map((p) => {
            const isSelected = selectedId === p.id;
            const contacted = contactedIds.has(p.id);
            return (
              <li
                key={p.id}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border p-3 transition-all",
                  isSelected
                    ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelect(p.id)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold tracking-wide",
                      isSelected
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {initials(p.company)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block truncate text-sm font-semibold",
                        isSelected ? "text-white" : "text-slate-900"
                      )}
                    >
                      {p.company}
                    </span>
                    <span
                      className={cn(
                        "block truncate text-xs",
                        isSelected ? "text-slate-300" : "text-slate-500"
                      )}
                    >
                      {p.industry} · {p.location}
                    </span>
                  </span>
                  {contacted && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-700">
                      CONTACTED
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  aria-label={`Remove ${p.company} from shortlist`}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors",
                    isSelected
                      ? "text-slate-300 hover:bg-white/10 hover:text-white"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
