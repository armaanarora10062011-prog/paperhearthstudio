import { useEffect, useState } from "react";
import {
  client,
  metrics,
  period,
  previousPeriod,
  topPages,
  trafficSources,
} from "../data";
import { cn } from "../utils/cn";

const summaryText = `March was a strong month for Northline Studio. Website traffic grew meaningfully versus February, with paid and organic channels continuing to drive the majority of qualified sessions. Lead volume increased at a faster rate than visits, indicating that recent on-site refinements are converting browsers into inquiries more effectively. Conversion rate crossed the 2.4% mark for the first time this year, and the brand-identity service page overtook the homepage as the most-viewed asset, suggesting growing inbound intent. Recommended next steps: maintain current content cadence, double down on the referral partnerships that showed the largest month-over-month lift, and review the slight dip in average session duration.`;

const notableChanges = [
  {
    tag: "Positive",
    text: "Referral traffic up 18.4% — partner feature on Field Notes drove a sustained lift mid-month.",
  },
  {
    tag: "Positive",
    text: "Brand-identity service page became the top entry point, overtaking the homepage for the first time.",
  },
  {
    tag: "Positive",
    text: "Conversion rate improved by 0.31 pts to 2.46%, the strongest reading this quarter.",
  },
  {
    tag: "Watch",
    text: "Average session duration shortened by 4.2% — consider tightening above-the-fold messaging.",
  },
];

function buildReport() {
  return {
    id: `NL-${new Date().getFullYear()}-03`,
    generatedAt: new Date(),
    metrics: metrics.map((m) => ({ ...m })),
    pages: topPages.slice(0, 4),
    sources: trafficSources.slice(0, 4),
    previous: previousPeriod,
    period,
    client,
    summary: summaryText,
    notable: notableChanges,
  };
}

export function ReportPanel({ generated }: { generated: boolean }) {
  const [report, setReport] = useState(buildReport);
  const [step, setStep] = useState(0);

  // When "generated" flips to true, play a small generation animation
  useEffect(() => {
    if (generated) {
      setReport(buildReport());
      setStep(0);
      const intervals = [180, 360, 540, 720, 900, 1080];
      const timers = intervals.map((ms) =>
        setTimeout(() => setStep((s) => s + 1), ms)
      );
      return () => timers.forEach(clearTimeout);
    } else {
      setStep(0);
    }
  }, [generated]);

  const reveal = (n: number) => step >= n;

  const visits = report.metrics.find((m) => m.label === "Website Visits")!;
  const leads = report.metrics.find((m) => m.label === "Leads")!;
  const cvr = report.metrics.find((m) => m.label === "Conversion Rate")!;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-up">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
            Client report · auto-generated
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight">
            {period.label} Report
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              generated ? "bg-emerald-600" : "bg-ink/20"
            )}
          />
          {generated ? `Draft ready · ${report.id}` : "Awaiting analytics"}
        </div>
      </div>

      {/* Report document */}
      <article
        className={cn(
          "rounded-2xl border border-line bg-paper overflow-hidden transition-all",
          !generated && "opacity-50 grayscale"
        )}
      >
        {/* Cover */}
        <div
          className={cn(
            "px-6 sm:px-10 py-8 sm:py-12 border-b border-line bg-gradient-to-br from-paper to-[#faf8f3] transition-all",
            reveal(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted">
            <span>Paperhearth · Report</span>
            <span>{report.id}</span>
          </div>
          <div className="mt-10 sm:mt-16">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
              Prepared for
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-medium tracking-tight mt-2">
              {client.name}
            </h3>
            <div className="mt-2 text-sm text-ink/70">
              Attn: {client.contact}
            </div>
          </div>
          <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-6 border-t border-line/80">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                Reporting period
              </div>
              <div className="text-base sm:text-lg font-medium mt-1 tabular-nums">
                {period.start} – {period.end}
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                Issued
              </div>
              <div className="text-base sm:text-lg font-medium mt-1 tabular-nums">
                {report.generatedAt.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <section
          className={cn(
            "px-6 sm:px-10 py-7 sm:py-9 border-b border-line transition-all",
            reveal(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-4">
            Key metrics
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {[
              { m: visits, prev: report.previous.visits.toLocaleString() },
              { m: leads, prev: report.previous.leads.toLocaleString() },
              {
                m: cvr,
                prev: `${report.previous.conversion}%`,
                noDelta: true,
              },
            ].map(({ m, prev, noDelta }) => {
              const positive = m.delta >= 0;
              return (
                <div key={m.label} className="bg-paper p-5">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
                    {m.label}
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl sm:text-4xl font-display font-medium tabular-nums">
                      {m.value}
                    </span>
                    {m.unit && (
                      <span className="text-lg text-muted font-display">
                        {m.unit}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] font-mono">
                    {!noDelta && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-0.5",
                          positive ? "text-emerald-700" : "text-rose-700"
                        )}
                      >
                        {positive ? "▲" : "▼"} {Math.abs(m.delta).toFixed(1)}%
                      </span>
                    )}
                    {noDelta && (
                      <span className="text-emerald-700">
                        ▲ {m.delta.toFixed(2)} pts
                      </span>
                    )}
                    <span className="text-muted">vs. {prev}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Traffic summary */}
        <section
          className={cn(
            "px-6 sm:px-10 py-7 sm:py-9 border-b border-line transition-all",
            reveal(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-4">
            Traffic summary
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-display text-lg mb-3">Top pages</h4>
              <ol className="space-y-2">
                {report.pages.map((p, i) => (
                  <li
                    key={p.path}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[10px] text-muted tabular-nums w-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate font-mono text-ink/85">
                        {p.path}
                      </span>
                    </span>
                    <span className="tabular-nums text-ink/80 shrink-0">
                      {p.views.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="font-display text-lg mb-3">Channel mix</h4>
              <div className="space-y-2">
                {report.sources.map((s) => (
                  <div key={s.source}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink/85">{s.source}</span>
                      <span className="tabular-nums text-ink/80">
                        {s.share.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1 bg-line/60 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-ink rounded-full animate-progress"
                        style={
                          { ["--w" as string]: `${s.share}%` } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Summary prose */}
        <section
          className={cn(
            "px-6 sm:px-10 py-7 sm:py-9 border-b border-line transition-all",
            reveal(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-4">
            Summary
          </div>
          <p className="font-display text-lg sm:text-xl leading-relaxed text-ink/90 max-w-3xl">
            {report.summary}
          </p>
        </section>

        {/* Notable changes */}
        <section
          className={cn(
            "px-6 sm:px-10 py-7 sm:py-9 transition-all",
            reveal(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-4">
            Notable changes
          </div>
          <ul className="space-y-3">
            {report.notable.map((n, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span
                  className={cn(
                    "shrink-0 mt-0.5 inline-flex items-center px-2 h-5 rounded-full text-[10px] font-mono uppercase tracking-widest border",
                    n.tag === "Positive"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  )}
                >
                  {n.tag}
                </span>
                <span className="text-ink/85">{n.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div
          className={cn(
            "px-6 sm:px-10 py-5 bg-[#faf8f3] border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-all",
            reveal(5) ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-[11px] font-mono text-muted">
            Generated automatically by Paperhearth · {report.id}
          </div>
          <div className="text-[11px] font-mono text-muted">
            Page 1 / 1
          </div>
        </div>
      </article>
    </div>
  );
}
