const projects = [
  {
    no: "01",
    client: "Halden Maritime Museum",
    title: "A new identity for a 140-year-old institution.",
    scope: "Identity · Web · Editorial",
    year: "2024",
    bg: "from-[#1f3a3d] to-[#0f1f22]",
    accent: "A quiet, type-led system for a working museum on the Oslofjord.",
  },
  {
    no: "02",
    client: "Folde Coffee Roasters",
    title: "Brand & online store for a small-batch roaster.",
    scope: "Brand · Web design · Build",
    year: "2024",
    bg: "from-[#3d2b1f] to-[#1c120a]",
    accent: "From a borrowed roaster to a recognized name in five cities.",
  },
  {
    no: "03",
    client: "Northwind Capital",
    title: "A long-form site for a quiet investment firm.",
    scope: "Web design · Development",
    year: "2023",
    bg: "from-[#2a2f3a] to-[#0e1014]",
    accent: "An editorial site that treats their writing like the asset it is.",
  },
  {
    no: "04",
    client: "Studio Pløen",
    title: "Identity for an architecture practice in Bergen.",
    scope: "Identity · Print · Web",
    year: "2023",
    bg: "from-[#3a3528] to-[#1a1810]",
    accent: "A wordmark, a system, and a small site that does the work quietly.",
  },
];

export function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-10 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">(03) — Selected work</p>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-end justify-between flex-wrap gap-6">
            <h2 className="font-display text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] leading-[1.1] font-medium tracking-tight max-w-[20ch]">
              A few of the things we've made recently.
            </h2>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 text-[14px] font-medium underline underline-offset-4 decoration-[var(--color-stone)] hover:decoration-[var(--color-ink)] transition-colors"
            >
              Full archive <span>→</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.no} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  no,
  client,
  title,
  scope,
  year,
  bg,
  accent,
}: {
  no: string;
  client: string;
  title: string;
  scope: string;
  year: string;
  bg: string;
  accent: string;
}) {
  return (
    <a
      href="#contact"
      className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white/40 transition-transform duration-500 hover:-translate-y-1"
    >
      <div
        className={`relative aspect-[5/4] overflow-hidden bg-gradient-to-br ${bg}`}
      >
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-white/95 text-[5.5rem] sm:text-[7rem] md:text-[8rem] leading-none font-light tracking-tighter">
            {client
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
        </div>
        <div className="absolute top-5 left-5 text-[11px] tracking-[0.2em] uppercase text-white/70">
          {no} / 04
        </div>
        <div className="absolute bottom-5 right-5 text-[11px] tracking-[0.2em] uppercase text-white/70">
          {year}
        </div>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow">{client}</p>
          <span className="text-[12px] text-[var(--color-stone)]">{scope}</span>
        </div>
        <h3 className="mt-3 font-display text-[1.4rem] md:text-[1.55rem] leading-snug font-medium tracking-tight max-w-[24ch]">
          {title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink-soft)]/75 max-w-[42ch]">
          {accent}
        </p>
        <div className="mt-5 flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
          <span>View case study</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}
