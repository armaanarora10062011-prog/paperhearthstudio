import Reveal from "./Reveal";
import KeyboardKey from "./KeyboardKey";
import GeometricVisual from "./GeometricVisual";
import { mailto } from "@/config";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-ink/10 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.06]">
        <GeometricVisual size={780} className="text-ink" />
      </div>

      <div className="mx-auto flex max-w-[900px] flex-col items-center px-6 text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft/50">[ 07 ] let's talk</p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let's build something that works.
          </h2>
          <div className="mt-6 space-y-1 text-[15px] leading-relaxed text-ink-soft md:text-lg">
            <p>Tell us what isn't working.</p>
            <p>We'll figure out what to build.</p>
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-11">
          <KeyboardKey as="a" href={mailto("Project Inquiry")} variant="dark" size="xl" cursorLabel="OPEN →">
            START A PROJECT →
          </KeyboardKey>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-7 font-mono text-[12px] text-ink-soft/50">
            Not sure what you need? That's fine. We'll figure it out together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
