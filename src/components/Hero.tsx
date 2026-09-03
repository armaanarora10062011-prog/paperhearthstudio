import GeometricVisual from "./GeometricVisual";
import Reveal from "./Reveal";
import KeyboardKey from "./KeyboardKey";
import { mailto } from "@/config";
import { scrollToId } from "@/utils/scroll";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(11,11,12,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,11,12,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 md:grid-cols-2 md:px-8 lg:gap-6">
        <Reveal className="order-2 md:order-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft/60">
            independent digital studio
          </p>
          <h1 className="mt-5 text-balance font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight md:text-[3.4rem] lg:text-[3.8rem]">
            Built for the way your business{" "}
            <span className="relative whitespace-nowrap">
              actually works.
              <svg
                className="absolute -bottom-1 left-0 w-full text-[var(--color-blue)]"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 8 C80 2, 220 12, 298 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <div className="mt-7 max-w-md space-y-2 text-[15px] leading-relaxed text-ink-soft md:text-base">
            <p>paperhearth is an independent digital studio.</p>
            <p>We design and build websites, lead systems, and operational tools.</p>
            <p>We find the things slowing a business down.</p>
            <p>Then we build simple systems to make them work better.</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <KeyboardKey as="a" href={mailto("Project Inquiry")} variant="dark" size="lg" cursorLabel="OPEN →">
              START A PROJECT →
            </KeyboardKey>
            <KeyboardKey size="lg" onClick={() => scrollToId("services")}>
              WHAT WE BUILD
            </KeyboardKey>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/50">
            built for the way your business actually works.
          </p>
        </Reveal>

        <Reveal delay={120} className="order-1 flex justify-center md:order-2">
          <GeometricVisual interactive size={480} className="text-ink" />
        </Reveal>
      </div>
    </section>
  );
}
