import { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import { gsap } from "gsap";

const items = [
  {
    role: "FullStack Development Intern",
    company: "Jaz Infotech, Tirunelveli",
    date: "April 2026 – June 2026 (3 Months)",
    bullets: [
      "Developed a full-stack school management system using React.js, Node.js, Express.js, and MySQL.",
      "Built modules for student management, attendance tracking, and performance analytics.",
      "Designed RESTful APIs and optimized database queries for performance.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Team Infosoft, Tirunelveli",
    date: "6 Weeks",
    bullets: [
      "Developed the frontend of an alumni interaction platform using React.js.",
      "Implemented user networking, feed posting, and profile management features.",
      "Collaborated with the backend team for seamless API integration.",
    ],
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".gsap-exp-card");
    cards.forEach((c) => {
      gsap.fromTo(
        c,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: c,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative py-28 px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center lg:text-left">
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="timeline mt-16">
          {items.map((it, i) => {
            const left = i % 2 === 0;
            return (
              <div key={i} className="relative grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
                <div className="timeline-dot" />
                <div
                  className={`pl-12 md:pl-0 md:pr-0 gsap-exp-card ${
                    left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
                  }`}
                >
                  {/* Steel Entry Card with Left Border Accent */}
                  <div className="bg-[#1a1a1a] border-l-4 border-l-[#f97316] border-y border-r border-[#2a2a2a] p-6 rounded-[2px] hover:-translate-y-0.5 hover:border-y-[#f97316] hover:border-r-[#f97316] transition-all duration-300 ease-out group">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#f97316] mb-2">
                      <Briefcase size={14} /> {it.date}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#f5f5f0] tracking-wide">{it.role}</h3>
                    <div className="text-sm text-[#9ca3af] mb-4 font-semibold">{it.company}</div>
                    <ul className="space-y-2.5">
                      {it.bullets.map((b, idx) => (
                        <li key={idx} className="text-sm text-[#cbd5e1] flex gap-2 leading-relaxed">
                          <span className="text-[#f97316] mt-1">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
