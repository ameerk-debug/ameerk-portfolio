import { useEffect } from "react";
import { initGSAP } from "../lib/gsapSetup";
import { Cursor } from "./Cursor";
import { ScrollProgress } from "./ScrollProgress";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Certifications } from "./Certifications";
import { Contact } from "./Contact";
import { ForgeCanvas } from "./ForgeCanvas";

export function Portfolio() {
  useEffect(() => {
    // Initialize GSAP and Lenis smooth scroll
    const lenis = initGSAP();

    // Section title underline draw effect
    const titles = document.querySelectorAll(".section-title");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.4 });
    titles.forEach(t => obs.observe(t));
    
    return () => {
      obs.disconnect();
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507]">
      <ForgeCanvas />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
