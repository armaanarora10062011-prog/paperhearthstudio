import {
  metrics,
  period,
  topPages,
  trafficSources,
  daily,
  previousPeriod,
} from "../data";
import { LeadsBars, VisitsChart } from "./Sparkline";
import { cn } from "../utils/cn";

function Delta({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-mono text-[11px] tracking-tight tabular-nums",
        positive ? "text-emerald-700" : "text-rose-700"
      )}
    >
      <svg
        viewBox="0 0 8 8"
        className={cn("h-2 w-2", !positive && "rotate-180")}
        fill="currentColor"
      >
        <path d="M4 0L8 6H0L4 0Z" />
      </svg>
      {positive ? "+" : ""}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}

function MetricCard({
  label,
  value,
  unit,
  delta,
  sub,
  index,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: number;
  sub?: string;
  index: number;
}) {
  return (
    <div
      className="rounded-2xl border border-line bg-paper p-4 sm:p-5 flex flex-col gap-3 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
          {label}
        </span>
        <Delta value={delta} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-display font-medium tracking-tight tabular-nums text-ink">
          {value}
        </span>
        {unit && (
          <span className="text-lg sm:text-xl text-muted font-display">
            {unit}
          </span>
        )}
      </div>
      {sub && <div className="text-[11px] text-muted">{sub}</div>}
    </div>
  );
}

export function AnalyticsPanel() {
  const peakDay = daily.reduce(
    (acc, d) => (d.visits > acc.visits ? d : acc),
    daily[0]
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-up">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
            Reporting period · {period.start} – {period.end}
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight">
            March 2026 Performance
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
          </span>
          LIVE · Synced 2 min ago
        </div>
      </div>

      {/* Metric grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} {...m} index={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="md:col-span-2 rounded-2xl border border-line bg-paper p-4 sm:p-5 animate-fade-up delay-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
                Daily visits
              </div>
              <div className="text-sm text-ink/80 mt-0.5">
                Peak on day {peakDay.day} ·{" "}
                <span className="tabular-nums">
                  {peakDay.visits.toLocaleString()}
                </span>{" "}
                visits
              </div>
            </div>
            <div className="text-[11px] font-mono text-muted">31 days</div>
          </div>
          <VisitsChart />
          <div className="flex justify-between text-[10px] font-mono text-muted mt-2">
            <span>Mar 1</span>
            <span>Mar 10</span>
            <span>Mar 20</span>
            <span>Mar 31</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 animate-fade-up delay-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
                Leads per day
              </div>
              <div className="text-sm text-ink/80 mt-0.5">
                <span className="tabular-nums">1,184</span> total
              </div>
            </div>
          </div>
          <LeadsBars />
          <div className="flex justify-between text-[10px] font-mono text-muted mt-2">
            <span>0</span>
            <span>15</span>
            <span>31</span>
          </div>
        </div>
      </div>

      {/* Lists row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Top pages */}
        <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 animate-fade-up delay-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
              Top pages
            </div>
            <div className="text-[11px] font-mono text-muted">by views</div>
          </div>
          <div className="space-y-2.5">
            {topPages.map((p, i) => {
              const max = topPages[0].views;
              const w = (p.views / max) * 100;
              return (
                <div key={p.path} className="group">
                  <div className="flex items-center justify-between gap-3 text-[13px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-muted w-4 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate font-mono text-ink/85">
                        {p.path}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="tabular-nums font-medium">
                        {p.views.toLocaleString()}
                      </span>
                      <Delta value={p.delta} />
                    </div>
                  </div>
                  <div className="mt-1.5 h-1 bg-line/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ink/80 rounded-full animate-progress"
                      style={{ ["--w" as string]: `${w}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 animate-fade-up delay-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
              Traffic sources
            </div>
            <div className="text-[11px] font-mono text-muted">share %</div>
          </div>

          {/* Stacked bar */}
          <div className="flex h-2 rounded-full overflow-hidden mb-4 bg-line/60">
            {trafficSources.map((s, i) => (
              <div
                key={s.source}
                className="h-full"
                style={{
                  width: `${s.share}%`,
                  backgroundColor: [
                    "#0a0a0a",
                    "#3a3a36",
                    "#6b6b66",
                    "#9a9a93",
                    "#c7c5be",
                    "#e6e3dc",
                  ][i],
                }}
                title={`${s.source} ${s.share}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {trafficSources.map((s, i) => (
              <div
                key={s.source}
                className="flex items-center justify-between text-[13px]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2 w-2 rounded-sm shrink-0"
                    style={{
                      backgroundColor: [
                        "#0a0a0a",
                        "#3a3a36",
                        "#6b6b66",
                        "#9a9a93",
                        "#c7c5be",
                        "#e6e3dc",
                      ][i],
                    }}
                  />
                  <span className="truncate text-ink/85">{s.source}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="tabular-nums font-medium">
                    {s.share.toFixed(1)}%
                  </span>
                  <Delta value={s.change} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Previous period comparison strip */}
      <div className="rounded-2xl border border-dashed border-line bg-paper/50 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 sm:gap-4 animate-fade-up delay-7">
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
          vs. {period.comparedTo}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px]">
          <div className="flex items-center gap-1.5">
            <span className="text-muted">Visits</span>
            <span className="tabular-nums font-medium">
              {previousPeriod.visits.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted">Leads</span>
            <span className="tabular-nums font-medium">
              {previousPeriod.leads.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted">CVR</span>
            <span className="tabular-nums font-medium">
              {previousPeriod.conversion}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted">Session</span>
            <span className="tabular-nums font-medium">
              {previousPeriod.session}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
