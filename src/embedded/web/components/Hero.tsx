export function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow fade-up fade-up-d1">Studio · Est. 2018</p>
          </div>

          <div className="col-span-12 md:col-span-10">
            <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.2rem] leading-[1.02] font-medium text-[var(--color-ink)] fade-up fade-up-d2">
              A small studio building
              <br className="hidden sm:block" />{" "}
              <span className="italic font-light text-[var(--color-ink-soft)]">
                considered
              </span>{" "}
              brands &amp; digital
              <br className="hidden sm:block" /> experiences.
            </h1>

            <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-8 md:gap-x-10">
              <p className="col-span-12 md:col-span-6 md:col-start-1 text-[15.5px] leading-relaxed text-[var(--color-ink-soft)]/80 max-w-[42ch] fade-up fade-up-d3">
                Northline is an independent design and development studio working
                with founders, museums, and small teams who care about craft. We
                make brand identities, websites, and product interfaces that
                feel calm, confident, and built to last.
              </p>

              <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-3 fade-up fade-up-d4">
                <a
                  href="#work"
                  className="group inline-flex items-center justify-between gap-3 rounded-full bg-[var(--color-ink)] px-5 py-3.5 text-[14px] font-medium text-[var(--color-paper)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span>See selected work</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-between gap-3 rounded-full border border-[var(--color-ink)]/15 px-5 py-3.5 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]/40"
                >
                  <span>Start a project</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 fade-up fade-up-d5">
          <Stat label="Years in practice" value="07" />
          <Stat label="Projects shipped" value="62" />
          <Stat label="Studio partners" value="14" />
          <Stat label="Based in" value="Oslo" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[var(--color-line)] pt-4">
      <div className="font-display text-3xl md:text-4xl font-medium tracking-tight">{value}</div>
      <div className="mt-1 eyebrow">{label}</div>
    </div>
  );
}
