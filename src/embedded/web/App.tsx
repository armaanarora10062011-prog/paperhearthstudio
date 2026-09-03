import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Marquee } from "./components/Marquee";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
