import { useState } from "react";
import {
  COMPANY_SIZES,
  INDUSTRIES,
  LOCATIONS,
  type Prospect,
  PROSPECTS,
} from "../data/prospects";
import { cn } from "../utils/cn";

type Props = {
  onResults: (items: Prospect[], query: IdentifyQuery) => void;
};

export type IdentifyQuery = {
  industry: string;
  location: string;
  size: string;
};

export default function IdentifyPanel({ onResults }: Props) {
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [size, setSize] = useState(COMPANY_SIZES[1]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFind = () => {
    setLoading(true);
    setSearched(false);
    // Simulate a small async lookup to feel like a real internal tool
    window.setTimeout(() => {
      const items = PROSPECTS.filter((p) => {
        const matchIndustry = !industry || p.industry === industry;
        const matchLocation = !location || p.location === location;
        const matchSize = !size || p.size === size;
        return matchIndustry && matchLocation && matchSize;
      });
      // If a strict filter returns nothing, return a sensible fallback so
      // the demo always has something to show. We still surface the query.
      const results = items.length > 0 ? items : PROSPECTS.slice(0, 5);
      onResults(results, { industry, location, size });
      setSearched(true);
      setLoading(false);
    }, 450);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <header className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            Find prospects that match your ideal customer
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pick a target industry, location, and company size. Paperhearth will
            pull a short list of matching fictional businesses to work through.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Industry">
          <Select
            value={industry}
            onChange={setIndustry}
            options={INDUSTRIES}
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21h18" />
                <path d="M5 21V8l7-4 7 4v13" />
                <path d="M9 21v-6h6v6" />
              </svg>
            }
          />
        </Field>
        <Field label="Location">
          <Select
            value={location}
            onChange={setLocation}
            options={LOCATIONS}
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            }
          />
        </Field>
        <Field label="Company size">
          <Select
            value={size}
            onChange={setSize}
            options={COMPANY_SIZES}
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          {searched ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Last search: {industry} · {location} · {size}
            </span>
          ) : (
            "Tip: this demo uses fictional businesses, so the search is deterministic."
          )}
        </p>
        <button
          type="button"
          onClick={handleFind}
          disabled={loading}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all",
            "hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-70"
          )}
        >
          {loading ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Finding prospects…
            </>
          ) : (
            <>
              FIND PROSPECTS
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
            </>
          )}
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-slate-500">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pr-9 text-sm font-medium text-slate-900 shadow-sm transition-colors",
          "hover:border-slate-300 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900",
          icon ? "pl-9" : "pl-3"
        )}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
