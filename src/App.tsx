import { DemoProvider, useDemo } from "@/context/DemoContext";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatWeAre from "@/components/WhatWeAre";
import ServicesPricingChapter from "@/components/ServicesPricingChapter";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WebPresenceDemo from "@/demos/WebPresenceDemo";
import LeadEngineDemo from "@/demos/LeadEngineDemo";
import OperationsSprintDemo from "@/demos/OperationsSprintDemo";

function SiteContent() {
  return (
    <div className="relative">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <WhatWeAre />
        <ServicesPricingChapter />
        <Process />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function DemoOverlay() {
  const { activeDemo } = useDemo();
  if (activeDemo === "web") return <WebPresenceDemo />;
  if (activeDemo === "leads") return <LeadEngineDemo />;
  if (activeDemo === "ops") return <OperationsSprintDemo />;
  return null;
}

export default function App() {
  return (
    <DemoProvider>
      <SiteContent />
      <DemoOverlay />
    </DemoProvider>
  );
}
