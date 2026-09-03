const services = [
  {
    no: "01",
    title: "Brand identity",
    body:
      "Naming, logo, type, color, voice. We build identity systems that flex across print, product, and digital without losing their center.",
    list: ["Strategy & positioning", "Logo & wordmark", "Type & color", "Guidelines"],
  },
  {
    no: "02",
    title: "Web design & build",
    body:
      "Marketing sites, editorial sites, and product pages. Designed and built in-house — from the first wireframe to the last deploy.",
    list: ["Information architecture", "Visual design", "Front-end development", "CMS integration"],
  },
  {
    no: "03",
    title: "Art direction",
    body:
      "Hands-on direction for launches, campaigns, and product surfaces. We lead the look so the team can focus on the message.",
    list: ["Launch campaigns", "Photography", "Motion & type", "Print & editorial"],
  },
  {
    no: "04",
    title: "Design systems",
    body:
      "Tokenized, documented systems for product teams that need to ship fast without the brand drifting by Q3.",
    list: ["Tokens & theming", "Component libraries", "Documentation", "Adoption playbooks"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-[var(--color-paper-warm)]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-10 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">(02) — Services</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] leading-[1.1] font-medium tracking-tight max-w-[18ch]">
              What we do, and how we like to do it.
            </h2>
          </div>
        </div>

        <div className="border-t border-[var(--color-line)]">
          {services.map((s) => (
            <ServiceRow key={s.no} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  no,
  title,
  body,
  list,
}: {
  no: string;
  title: string;
  body: string;
  list: string[];
}) {
  return (
    <div className="group grid grid-cols-12 gap-y-4 md:gap-x-10 py-10 md:py-12 border-b border-[var(--color-line)] transition-colors hover:bg-white/40">
      <div className="col-span-2 md:col-span-1 font-display text-[var(--color-stone)] text-sm md:text-base">
        {no}
      </div>

      <div className="col-span-10 md:col-span-4">
        <h3 className="font-display text-[1.6rem] md:text-[2rem] leading-tight font-medium tracking-tight">
          {title}
        </h3>
      </div>

      <div className="col-span-12 md:col-span-4">
        <p className="text-[15px] leading-relaxed text-[var(--color-ink-soft)]/80 max-w-[40ch]">
          {body}
        </p>
      </div>

      <div className="col-span-12 md:col-span-3">
        <ul className="flex flex-col gap-1.5 text-[13.5px] text-[var(--color-ink-soft)]/80">
          {list.map((l) => (
            <li key={l} className="flex items-center gap-2.5">
              <span className="h-px w-3 bg-[var(--color-stone)]" />
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
