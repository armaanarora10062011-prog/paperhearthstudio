import { createContext, useContext, useState, type ReactNode } from "react";

export type DemoId = "web" | "leads" | "ops" | null;

interface DemoContextValue {
  activeDemo: DemoId;
  openDemo: (id: Exclude<DemoId, null>) => void;
  closeDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [activeDemo, setActiveDemo] = useState<DemoId>(null);

  const openDemo = (id: Exclude<DemoId, null>) => {
    setActiveDemo(id);
    document.body.style.overflow = "hidden";
  };

  const closeDemo = () => {
    setActiveDemo(null);
    document.body.style.overflow = "";
  };

  return <DemoContext.Provider value={{ activeDemo, openDemo, closeDemo }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
