import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Common = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  cursorLabel?: string;
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: undefined;
  };

type AsAnchor = Common & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
};

type KeyboardKeyProps = AsButton | AsAnchor;

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-[11px]",
  md: "px-4 py-2.5 text-xs",
  lg: "px-6 py-3.5 text-sm",
  xl: "px-9 py-5 text-base md:text-lg",
};

export default function KeyboardKey(props: KeyboardKeyProps) {
  const { children, className, variant = "light", size = "md", cursorLabel, ...rest } = props as any;

  const classes = cn(
    variant === "dark" ? "keycap-dark" : "keycap",
    "font-medium tracking-[0.04em] uppercase",
    sizeClasses[size],
    className
  );

  if (props.as === "a") {
    const { href, target, rel } = rest;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        data-cursor={cursorLabel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={rest.type ?? "button"} data-cursor={cursorLabel} className={classes} {...rest}>
      {children}
    </button>
  );
}
