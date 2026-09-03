import OperationsApp from "@/embedded/ops/App";
import DemoShell from "./DemoShell";

export default function OperationsSprintDemo() {
  return (
    <DemoShell eyebrow="DEMO 03" title="Northline Studio — Operations Automation">
      <div className="northline-ops-demo min-h-screen">
        <OperationsApp />
      </div>
    </DemoShell>
  );
}
