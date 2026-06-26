import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const stats = [
  { value: 2, suffix: "", label: "Internships" },
  { value: 2, suffix: "+", label: "Projects" },
  { value: 7.3, suffix: "", label: "CGPA", decimals: 1 },
  { value: 1, suffix: "yr", label: "Coding" },
];

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setV(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const left = containerRef.current.querySelector(".gsap-about-left");
    const right = containerRef.current.querySelector(".gsap-about-right");

    if (left) {
      gsap.fromTo(
        left,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: left,
            start: "top 85%",
          },
        }
      );
    }

    if (right) {
      gsap.fromTo(
        right,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: right,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative py-28 px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center lg:text-left">
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="mt-12 grid lg:grid-cols-5 gap-10 items-start">
          
          {/* Left Bio Column */}
          <div className="lg:col-span-3 space-y-5 gsap-about-left text-center lg:text-left">
            <p className="text-lg text-[#cbd5e1] leading-relaxed">
              I'm a Full Stack Developer with hands-on experience in <span className="text-[#f97316] font-semibold">React.js</span>,
              <span className="text-[#f97316] font-semibold"> Node.js</span>, <span className="text-[#f97316] font-semibold">Express.js</span>, and
              <span className="text-[#f97316] font-semibold"> MySQL</span>. I build responsive web applications, RESTful APIs, and
              database-driven systems.
            </p>
            <p className="text-[#9ca3af] leading-relaxed">
              Currently pursuing B.Tech in Information Technology at Francis Xavier Engineering College, Tirunelveli
              (2022–2026, CGPA: 7.3). I'm passionate about creating scalable, user-focused applications.
            </p>
            
            {/* Education Steel Card */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[2px] p-5 mt-4 text-center lg:text-left">
              <div className="text-xs font-mono text-[#f97316] tracking-wider mb-2">// EDUCATION</div>
              <div className="font-display font-semibold text-lg text-[#f5f5f0] tracking-wide">B.Tech, Information Technology</div>
              <div className="text-sm text-[#9ca3af]">Francis Xavier Engineering College, Tirunelveli · 2022–2026</div>
            </div>
          </div>
          
          {/* Right Stats Column */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 gsap-about-right">
            {stats.map(s => (
              <div key={s.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[2px] p-6 text-center hover:border-[#f97316]/50 transition-colors duration-300">
                <div className="text-4xl font-bold font-mono text-[#f97316]">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div className="text-xs font-mono text-[#9ca3af] uppercase tracking-wider mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
