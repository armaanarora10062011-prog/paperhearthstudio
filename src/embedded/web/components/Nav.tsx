import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-paper)]/85 backdrop-blur-md border-b border-[var(--color-line)]/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-[11px] font-semibold tracking-tight transition-transform duration-500 group-hover:rotate-45">
              N
            </span>
            <span className="font-display text-[1.05rem] font-medium tracking-tight">
              Northline<span className="text-[var(--color-stone)]">.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9 text-[14px] text-[var(--color-ink-soft)]">
            <a href="#work" className="hover:text-[var(--color-ink)] transition-colors">Work</a>
            <a href="#services" className="hover:text-[var(--color-ink)] transition-colors">Services</a>
            <a href="#studio" className="hover:text-[var(--color-ink)] transition-colors">Studio</a>
            <a href="#contact" className="hover:text-[var(--color-ink)] transition-colors">Contact</a>
          </nav>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-4 py-2 text-[13px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            Start a project
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
