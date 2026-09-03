import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface GeometricVisualProps {
  className?: string;
  interactive?: boolean;
  size?: number;
  spin?: boolean;
}

/**
 * The recurring paperhearth motif: an outlined hexagonal prism with
 * flowing contour lines. Reacts subtly to cursor position when interactive.
 */
export default function GeometricVisual({ className, interactive = false, size = 560, spin = false }: GeometricVisualProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!interactive || reducedMotion) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    function handlePointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current = { x: px, y: py };
    }

    function tick() {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * 0.06;
      cur.y += (tgt.y - cur.y) * 0.06;
      if (wrap) {
        wrap.style.transform = `rotateX(${(-cur.y * 10).toFixed(2)}deg) rotateY(${(cur.x * 14).toFixed(2)}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handlePointerMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, reducedMotion]);

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={wrapRef}
        className={cn(
          "will-change-transform transition-transform duration-500 ease-out",
          spin && !reducedMotion ? "animate-[ph-spin_26s_linear_infinite]" : ""
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 600 600"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full h-auto"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeOpacity="0.85">
            <path d="M300 40 L520 165 V415 L300 540 L80 415 V165 Z" strokeWidth="1.4" />
            <path d="M300 100 L462 192.5 V377.5 L300 470 L138 377.5 V192.5 Z" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M300 160 L404 220 V340 L300 400 L196 340 V220 Z" strokeWidth="0.8" strokeOpacity="0.32" />
          </g>
          <g strokeLinecap="round" fill="none">
            <path
              d="M60 330 C140 280, 190 400, 260 340 C330 280, 380 420, 460 350 C500 315, 520 330, 545 310"
              stroke="var(--color-blue)"
              strokeWidth="2"
            />
            <path
              d="M55 365 C150 330, 210 430, 290 380 C360 335, 400 440, 480 390"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeWidth="1.2"
            />
            <path
              d="M75 300 C160 260, 200 360, 280 300"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </g>
          {[
            [300, 40],
            [520, 165],
            [520, 415],
            [300, 540],
            [80, 415],
            [80, 165],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3.2} fill="currentColor" />
          ))}
          <circle cx="300" cy="290" r="3.5" fill="var(--color-blue)" />
        </svg>
      </div>
    </div>
  );
}
