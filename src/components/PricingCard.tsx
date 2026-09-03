import KeyboardKey from "./KeyboardKey";
import { mailto } from "@/config";
import { cn } from "@/utils/cn";

export interface PricingData {
  tier: string;
  price: string;
  oldPrice?: string;
  tagline: string;
  bullets: string[];
  cta: string;
  ideal?: boolean;
}

export default function PricingCard({ plan, className }: { plan: PricingData; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full w-full flex-col justify-between rounded-2xl border p-7 transition-all duration-300 md:p-9",
        plan.ideal
          ? "border-ink bg-ink text-paper shadow-[0_24px_48px_rgba(11,11,12,0.28)]"
          : "border-ink/12 bg-white text-ink hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(11,11,12,0.08)]",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "keycap px-3 py-1 text-[10px]",
              plan.ideal && "keycap-dark"
            )}
          >
            {plan.tier}
          </span>
          {plan.ideal && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-blue)]">
              recommended
            </span>
          )}
        </div>

        <div className="mt-7 flex items-baseline gap-3">
          {plan.oldPrice && (
            <span className={cn("font-mono text-lg line-through", plan.ideal ? "text-paper/40" : "text-ink-soft/40")}>
              {plan.oldPrice}
            </span>
          )}
          <span className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{plan.price}</span>
        </div>

        <p className={cn("mt-3 text-sm leading-relaxed", plan.ideal ? "text-paper/70" : "text-ink-soft")}>
          {plan.tagline}
        </p>

        <ul className="mt-7 space-y-3 text-[13.5px] leading-relaxed md:text-sm">
          {plan.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span
                className={cn(
                  "mt-[7px] h-1 w-1 shrink-0 rounded-full",
                  "bg-[var(--color-blue)]"
                )}
              />
              <span className={plan.ideal ? "text-paper/85" : "text-ink-soft"}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-9">
        <KeyboardKey
          as="a"
          href={mailto(`${plan.tier} Plan Inquiry`)}
          variant={plan.ideal ? "light" : "dark"}
          size="md"
          className="w-full justify-center"
          cursorLabel="OPEN →"
        >
          {plan.cta}
        </KeyboardKey>
      </div>
    </article>
  );
}
