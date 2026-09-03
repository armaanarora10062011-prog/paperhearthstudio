import NorthlineWebsite from "@/embedded/web/App";
import DemoShell from "./DemoShell";

export default function WebPresenceDemo() {
  return (
    <DemoShell eyebrow="DEMO 01" title="Northline Studio — Premium Web Presence">
      <div className="northline-demo min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
        <NorthlineWebsite />
      </div>
    </DemoShell>
  );
}
