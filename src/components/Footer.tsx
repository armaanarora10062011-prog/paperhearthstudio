import GeometricMark from "./GeometricMark";
import KeyboardKey from "./KeyboardKey";
import { CONTACT_EMAIL, SOCIALS, mailto } from "@/config";
import { scrollToId } from "@/utils/scroll";

const LINKS = [
  { id: "what-we-are", label: "What we are" },
  { id: "services", label: "What we build" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/10 bg-paper-dim py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
          <div>
            <div className="flex items-center gap-2">
              <GeometricMark className="h-7 w-7" />
              <span className="font-display text-lg font-semibold tracking-tight lowercase">paperhearth</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Built for the way your business actually works.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/50">navigate</p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {l.label}
                    <span className="inline-block w-0 overflow-hidden text-[var(--color-blue)] transition-all duration-200 group-hover:w-3">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/50">contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a className="transition-colors hover:text-ink" href={mailto()}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              {SOCIALS.linkedin && (
                <li>
                  <a className="transition-colors hover:text-ink" href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
              {SOCIALS.instagram && (
                <li>
                  <a className="transition-colors hover:text-ink" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6">
              <KeyboardKey as="a" href={mailto("Project Inquiry")} size="sm" variant="dark">
                START A PROJECT →
              </KeyboardKey>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink-soft/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 paperhearth</p>
          <p>Independent digital studio.</p>
        </div>
      </div>
    </footer>
  );
}
