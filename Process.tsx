import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    n: "01",
    tag: "DISCOVER",
    title: "We understand the business.",
    body: "We look at what you're doing, what's slowing you down, and what actually needs fixing.",
  },
  {
    n: "02",
    tag: "BUILD",
    title: "We make the thing.",
    body: "We design, build, connect, and configure the systems around the agreed outcome.",
  },
  {
    n: "03",
    tag: "REFINE",
    title: "We test it with you.",
    body: "You see the work, give feedback, and we make the necessary changes.",
  },
  {
    n: "04",
    tag: "HAND OFF",
    title: "You get everything.",
    body: "The finished system, documentation, training, and everything your team needs to use it.",
  },
];

const INCLUDES = ["Strategy", "Design", "Build", "Implementation", "Testing", "Documentation", "Training", "Handoff"];

export default function Process() {
  return (
    <section id="process" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <SectionLabel index="03" label="PROCESS" />
          <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-base">
            From idea to working system. No black box.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-ink/10 md:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 110} className="relative">
              <div className="flex items-center gap-3 md:block">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink bg-paper font-mono text-xs text-ink">
                  {step.n}
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-blue)] md:mt-5 md:block">
                  {step.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight md:text-xl">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-20 border-t border-ink/10 pt-10 md:mt-24 md:pt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/50">every project includes</p>
          <div className="mt-5 flex flex-wrap gap-x-2 gap-y-3">
            {INCLUDES.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                <span className="keycap px-3.5 py-1.5 text-xs">{item}</span>
                {i < INCLUDES.length - 1 && <span className="text-ink-soft/25">·</span>}
              </span>
            ))}
          </div>
          <p className="mt-9 font-display text-lg font-medium tracking-tight md:text-xl">
            Most projects are completed in <span className="text-[var(--color-blue)]">14 days</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
