import type { Prospect } from "../data/prospects";
import { cn } from "../utils/cn";

type Props = {
  prospects: Prospect[];
  shortlistedIds: Set<string>;
  contactedIds: Set<string>;
  onOpen: (id: string) => void;
  onShortlist: (id: string) => void;
  onUnshortlist: (id: string) => void;
};

export default function BrowsePanel({
  prospects,
  shortlistedIds,
  contactedIds,
  onOpen,
  onShortlist,
  onUnshortlist,
}: Props) {
  if (prospects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">
          Run a search above to see matching prospects here.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            {prospects.length} matching{" "}
            {prospects.length === 1 ? "prospect" : "prospects"}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Open a card to inspect details, or shortlist the ones worth a
            personalized pitch.
          </p>
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {prospects.map((p) => {
          const shortlisted = shortlistedIds.has(p.id);
          const contacted = contactedIds.has(p.id);
          return (
            <li
              key={p.id}
              className={cn(
                "group relative flex flex-col gap-3 rounded-xl border bg-white p-4 transition-all",
                contacted
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
              )}
            >
              <button
                type="button"
                onClick={() => onOpen(p.id)}
                className="text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">
                      {p.company}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {p.website}
                    </p>
                  </div>
                  {contacted && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-700">
                      CONTACTED
                    </span>
                  )}
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <Tag>{p.industry}</Tag>
                  <Tag>{p.location}</Tag>
                  <Tag>{p.size} employees</Tag>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                  {p.description}
                </p>
                {p.contactName && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="truncate">
                      {p.contactName}
                      {p.contactRole ? ` · ${p.contactRole}` : ""}
                    </span>
                  </p>
                )}
              </button>

              <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onOpen(p.id)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Inspect
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </button>

                {shortlisted ? (
                  <button
                    type="button"
                    onClick={() => onUnshortlist(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold tracking-wide text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                    SHORTLISTED
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onShortlist(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold tracking-wide text-white hover:bg-slate-800"
                  >
                    SHORTLIST
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
      {children}
    </span>
  );
}
