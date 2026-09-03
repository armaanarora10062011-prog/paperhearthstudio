import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import GeometricVisual from "./GeometricVisual";

const POINTS = ["Independent studio", "Small, focused builds", "Built around your business"];

export default function About() {
  return (
    <section id="about" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <Reveal>
          <SectionLabel index="05" label="ABOUT PAPERHEARTH" />
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Small by design. Built differently.
          </h2>

          <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-ink-soft md:text-base">
            <p>
              paperhearth is an independent digital studio focused on building useful things for businesses that are
              ready to move forward.
            </p>
            <p>
              We don't believe every business needs a giant agency, a six-month project, or a pile of complicated
              software.
            </p>
            <p>We find what matters, build what solves it, and leave you with something that actually works.</p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {POINTS.map((p, i) => (
              <div key={p} className="keycap flex items-center gap-2 px-4 py-2.5 text-[13px]">
                <span className="font-mono text-[var(--color-blue)]">0{i + 1}</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="flex justify-center">
          <GeometricVisual size={380} spin className="text-ink/80" />
        </Reveal>
      </div>
    </section>
  );
}
