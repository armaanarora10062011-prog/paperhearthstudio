import { useEffect, useState } from "react";
import { NAV_ITEMS, mailto } from "@/config";
import GeometricMark from "./GeometricMark";
import KeyboardKey from "./KeyboardKey";
import { cn } from "@/utils/cn";
import { scrollToId } from "@/utils/scroll";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur bg-paper/85 border-b border-ink/10" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-ink"
          aria-label="paperhearth home"
        >
          <GeometricMark className="h-7 w-7" />
          <span className="font-display text-[17px] font-semibold tracking-tight lowercase">paperhearth</span>
        </a>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <KeyboardKey key={item.id} size="sm" onClick={() => scrollToId(item.id)} cursorLabel="VIEW →">
              <span className="text-[var(--color-blue)]">{item.index}</span>
              <span>{item.label}</span>
            </KeyboardKey>
          ))}
        </nav>

        <div className="hidden lg:block">
          <KeyboardKey as="a" href={mailto("Project Inquiry")} size="sm" variant="dark" cursorLabel="OPEN →">
            START A PROJECT →
          </KeyboardKey>
        </div>

        <button
          className="keycap flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform duration-200",
                open && "translate-y-[5.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0 h-[1.5px] w-4 bg-ink transition-transform duration-200",
                open && "-translate-y-[5.5px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[57px] z-40 flex flex-col gap-3 overflow-y-auto bg-paper px-6 py-8 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <KeyboardKey
              key={item.id}
              size="lg"
              className="w-full justify-start"
              onClick={() => {
                scrollToId(item.id);
                setOpen(false);
              }}
            >
              <span className="text-[var(--color-blue)]">{item.index}</span>
              <span>{item.label}</span>
            </KeyboardKey>
          ))}
          <KeyboardKey as="a" href={mailto("Project Inquiry")} size="lg" variant="dark" className="mt-2 w-full justify-center">
            START A PROJECT →
          </KeyboardKey>
        </div>
      )}
    </header>
  );
}
