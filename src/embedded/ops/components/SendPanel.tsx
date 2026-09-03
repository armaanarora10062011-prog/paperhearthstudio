import { useEffect, useState } from "react";
import { client, period } from "../data";
import { cn } from "../utils/cn";

type Phase = "idle" | "composing" | "sending" | "sent";

function fmtTimestamp(d: Date) {
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function SendPanel({ sent }: { sent: boolean }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [sentAt, setSentAt] = useState<Date | null>(null);

  useEffect(() => {
    if (sent) {
      setPhase("composing");
      const t1 = setTimeout(() => setPhase("sending"), 700);
      const t2 = setTimeout(() => {
        setPhase("sent");
        setSentAt(new Date());
      }, 1700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setPhase("idle");
    }
  }, [sent]);

  const subject = `Your ${period.label} Performance Report — Northline Studio`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-up">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
            Delivery · to client inbox
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight">
            Send to Client
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full transition-colors",
              phase === "sent"
                ? "bg-emerald-600"
                : phase === "sending" || phase === "composing"
                ? "bg-amber-500 animate-pulse-dot"
                : "bg-ink/20"
            )}
          />
          {phase === "idle" && "Queued"}
          {phase === "composing" && "Composing message…"}
          {phase === "sending" && "Delivering…"}
          {phase === "sent" && "Delivered"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Inbox sidebar */}
        <div className="lg:col-span-2 rounded-2xl border border-line bg-paper overflow-hidden animate-fade-up delay-1">
          <div className="px-4 py-3 border-b border-line flex items-center justify-between">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
              Inbox
            </div>
            <div className="text-[11px] font-mono text-muted">3 messages</div>
          </div>
          <ul>
            {[
              {
                from: "Eliza Whitmore",
                subj: "Re: Q2 content calendar",
                time: "9:14 AM",
                active: false,
                unread: false,
              },
              {
                from: "Paperhearth",
                subj: subject,
                time: "Just now",
                active: true,
                unread: true,
              },
              {
                from: "Field Notes",
                subj: "Your monthly digest",
                time: "Yesterday",
                active: false,
                unread: false,
              },
            ].map((m, i) => (
              <li
                key={i}
                className={cn(
                  "px-4 py-3 border-b last:border-b-0 border-line/70 cursor-pointer transition-colors",
                  m.active ? "bg-[#faf8f3]" : "hover:bg-paper/60"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {m.unread && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    )}
                    <span
                      className={cn(
                        "text-sm truncate",
                        m.unread ? "font-semibold" : "font-normal text-ink/80"
                      )}
                    >
                      {m.from}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted shrink-0">
                    {m.time}
                  </span>
                </div>
                <div
                  className={cn(
                    "text-[12px] mt-0.5 truncate",
                    m.unread ? "text-ink/85" : "text-muted"
                  )}
                >
                  {m.subj}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Email viewer */}
        <div className="lg:col-span-3 rounded-2xl border border-line bg-paper overflow-hidden animate-fade-up delay-2">
          {/* Email header */}
          <div className="px-5 sm:px-6 py-5 border-b border-line">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl sm:text-2xl font-medium leading-tight pr-4">
                {subject}
              </h3>
              {phase === "sent" && (
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest animate-fade-up">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                  Delivered
                </span>
              )}
            </div>
            <div className="mt-4 space-y-1.5 text-[12px]">
              <div className="flex flex-wrap gap-x-2">
                <span className="text-muted w-12 shrink-0">From</span>
                <span className="text-ink/85">
                  Paperhearth{" "}
                  <span className="text-muted">&lt;reports@paperhearth.io&gt;</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <span className="text-muted w-12 shrink-0">To</span>
                <span className="text-ink/85">
                  {client.contact}{" "}
                  <span className="text-muted">&lt;{client.email}&gt;</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <span className="text-muted w-12 shrink-0">Date</span>
                <span className="text-ink/85 tabular-nums">
                  {sentAt ? fmtTimestamp(sentAt) : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 sm:px-6 py-6 sm:py-7 font-display text-[15px] sm:text-base leading-relaxed text-ink/90 space-y-4">
            <p>Hi {client.contact.split(" ")[0]},</p>
            <p>
              Attached is your {period.label} performance report for{" "}
              <span className="font-medium">{client.name}</span>. It covers the
              full reporting period from {period.start} to {period.end}, with
              month-over-month comparisons against {period.comparedTo}.
            </p>

            <div
              className={cn(
                "rounded-xl border border-line bg-[#faf8f3] p-4 my-2 transition-all",
                phase === "composing" &&
                  "animate-pulse-dot [animation-duration:1.2s]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Attachment
                </div>
                <div className="text-[10px] font-mono text-muted">
                  PDF · 142 KB
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-ink text-paper flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    Northline-Report-{period.label.replace(" ", "-")}.pdf
                  </div>
                  <div className="text-[11px] text-muted">
                    {sentAt ? "Attached" : "Preparing…"}
                  </div>
                </div>
              </div>
            </div>

            <p>
              The headline: visits are up 12.4% and leads are up 18.7%, with
              conversion rate improving to 2.46%. Referral traffic from partner
              features was the standout channel this month.
            </p>
            <p>
              Happy to walk through anything in the report — just reply to this
              email.
            </p>
            <p className="text-ink/80">
              Best,
              <br />
              <span className="text-ink">The Paperhearth team</span>
            </p>
          </div>

          {/* Footer / status bar */}
          <div
            className={cn(
              "px-5 sm:px-6 py-3 border-t border-line flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono transition-colors",
              phase === "sent"
                ? "bg-emerald-50/60 text-emerald-900"
                : "bg-[#faf8f3] text-muted"
            )}
          >
            <div className="flex items-center gap-2">
              {phase === "sent" ? (
                <>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                  <span className="uppercase tracking-widest font-semibold">
                    Report Sent
                  </span>
                </>
              ) : phase === "sending" ? (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse-dot" />
                  <span className="uppercase tracking-widest">
                    Sending to {client.email}…
                  </span>
                </>
              ) : phase === "composing" ? (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse-dot" />
                  <span className="uppercase tracking-widest">
                    Composing message…
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-ink/20" />
                  <span className="uppercase tracking-widest">Ready to send</span>
                </>
              )}
            </div>
            {phase === "sent" && sentAt && (
              <div className="tabular-nums">
                {sentAt.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}{" "}
                · {sentAt.toLocaleDateString("en-US")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
