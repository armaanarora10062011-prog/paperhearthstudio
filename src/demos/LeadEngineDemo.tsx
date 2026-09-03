import LeadEngineApp from "@/embedded/lead/App";
import DemoShell from "./DemoShell";

export default function LeadEngineDemo() {
  return (
    <DemoShell eyebrow="DEMO 02" title="Lead Generation Workflow — live demo">
      <div className="northline-lead-demo min-h-screen">
        <LeadEngineApp />
      </div>
    </DemoShell>
  );
}
