const items = [
  "Brand identity",
  "Web design",
  "Art direction",
  "Editorial design",
  "Type systems",
  "Webflow",
  "Framer",
  "Strategy",
];

export function Marquee() {
  return (
    <div className="border-y border-[var(--color-line)] bg-[var(--color-paper-warm)] overflow-hidden">
      <div className="flex whitespace-nowrap py-5 marquee-track">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-6">
            <span className="font-display text-[1.6rem] md:text-[2rem] font-light text-[var(--color-ink)]/85">
              {item}
            </span>
            <span className="text-[var(--color-stone)] text-2xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
