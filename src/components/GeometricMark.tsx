import { cn } from "@/utils/cn";

// The paperhearth mark: an outlined hexagonal prism with a single contour wave.
// Used as the compact logo mark across nav, footer, and demo shells.
export default function GeometricMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <path
        d="M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 10 L35.5 16.7 V30.3 L24 37 L12.5 30.3 V16.7 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M9 27 C15 21, 19 33, 24 24 C29 15, 33 27, 39 21"
        stroke="var(--color-blue)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
