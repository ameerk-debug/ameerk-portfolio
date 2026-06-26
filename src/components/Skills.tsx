import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { gsap } from "gsap";

const categories = [
  { title: "Frontend", icon: "🎨", items: [
    { name: "HTML5", level: 92 }, { name: "CSS3", level: 88 },
    { name: "JavaScript", level: 85 }, { name: "React.js", level: 82 },
  ]},
  { title: "Backend", icon: "⚙️", items: [
    { name: "Node.js", level: 80 }, { name: "Express.js", level: 78 }, { name: "RESTful APIs", level: 82 },
  ]},
  { title: "Database", icon: "🗄️", items: [
    { name: "MySQL", level: 80 }, { name: "PostgreSQL", level: 85 }, { name: "Prisma ORM", level: 82 }
  ]},
  { title: "Tools", icon: "🛠️", items: [
    { name: "Git", level: 78 }, { name: "GitHub", level: 80 }, { name: "VS Code", level: 90 },
  ]},
  { title: "Programming", icon: "💻", items: [{ name: "C", level: 75 }, { name: "Python", level: 72 }]},
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll<HTMLElement>(".skill-card");
    
    // Initialize Vanilla Tilt without glare, maxTilt 8
    cards.forEach(c => VanillaTilt.init(c, { max: 8, speed: 400, glare: false }));

    // GSAP ScrollTrigger for animating progress bars
    cards.forEach(card => {
      const fills = card.querySelectorAll<HTMLElement>(".skill-progress-fill");
      fills.forEach(fill => {
        const level = fill.dataset.level;
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      cards.forEach(c => (c as any).vanillaTilt?.destroy());
    };
  }, []);

  return (
    <section id="skills" className="relative py-28 px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center lg:text-left">
          <h2 className="section-title">Skills & Stack</h2>
          <p className="text-[#9ca3af] mt-4 max-w-2xl mx-auto lg:mx-0">// Technologies I work with across the stack.</p>
        </div>

        <div ref={ref} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-card">
              <div className="flex items-center gap-3 mb-5 border-l-2 border-[#f97316] pl-3">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-display font-semibold text-lg uppercase tracking-wider text-[#f5f5f0]">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.items.map(it => (
                  <div key={it.name}>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-[#cbd5e1]">{it.name}</span>
                      <span className="text-[#f97316]">{it.level}%</span>
                    </div>
                    <div className="skill-bar bg-[#1f1f1f]">
                      <div className="skill-progress-fill h-full bg-[#f97316]" data-level={it.level} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
