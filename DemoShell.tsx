import { useEffect, type ReactNode } from "react";
import GeometricMark from "@/components/GeometricMark";
import KeyboardKey from "@/components/KeyboardKey";
import { useDemo } from "@/context/DemoContext";

export default function DemoShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const { closeDemo } = useDemo();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDemo();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDemo]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-paper" role="dialog" aria-modal="true" aria-label={title}>
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink/10 bg-paper/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          <GeometricMark className="h-6 w-6 text-ink" />
          <div className="leading-tight">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-blue)]">
              {eyebrow} · live demo
            </p>
            <p className="font-display text-sm font-semibold tracking-tight">{title}</p>
          </div>
        </div>
        <KeyboardKey size="sm" onClick={closeDemo} cursorLabel="CLOSE">
          ← BACK TO PAPERHEARTH
        </KeyboardKey>
      </div>
      <div>{children}</div>
    </div>
  );
}
