import { useState } from "react";
import { StageFlow, type Stage } from "./components/StageFlow";
import { AnalyticsPanel } from "./components/AnalyticsPanel";
import { ReportPanel } from "./components/ReportPanel";
import { SendPanel } from "./components/SendPanel";
import { client } from "./data";
import { cn } from "./utils/cn";

export default function App() {
  const [stage, setStage] = useState<Stage>("analytics");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  const completed: Set<Stage> = new Set();
  if (reportGenerated) completed.add("analytics");
  if (reportSent) {
    completed.add("analytics");
    completed.add("report");
  }

  function handleGenerate() {
    if (generating || reportGenerated) return;
    setGenerating(true);
    setTimeout(() => {
      setReportGenerated(true);
      setGenerating(false);
      setStage("report");
    }, 900);
  }

  function handleSend() {
    if (sending || reportSent) return;
    setSending(true);
    // Allow the SendPanel's own animation to play; the actual "sent" state
    // (and the timestamp) is set there after its animation completes.
    setTimeout(() => {
      setReportSent(true);
      setSending(false);
      setStage("send");
    }, 1100);
  }

  function handleReset() {
    setReportGenerated(false);
    setReportSent(false);
    setGenerating(false);
    setSending(false);
    setStage("analytics");
  }

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#f6f5f1]/80 border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-ink text-paper flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M4 19V5l8 14V5" />
                <path d="M16 5h4" />
                <path d="M16 12h4" />
                <path d="M16 19h4" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                Paperhearth
              </div>
              <div className="text-[10px] font-mono text-muted tracking-widest uppercase">
                Operations Demo
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Connected · {client.name}
          </div>
          <button
            onClick={handleReset}
            className="text-[11px] font-mono uppercase tracking-widest text-muted hover:text-ink transition-colors flex items-center gap-1.5"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M2 8a6 6 0 1 1 1.76 4.24" />
              <path d="M2 13V8h5" />
            </svg>
            Reset
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-32">
        {/* Hero */}
        <section className="mb-6 sm:mb-10 animate-fade-up">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-3">
            Northline Studio · March 2026
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] max-w-3xl">
            From analytics to client inbox,
            <span className="italic text-muted"> on autopilot.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink/70 max-w-2xl leading-relaxed">
            A live demo of how Paperhearth replaces the monthly ritual of
            pulling numbers, building a report and emailing it — with one
            automated workflow.
          </p>
        </section>

        {/* Stage flow */}
        <section className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up delay-1">
          <StageFlow
            active={stage}
            completed={completed}
            onSelect={setStage}
          />
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-muted">
            <span className="tabular-nums">
              {completed.size + (stage === "send" && !reportSent ? 1 : 0)}
            </span>
            <span>/</span>
            <span>3 stages</span>
          </div>
        </section>

        {/* Active stage content */}
        <section className="space-y-5">
          {stage === "analytics" && (
            <AnalyticsPanel key="analytics" />
          )}
          {stage === "report" && (
            <ReportPanel key="report" generated={reportGenerated} />
          )}
          {stage === "send" && (
            <SendPanel key="send" sent={reportSent} />
          )}
        </section>

        {/* Action bar */}
        <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="pointer-events-auto rounded-2xl border border-line bg-paper/95 backdrop-blur shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] p-2.5 sm:p-3 flex items-center justify-between gap-3">
              <div className="hidden sm:block px-3 min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Current step
                </div>
                <div className="text-sm font-medium truncate">
                  {stage === "analytics" && "01 — Review analytics"}
                  {stage === "report" && "02 — Generate client report"}
                  {stage === "send" && "03 — Send to client"}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {stage === "analytics" && (
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className={cn(
                      "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ink text-paper px-5 py-3 text-sm font-medium tracking-tight transition-all",
                      "hover:bg-ink/90 active:scale-[0.98]",
                      generating && "opacity-80 cursor-wait"
                    )}
                  >
                    {generating ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        >
                          <path d="M21 12a9 9 0 1 1-6.2-8.55" />
                        </svg>
                        Generating…
                      </>
                    ) : (
                      <>
                        Generate Report
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        >
                          <path d="M3 8h10" />
                          <path d="M9 4l4 4-4 4" />
                        </svg>
                      </>
                    )}
                  </button>
                )}

                {stage === "report" && (
                  <button
                    onClick={() => setStage("send")}
                    disabled={!reportGenerated}
                    className={cn(
                      "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium tracking-tight transition-all",
                      reportGenerated
                        ? "bg-ink text-paper hover:bg-ink/90 active:scale-[0.98]"
                        : "bg-ink/10 text-muted cursor-not-allowed"
                    )}
                  >
                    {reportGenerated ? "Proceed to send" : "Generating…"}
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M3 8h10" />
                      <path d="M9 4l4 4-4 4" />
                    </svg>
                  </button>
                )}

                {stage === "send" && (
                  <button
                    onClick={handleSend}
                    disabled={sending || reportSent}
                    className={cn(
                      "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium tracking-tight transition-all",
                      reportSent
                        ? "bg-emerald-600 text-paper cursor-default"
                        : "bg-ink text-paper hover:bg-ink/90 active:scale-[0.98]",
                      sending && "opacity-80 cursor-wait"
                    )}
                  >
                    {reportSent ? (
                      <>
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8.5l3.5 3.5L13 5" />
                        </svg>
                        Report Sent
                      </>
                    ) : sending ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        >
                          <path d="M21 12a9 9 0 1 1-6.2-8.55" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send to Client
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        >
                          <path d="M2 8l12-5-3 13-3-5-6-3z" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
