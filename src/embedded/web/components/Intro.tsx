export function Intro() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">(01) — Introduction</p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <p className="font-display text-[1.7rem] sm:text-[2rem] md:text-[2.4rem] leading-[1.25] font-light text-[var(--color-ink-soft)]">
              We are a four-person studio working at the intersection of
              <span className="italic"> brand</span>,
              <span className="italic"> design</span>, and
              <span className="italic"> technology</span>. Our practice is small on
              purpose — it lets us stay close to the work, and close to the
              people we make it with. Every project is led by a partner from
              the first call to the final build.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Pill title="Calm by default" body="Quiet typography, generous space, no visual noise." />
              <Pill title="Made to last" body="Systems, not screenshots. Built to grow with you." />
              <Pill title="Direct, always" body="You work with the people doing the work. No middlemen." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white/40 p-6">
      <div className="font-display text-[1.1rem] font-medium text-[var(--color-ink)]">{title}</div>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-soft)]/75">{body}</p>
    </div>
  );
}
