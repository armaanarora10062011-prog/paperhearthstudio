import { useDemo, type DemoId } from "@/context/DemoContext";
import { cn } from "@/utils/cn";

export interface ServiceData {
  id: Exclude<DemoId, null>;
  index: string;
  name: string;
  price: string;
  bullets: string[];
}

export default function ServiceCard({ service, className }: { service: ServiceData; className?: string }) {
  const { openDemo } = useDemo();

  return (
    <article
      className={cn(
        "group flex h-full w-full flex-col justify-between rounded-2xl border border-ink/12 bg-white p-7 shadow-[0_1px_0_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_18px_36px_rgba(11,11,12,0.1)] md:p-9",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--color-blue)] transition-transform duration-300 group-hover:translate-x-1">
            [{service.index}]
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">service</span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-[1.7rem]">{service.name}</h3>
        <p className="mt-2 font-mono text-xl text-ink md:text-2xl">{service.price}</p>

        <ul className="mt-6 space-y-2.5 text-[13.5px] leading-relaxed text-ink-soft md:text-sm">
          {service.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-blue)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => openDemo(service.id)}
        data-cursor="VIEW →"
        className="mt-8 inline-flex items-center gap-2 self-start font-mono text-xs font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:text-[var(--color-blue)]"
      >
        View demo
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </button>
    </article>
  );
}
