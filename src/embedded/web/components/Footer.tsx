export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] border-t border-white/10">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-paper)] text-[var(--color-ink)] text-[11px] font-semibold">
                N
              </span>
              <span className="font-display text-[1.05rem] font-medium">
                Northline<span className="text-[var(--color-stone)]">.</span>
              </span>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-[var(--color-paper)]/65 max-w-[36ch]">
              An independent design and development studio. Building considered
              brands and digital experiences since 2018.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="eyebrow text-[var(--color-paper)]/55">Studio</div>
            <ul className="mt-4 flex flex-col gap-2 text-[14px] text-[var(--color-paper)]/85">
              <li><a href="#work" className="hover:text-[var(--color-paper)]">Work</a></li>
              <li><a href="#services" className="hover:text-[var(--color-paper)]">Services</a></li>
              <li><a href="#studio" className="hover:text-[var(--color-paper)]">About</a></li>
              <li><a href="#contact" className="hover:text-[var(--color-paper)]">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="eyebrow text-[var(--color-paper)]/55">Elsewhere</div>
            <ul className="mt-4 flex flex-col gap-2 text-[14px] text-[var(--color-paper)]/85">
              <li><a href="#" className="hover:text-[var(--color-paper)]">Instagram</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)]">Are.na</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)]">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)]">Read.cv</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-[var(--color-paper)]/55">Newsletter</div>
            <p className="mt-4 text-[14px] text-[var(--color-paper)]/70">
              A short note, once a quarter. New work, links, no spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center border-b border-white/25 focus-within:border-white/60 transition-colors"
            >
              <input
                type="email"
                placeholder="you@studio.com"
                className="flex-1 bg-transparent py-2.5 text-[14px] text-[var(--color-paper)] placeholder:text-[var(--color-paper)]/35 focus:outline-none"
              />
              <button
                type="submit"
                className="px-2 py-2.5 text-[13px] font-medium text-[var(--color-paper)]/85 hover:text-[var(--color-paper)]"
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12.5px] text-[var(--color-paper)]/55">
          <div>© 2026 Northline Studio. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Org. no. 928 472 113</span>
            <span>Made in-house, with care.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
