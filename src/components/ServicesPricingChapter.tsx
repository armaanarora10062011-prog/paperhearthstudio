import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ServiceCard, { type ServiceData } from "./ServiceCard";
import PricingCard, { type PricingData } from "./PricingCard";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SERVICES: ServiceData[] = [
  {
    id: "web",
    index: "01",
    name: "Premium Web Presence",
    price: "$1,200",
    bullets: [
      "Premium website designed around your business",
      "Copy, structure, and conversion-focused layout",
      "Mobile, forms, analytics + basic SEO",
      "Built, tested, launched, and handed over",
    ],
  },
  {
    id: "leads",
    index: "02",
    name: "Lead Engine",
    price: "$2,000",
    bullets: [
      "Lead capture + instant response",
      "Qualification and lead routing",
      "Automated follow-ups + booking",
      "Connected, tested, and ready for your team",
    ],
  },
  {
    id: "ops",
    index: "03",
    name: "Operations Sprint",
    price: "$2,800",
    bullets: [
      "Find your most repetitive workflows",
      "Redesign them for simpler execution",
      "Automate the high-impact processes",
      "Integrate, test, document, and hand over",
    ],
  },
];

const PLANS: PricingData[] = [
  {
    tier: "STARTER",
    price: "$1,000",
    tagline: "You know what you need. We build it.",
    bullets: [
      "One focused digital system",
      "Built and delivered for you",
      "Simple handoff + documentation",
      "You take it from there",
    ],
    cta: "GET STARTED →",
  },
  {
    tier: "IDEAL",
    price: "$5,000",
    oldPrice: "$6,000",
    tagline: "The complete paperhearth build.",
    bullets: [
      "We design and build the right systems for your business",
      "Website + lead + operational improvements",
      "Implementation into your existing workflow",
      "Training, documentation + full handoff",
    ],
    cta: "LET'S BUILD IT →",
    ideal: true,
  },
  {
    tier: "PREMIUM",
    price: "$15,000",
    tagline: "We handle everything.",
    bullets: [
      "Full digital transformation",
      "Multiple systems built and connected",
      "Implementation handled by paperhearth",
      "Ongoing high-touch support through the build",
    ],
    cta: "TALK TO US →",
  },
];

const PANEL_COUNT = 8; // services-intro, s1, s2, s3, pricing-intro, p1, p2, p3
const PRICING_PANEL_INDEX = 4;
const PANEL_VH_MULTIPLIER = 0.62;

function IntroPanel({
  index,
  label,
  title,
  supporting,
}: {
  index: string;
  label: string;
  title: string;
  supporting: string;
}) {
  return (
    <div className="flex h-full w-screen shrink-0 flex-col items-start justify-center px-6 md:px-16 lg:px-24">
      <SectionLabel index={index} label={label} />
      <h2 className="mt-6 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-md text-balance text-[15px] leading-relaxed text-ink-soft md:text-lg">{supporting}</p>
      <p className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">
        <span>scroll to continue</span>
        <span className="inline-block animate-ph-pulse">→</span>
      </p>
    </div>
  );
}

function CardPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-screen shrink-0 items-center justify-center px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export default function ServicesPricingChapter() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const pricingAnchorRef = useRef<HTMLDivElement | null>(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop || reducedMotion) return;

    function recalc() {
      const vh = window.innerHeight;
      setScrollableHeight(vh * (PANEL_COUNT - 1) * PANEL_VH_MULTIPLIER);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [isDesktop, reducedMotion]);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    let ticking = false;

    function update() {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const rect = section.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const trackWidth = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-progress * trackWidth}px,0,0)`;
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progress * 100}%`;
      }
      if (counterRef.current) {
        const panel = Math.min(PANEL_COUNT - 1, Math.round(progress * (PANEL_COUNT - 1)));
        counterRef.current.textContent = `${String(panel + 1).padStart(2, "0")} / ${String(PANEL_COUNT).padStart(2, "0")}`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop, reducedMotion, scrollableHeight]);

  const showPinned = isDesktop && !reducedMotion;

  return (
    <section id="services" ref={sectionRef} className="relative" style={showPinned ? { height: `calc(${scrollableHeight}px + 100vh)` } : undefined}>
      {showPinned && (
        <div
          ref={pricingAnchorRef}
          id="pricing"
          style={{ position: "absolute", top: `${(scrollableHeight * PRICING_PANEL_INDEX) / (PANEL_COUNT - 1)}px` }}
          aria-hidden="true"
        />
      )}

      {showPinned ? (
        <div className="sticky top-0 h-screen overflow-hidden bg-paper">
          <div ref={trackRef} className="flex h-full will-change-transform">
            <IntroPanel
              index="02"
              label="WHAT WE BUILD"
              title="Three ways we make a business work better."
              supporting="Compact, technical, and built to a real outcome — not a generic package."
            />
            {SERVICES.map((s) => (
              <CardPanel key={s.id}>
                <ServiceCard service={s} />
              </CardPanel>
            ))}
            <IntroPanel
              index="04"
              label="PRICING"
              title="Pick the level of involvement you need."
              supporting="From a focused build to having paperhearth handle the whole thing."
            />
            {PLANS.map((p) => (
              <CardPanel key={p.tier}>
                <PricingCard plan={p} />
              </CardPanel>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-center gap-4 px-8">
            <div className="h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-ink/10">
              <div ref={progressFillRef} className="h-full bg-[var(--color-blue)]" style={{ width: "0%" }} />
            </div>
            <span ref={counterRef} className="font-mono text-[11px] tabular-nums text-ink-soft/60">
              01 / 08
            </span>
          </div>
        </div>
      ) : (
        <MobileServicesPricing />
      )}
    </section>
  );
}

function MobileServicesPricing() {
  return (
    <div className="py-20">
      <div className="px-5">
        <Reveal>
          <SectionLabel index="02" label="WHAT WE BUILD" />
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-tight">
            Three ways we make a business work better.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="w-[86%] shrink-0 snap-center md:w-auto md:shrink">
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
        <p className="px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft/40 md:hidden">
          swipe to explore →
        </p>
      </Reveal>

      <div id="pricing" className="mt-24 px-5 md:px-8">
        <Reveal>
          <SectionLabel index="04" label="PRICING" />
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-tight">
            Pick the level of involvement you need.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            From a focused build to having paperhearth handle the whole thing.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.tier} delay={i * 90}>
              <PricingCard plan={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
