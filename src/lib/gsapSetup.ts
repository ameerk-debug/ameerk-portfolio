import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initGSAP() {
  if (typeof window === "undefined") return null;

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  lenisInstance = lenis;

  // Connect Lenis to GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable lag smoothing for GSAP to sync perfectly with Lenis
  gsap.ticker.lagSmoothing(0);

  // Update ScrollTrigger on Lenis scroll
  lenis.on("scroll", ScrollTrigger.update);

  return lenis;
}

export function getLenis() {
  return lenisInstance;
}
