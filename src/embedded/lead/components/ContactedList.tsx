import type { Prospect } from "../data/prospects";
import { cn } from "../utils/cn";

type ContactedRecord = {
  id: string;
  prospectId: string;
  at: string;
};

type Props = {
  records: ContactedRecord[];
  prospects: Prospect[];
  onSelect: (id: string) => void;
};

export default function ContactedList({ records, prospects, onSelect }: Props) {
  const prospectById = new Map(prospects.map((p) => [p.id, p]));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            Contacted
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Prospects you've reached out to in this session.
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
            records.length > 0
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          )}
        >
          {records.length}
        </span>
      </header>

      {records.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No contacts yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Generate a pitch and hit <span className="font-semibold">CONTACT PROSPECT</span> to log it here.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {records.map((r) => {
            const p = prospectById.get(r.prospectId);
            return (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {p?.company ?? "Unknown prospect"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Contacted {r.at}
                  </p>
                </div>
                {p && (
                  <button
                    type="button"
                    onClick={() => onSelect(p.id)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white"
                  >
                    View
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
