import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  threshold?: number;
}

export default function Reveal({ children, className, delay = 0, as: Tag = "div", threshold }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  return (
    <Tag
      ref={ref}
      data-reveal={inView ? "in" : undefined}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}
