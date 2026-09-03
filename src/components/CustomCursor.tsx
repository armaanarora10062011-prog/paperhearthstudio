import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || reducedMotion) return;

    function handleMove(e: PointerEvent) {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const withLabel = target?.closest<HTMLElement>("[data-cursor]");
      setVisible(true);
      setLabel(withLabel?.dataset.cursor ?? null);
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      aria-hidden="true"
    >
      {visible && label && (
        <span className="flex -translate-x-1/2 translate-y-4 items-center whitespace-nowrap rounded-full border border-ink bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink shadow-sm">
          {label}
        </span>
      )}
    </div>
  );
}
