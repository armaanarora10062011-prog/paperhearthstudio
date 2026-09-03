export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-[var(--color-stone)]">(05) — Contact</p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[1.05] font-medium tracking-tight">
              Have a project in mind?
              <br />
              <span className="italic font-light text-[var(--color-paper)]/70">
                Let's talk about it.
              </span>
            </h2>

            <p className="mt-8 text-[15.5px] leading-relaxed text-[var(--color-paper)]/70 max-w-[52ch]">
              We take on three to five projects each year. Tell us a little
              about what you're working on and we'll get back to you within
              a few days. No pitch decks, no obligation.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <a
                  href="mailto:hello@northline.studio"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-paper)] px-6 py-4 text-[15px] font-medium text-[var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span>hello@northline.studio</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
                <p className="mt-4 text-[13px] text-[var(--color-paper)]/55">
                  Or book a 30-min intro call →
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Detail label="Studio" value="Oslo · Copenhagen" />
                <Detail label="Hours" value="Mon–Fri, 09–17 CET" />
                <Detail label="Availability" value="Booking from Q2" />
                <Detail label="Response time" value="Within 2 days" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow text-[var(--color-paper)]/55">{label}</div>
      <div className="mt-1.5 text-[15px] text-[var(--color-paper)]/95">{value}</div>
    </div>
  );
}
