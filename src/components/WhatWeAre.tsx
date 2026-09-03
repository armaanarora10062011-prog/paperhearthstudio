import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const OUTCOMES = [
  { index: "01", label: "MAKE MORE MONEY" },
  { index: "02", label: "SAVE TIME" },
  { index: "03", label: "BE NOTICED" },
];

export default function WhatWeAre() {
  return (
    <section id="what-we-are" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <Reveal>
          <SectionLabel index="01" label="WHAT WE ARE" />
          <h2 className="mt-5 max-w-2xl text-balance font-display text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
            We build digital systems that help businesses move forward.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between md:mt-16">
            {OUTCOMES.map((o, i) => (
              <div key={o.index} className="flex items-center gap-4">
                <div className="keycap group flex w-full flex-col items-start gap-1 px-6 py-5 text-left sm:w-auto sm:min-w-[210px]">
                  <span className="font-mono text-[11px] text-[var(--color-blue)]">[ {o.index} ]</span>
                  <span className="font-display text-base font-semibold tracking-tight md:text-lg">{o.label}</span>
                </div>
                {i < OUTCOMES.length - 1 && (
                  <span className="hidden font-mono text-lg text-ink-soft/30 transition-transform duration-300 sm:inline-block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-14 max-w-3xl text-balance text-[15px] leading-relaxed text-ink-soft md:text-lg">
            We build the digital infrastructure behind growing businesses — from websites that make you look the
            part, to lead systems that turn attention into opportunities, to automations that take repetitive work
            off your team's hands.
          </p>
          <p className="mt-6 font-display text-lg font-medium tracking-tight md:text-xl">
            More revenue. Less busywork. A business people remember.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
