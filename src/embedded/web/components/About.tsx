export function About() {
  return (
    <section id="studio" className="py-24 md:py-32 bg-[var(--color-paper-warm)]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">(04) — The studio</p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[1.9rem] sm:text-[2.2rem] md:text-[2.6rem] leading-[1.2] font-medium tracking-tight max-w-[26ch]">
              A small team, working on a small number of things, carefully.
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-soft)]/85 max-w-[44ch]">
                We started Northline in 2018 after a decade of working in-house
                and at other studios. We wanted to build the kind of work we
                wished we'd been asked to make — slower, more deliberate, with
                a single team holding the thread from concept to code.
              </p>
              <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-soft)]/85 max-w-[44ch]">
                Today we're four people, based in Oslo and Copenhagen. We take
                on three to five projects a year, and we don't do pitch
                competitions. If you've read this far, we'd love to hear what
                you're working on.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
              <Person name="Maja Vold" role="Founder, Design" />
              <Person name="Eivind Holm" role="Founder, Engineering" />
              <Person name="Sigrid Berg" role="Design lead" />
              <Person name="Lev Tarrant" role="Engineering lead" />
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 pt-8 border-t border-[var(--color-line)]">
              <span className="eyebrow">Selected partners</span>
              <span className="font-display text-[1.05rem] text-[var(--color-ink-soft)]/80 font-light">
                Halden Maritime · Folde · Northwind · Studio Pløen · Vinterhavn · Kvitfjell Atelier
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Person({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div>
      <div className="aspect-square rounded-xl bg-gradient-to-br from-[#d9d4c8] to-[#bfb8a8] mb-4 grid place-items-center text-[var(--color-ink-soft)]">
        <span className="font-display text-2xl font-light tracking-tight">{initials}</span>
      </div>
      <div className="font-display text-[1.05rem] font-medium leading-tight">{name}</div>
      <div className="text-[13px] text-[var(--color-stone)] mt-1">{role}</div>
    </div>
  );
}
