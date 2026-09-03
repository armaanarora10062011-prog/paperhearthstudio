import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import FAQItem from "./FAQItem";

const FAQS = [
  {
    q: "What exactly does paperhearth build?",
    a: "Websites, lead systems, and operational automations designed around the way your business works.",
  },
  {
    q: "How long does a project take?",
    a: "Our standard projects are designed to be completed in 14 days, assuming we have the information, access, and feedback we need.",
  },
  {
    q: "Do I need to know exactly what I need?",
    a: "No. That's part of the process. We'll look at how your business currently works and recommend what makes the most sense.",
  },
  {
    q: "Can you work with my existing tools?",
    a: "Yes. Where possible, we build around the tools and systems you're already using rather than forcing you to replace everything.",
  },
  {
    q: "What's included after you finish?",
    a: "You receive the finished system, documentation, training, and the access/assets needed to operate it.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee the work we're responsible for. We don't promise specific revenue, leads, or other outcomes that depend on factors outside the system itself.",
  },
  {
    q: "What happens after I decide to work with you?",
    a: "You approve the project, pay the 50% deposit, complete onboarding, and we schedule the kickoff. Then we start building.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[900px] px-5 md:px-8">
        <Reveal>
          <SectionLabel index="06" label="FAQ" />
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Questions, answered.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 border-t border-ink/10">
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} index={i} question={item.q} answer={item.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
