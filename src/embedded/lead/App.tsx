import { useEffect, useMemo, useState } from "react";
import IdentifyPanel, { type IdentifyQuery } from "./components/IdentifyPanel";
import BrowsePanel from "./components/BrowsePanel";
import ShortlistPanel from "./components/ShortlistPanel";
import PitchPanel from "./components/PitchPanel";
import ContactedList from "./components/ContactedList";
import ProspectInspector from "./components/ProspectInspector";
import WorkflowStepper from "./components/WorkflowStepper";
import type { Prospect } from "./data/prospects";
import { cn } from "./utils/cn";

type ContactedRecord = {
  id: string;
  prospectId: string;
  at: string;
};

type StepId = "identify" | "browse" | "shortlist" | "personalize" | "contact";

function formatTimestamp(d: Date) {
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function App() {
  const [query, setQuery] = useState<IdentifyQuery | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(
    () => new Set()
  );
  const [contacted, setContacted] = useState<ContactedRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectId, setInspectId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<StepId>("identify");

  // Derive the currently selected prospect (shortlist wins, else any)
  const selectedProspect: Prospect | null = useMemo(() => {
    if (selectedId) {
      return prospects.find((p) => p.id === selectedId) ?? null;
    }
    return null;
  }, [selectedId, prospects]);

  const shortlistedProspects = useMemo(
    () => prospects.filter((p) => shortlistedIds.has(p.id)),
    [prospects, shortlistedIds]
  );

  const contactedIds = useMemo(
    () => new Set(contacted.map((c) => c.prospectId)),
    [contacted]
  );

  const contactedAtFor = (id: string) => {
    const rec = contacted.find((c) => c.prospectId === id);
    return rec ? rec.at : null;
  };

  // Auto-advance the visible step as the user progresses
  useEffect(() => {
    if (prospects.length === 0) {
      setActiveStep("identify");
      return;
    }
    if (shortlistedIds.size === 0) {
      setActiveStep("browse");
      return;
    }
    if (!selectedProspect) {
      setActiveStep("shortlist");
      return;
    }
    setActiveStep("personalize");
  }, [prospects.length, shortlistedIds.size, selectedProspect]);

  const handleResults = (items: Prospect[], q: IdentifyQuery) => {
    setQuery(q);
    setProspects(items);
    // Reset transient selection/contact history when a new search is run
    setSelectedId(null);
    setInspectId(null);
  };

  const handleShortlist = (id: string) => {
    setShortlistedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (!selectedId) setSelectedId(id);
  };

  const handleUnshortlist = (id: string) => {
    setShortlistedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (selectedId === id) {
      const remaining = prospects.filter(
        (p) => shortlistedIds.has(p.id) && p.id !== id
      );
      setSelectedId(remaining[0]?.id ?? null);
    }
  };

  const handleContact = (id: string) => {
    if (contactedIds.has(id)) return;
    const record: ContactedRecord = {
      id: `${id}-${Date.now()}`,
      prospectId: id,
      at: formatTimestamp(new Date()),
    };
    setContacted((prev) => [record, ...prev]);
  };

  const stepCounts: Record<string, number> = {
    identify: query ? 1 : 0,
    browse: prospects.length,
    shortlist: shortlistedIds.size,
    personalize: selectedProspect ? 1 : 0,
    contact: contacted.length,
  };

  const inspected = inspectId
    ? prospects.find((p) => p.id === inspectId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Header />

        <div className="mt-6">
          <WorkflowStepper
            current={activeStep}
            counts={stepCounts}
            onJump={(step) => setActiveStep(step as StepId)}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <SectionNumber n="01" active={activeStep === "identify"}>
              <IdentifyPanel onResults={handleResults} />
            </SectionNumber>

            <SectionNumber n="02" active={activeStep === "browse"}>
              <BrowsePanel
                prospects={prospects}
                shortlistedIds={shortlistedIds}
                contactedIds={contactedIds}
                onOpen={(id) => {
                  setInspectId(id);
                }}
                onShortlist={handleShortlist}
                onUnshortlist={handleUnshortlist}
              />
            </SectionNumber>

            <SectionNumber n="04" active={activeStep === "personalize"}>
              <PitchPanel
                prospect={selectedProspect}
                contactedAt={
                  selectedProspect
                    ? contactedAtFor(selectedProspect.id)
                    : null
                }
                onContact={() =>
                  selectedProspect && handleContact(selectedProspect.id)
                }
              />
            </SectionNumber>
          </div>

          <div className="space-y-5 lg:col-span-5">
            <SectionNumber n="03" active={activeStep === "shortlist"}>
              <ShortlistPanel
                prospects={shortlistedProspects}
                contactedIds={contactedIds}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(id)}
                onRemove={handleUnshortlist}
              />
            </SectionNumber>

            <SectionNumber n="05" active={activeStep === "contact"}>
              <ContactedList
                records={contacted}
                prospects={prospects}
                onSelect={(id) => {
                  setSelectedId(id);
                  setActiveStep("personalize");
                }}
              />
            </SectionNumber>

            <ResetCard
              onReset={() => {
                setQuery(null);
                setProspects([]);
                setShortlistedIds(new Set());
                setContacted([]);
                setSelectedId(null);
                setInspectId(null);
              }}
              hasAny={
                prospects.length > 0 ||
                shortlistedIds.size > 0 ||
                contacted.length > 0
              }
            />
          </div>
        </div>

        <Footer />
      </div>

      <ProspectInspector
        prospect={inspected}
        shortlisted={inspected ? shortlistedIds.has(inspected.id) : false}
        contacted={inspected ? contactedIds.has(inspected.id) : false}
        onClose={() => setInspectId(null)}
        onShortlist={() => inspected && handleShortlist(inspected.id)}
        onUnshortlist={() => inspected && handleUnshortlist(inspected.id)}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Paperhearth
            </h1>
            <span className="hidden rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white sm:inline">
              DEMO
            </span>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            Lead generation & outreach workflow for business development teams
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Fictional data
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          No real APIs connected
        </span>
      </div>
    </header>
  );
}

function SectionNumber({
  n,
  active,
  children,
}: {
  n: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "absolute -left-2 -top-2 z-10 hidden h-7 w-7 select-none items-center justify-center rounded-lg border bg-white text-[11px] font-semibold tracking-wide text-slate-700 shadow-sm sm:flex",
          active ? "border-slate-900 text-slate-900" : "border-slate-200"
        )}
      >
        {n}
      </div>
      {children}
    </div>
  );
}

function ResetCard({
  onReset,
  hasAny,
}: {
  onReset: () => void;
  hasAny: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
        RESET WORKFLOW
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Start over with a fresh search and empty shortlist.
      </p>
      <button
        type="button"
        onClick={onReset}
        disabled={!hasAny}
        className={cn(
          "mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700 transition-colors",
          "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
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
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </svg>
        RESET DEMO
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
      <p>
        Paperhearth turns messy lead-gen and outreach into a structured
        workflow.
      </p>
      <p>
        Workflow:{" "}
        <span className="font-medium text-slate-700">
          Identify · Browse · Shortlist · Personalize · Contact
        </span>
      </p>
    </footer>
  );
}
