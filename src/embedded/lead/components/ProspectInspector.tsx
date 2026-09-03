import { useEffect } from "react";
import type { Prospect } from "../data/prospects";
import { cn } from "../utils/cn";

type Props = {
  prospect: Prospect | null;
  shortlisted: boolean;
  contacted: boolean;
  onClose: () => void;
  onShortlist: () => void;
  onUnshortlist: () => void;
};

export default function ProspectInspector({
  prospect,
  shortlisted,
  contacted,
  onClose,
  onShortlist,
  onUnshortlist,
}: Props) {
  useEffect(() => {
    if (!prospect) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prospect, onClose]);

  if (!prospect) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`Inspect ${prospect.company}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close inspector"
        className="flex-1 cursor-default bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
      />
      <div className="flex w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 p-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
              PROSPECT
            </p>
            <h2 className="mt-0.5 truncate text-lg font-semibold text-slate-900">
              {prospect.company}
            </h2>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-0.5 inline-block truncate text-sm text-slate-500 hover:text-slate-800"
            >
              {prospect.website}
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <Pill>{prospect.industry}</Pill>
            <Pill>{prospect.location}</Pill>
            <Pill>{prospect.size} employees</Pill>
            {contacted && <Pill tone="emerald">CONTACTED</Pill>}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            {prospect.description}
          </p>

          {prospect.contactName && (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
                POINT OF CONTACT
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {prospect.contactName}
              </p>
              {prospect.contactRole && (
                <p className="text-xs text-slate-500">{prospect.contactRole}</p>
              )}
              {prospect.contactEmail && (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {prospect.contactEmail}
                </a>
              )}
            </div>
          )}

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-slate-500">
                BUSINESS OBSERVATION
              </p>
              <p className="text-sm text-slate-700">{prospect.observation}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-slate-500">
                LIKELY PROBLEM
              </p>
              <p className="text-sm text-slate-700">{prospect.problem}</p>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-slate-200 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
          {shortlisted ? (
            <button
              type="button"
              onClick={onUnshortlist}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
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
                <path d="M5 12h14" />
              </svg>
              Remove from shortlist
            </button>
          ) : (
            <button
              type="button"
              onClick={onShortlist}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
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
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
              Shortlist
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

function Pill({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "emerald";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 font-medium",
        tone === "emerald"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      )}
    >
      {children}
    </span>
  );
}
