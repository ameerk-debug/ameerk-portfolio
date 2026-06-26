import { useEffect, useState, useRef } from "react";
import { Download, Mail } from "lucide-react";
import profilePhoto from "./profile.jpg";
import { gsap } from "gsap";

const phrases = ["Hi, I'm Ameer K", "Junior FullStack Developer", "React.js | Node.js | MySQL"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[i];
    const speed = del ? 45 : 85;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((i + 1) % phrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-[#f5f5f0]">
      {text}
      <span className="inline-block w-[3px] h-[1.05em] bg-[#f97316] ml-1 align-middle animate-pulse" />
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current.querySelectorAll(".gsap-hero-fade"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.3 }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent z-1 pointer-events-none" />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full"
      >
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs text-[#f97316] tracking-widest uppercase mb-4 gsap-hero-fade">
            // welcome to my digital forge
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black leading-tight min-h-[1.8em] tracking-wider gsap-hero-fade">
            <Typewriter />
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#9ca3af] max-w-xl leading-relaxed gsap-hero-fade mx-auto lg:mx-0">
            Crafting scalable, user-focused full-stack web applications with modern JavaScript, clean
            APIs, and thoughtful industrial UI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 gsap-hero-fade">
            <a href="/Ameer_K_Resume.pdf" download="Ameer_K_Resume.pdf" className="btn-forge">
              <Download size={18} /> Download CV
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-forge-outline"
            >
              <Mail size={18} /> Contact Me
            </button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-6 gap-y-2 text-xs sm:text-sm text-[#9ca3af]/60 gsap-hero-fade">
            <div>
              <span className="text-[#f5f5f0] font-mono text-xl sm:text-2xl font-bold">7.3</span> CGPA
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#2a2a2a] self-center" />
            <div>
              <span className="text-[#f5f5f0] font-mono text-xl sm:text-2xl font-bold">2+</span> Internships
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#2a2a2a] self-center" />
            <div>
              <span className="text-[#f5f5f0] font-mono text-xl sm:text-2xl font-bold">B.Tech IT</span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center gsap-hero-fade">
          {/* Realistic Profile Photo */}
          <img
            id="profile-photo"
            src={profilePhoto}
            alt="Ameer K"
            className="w-full max-w-[380px] sm:max-w-[580px] h-auto rounded-xl shadow-2xl object-cover transition-all duration-300"
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#9ca3af]/40 text-xs tracking-widest uppercase font-mono animate-bounce z-10">
        scroll down ↓
      </div>
    </section>
  );
}
