import { useEffect, useMemo, useState } from "react";
import type { Prospect } from "../data/prospects";
import { cn } from "../utils/cn";

type Props = {
  prospect: Prospect | null;
  contactedAt: string | null;
  onContact: () => void;
};

type PitchState = {
  observation: string;
  problem: string;
  pitch: string;
};

function buildPitch(p: Prospect): PitchState {
  const name = p.contactName?.split(" ")[0] ?? "there";
  return {
    observation: p.observation,
    problem: p.problem,
    pitch: `Hey ${name} — noticed ${p.company
      .toLowerCase()
      .includes("roasters")
      ? "your site"
      : "your team"} ${
      p.observation.charAt(0).toLowerCase() + p.observation.slice(1)
    }. There's a simple opportunity to improve ${
      p.problem.split(" ").slice(0, 6).join(" ") + "…"
    }. We help businesses like ${p.company} fix exactly this, usually inside a focused two-week sprint. Worth a 15-minute call next week to see if it's a fit?`,
  };
}

export default function PitchPanel({
  prospect,
  contactedAt,
  onContact,
}: Props) {
  const [draft, setDraft] = useState<PitchState | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [justContacted, setJustContacted] = useState(false);

  useEffect(() => {
    // Reset transient state when switching prospects
    setDraft(null);
    setCopied(false);
    setJustContacted(false);
  }, [prospect?.id]);

  const isContacted = Boolean(contactedAt);

  const handleGenerate = () => {
    if (!prospect) return;
    setGenerating(true);
    setCopied(false);
    window.setTimeout(() => {
      setDraft(buildPitch(prospect));
      setGenerating(false);
    }, 600);
  };

  const handleCopy = async () => {
    if (!draft) return;
    const text = `Observation: ${draft.observation}\n\nProblem: ${draft.problem}\n\nPitch: ${draft.pitch}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleContact = () => {
    if (!prospect) return;
    onContact();
    setJustContacted(true);
    window.setTimeout(() => setJustContacted(false), 2200);
  };

  const ctaDisabled = useMemo(
    () => !prospect || !draft || generating,
    [prospect, draft, generating]
  );

  if (!prospect) {
    return (
      <section className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-700">
          Select a shortlisted prospect
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Choose a company from the shortlist to draft a personalized pitch.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
            STEP 04 — PERSONALIZE
          </p>
          <h2 className="mt-0.5 truncate text-base font-semibold text-slate-900 sm:text-lg">
            {prospect.company}
          </h2>
          {prospect.contactName && (
            <p className="mt-0.5 truncate text-xs text-slate-500">
              Pitching {prospect.contactName}
              {prospect.contactRole ? ` · ${prospect.contactRole}` : ""}
            </p>
          )}
        </div>
        {isContacted && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Contacted {contactedAt}
          </span>
        )}
      </header>

      <div className="space-y-4">
        <Block
          label="Business observation"
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
        >
          {draft?.observation ?? (
            <Placeholder text="Generate a pitch to see the specific business observation drawn from the prospect's data." />
          )}
        </Block>

        <Block
          label="Problem"
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
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            </svg>
          }
        >
          {draft?.problem ?? (
            <Placeholder text="The problem block summarizes the underlying issue the pitch will solve." />
          )}
        </Block>

        <Block
          label="Personalized pitch"
          highlight
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
            </svg>
          }
        >
          {draft?.pitch ?? (
            <Placeholder text="Click GENERATE PITCH to draft a short, personalized outreach message." />
          )}
        </Block>
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold tracking-wide text-slate-800 shadow-sm transition-colors",
              "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            {generating ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
                Generating…
              </>
            ) : draft ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9" />
                  <path d="M3 4v5h5" />
                </svg>
                REGENERATE PITCH
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                GENERATE PITCH
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!draft}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold tracking-wide shadow-sm transition-colors",
              "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-60",
              copied ? "text-emerald-700" : "text-slate-800"
            )}
          >
            {copied ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
                COPIED
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                COPY PITCH
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleContact}
          disabled={ctaDisabled}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all",
            "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
            ctaDisabled
              ? "cursor-not-allowed bg-slate-300"
              : isContacted
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-slate-900 hover:bg-slate-800"
          )}
        >
          {justContacted || isContacted ? (
            <>
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              CONTACTED
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
              CONTACT PROSPECT →
            </>
          )}
        </button>
      </div>

      {!draft && !generating && (
        <p className="mt-3 text-xs text-slate-500">
          Generate a pitch first, then contact the prospect. The prospect will
          move to <span className="font-semibold">CONTACTED</span> with a
          timestamp.
        </p>
      )}
    </section>
  );
}

function Block({
  label,
  icon,
  highlight,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3.5",
        highlight
          ? "border-slate-900/10 bg-slate-50"
          : "border-slate-200 bg-white"
      )}
    >
      <div
        className={cn(
          "mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em]",
          highlight ? "text-slate-700" : "text-slate-500"
        )}
      >
        {icon}
        {label.toUpperCase()}
      </div>
      <div
        className={cn(
          "text-sm leading-relaxed",
          highlight ? "text-slate-900" : "text-slate-700"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return <span className="text-slate-400">{text}</span>;
}
