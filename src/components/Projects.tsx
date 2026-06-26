import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import VanillaTilt from "vanilla-tilt";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

import eduManage1 from "./edu-manage-1.png";
import eduManage2 from "./edu-manage-2.png";
import buildos1 from "./buildos-1.png";
import buildos2 from "./buildos-2.png";
import business1 from "./business-1.png";
import business2 from "./business-2.png";
import eventide1 from "./eventide-1.png";
import eventide2 from "./eventide-2.png";
import club1 from "./club-1.png";

const projects = [
  {
    title: "EduManage – School Management System",
    type: "Browser-Based · Full-Stack Developer",
    desc: "Comprehensive school management platform with CRUD operations, REST APIs, role-based dashboards, attendance, and performance analytics.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    images: [eduManage1, eduManage2],
  },
  {
    title: "Alumni Interaction Portal",
    type: "Browser-Based · React.js",
    desc: "Networking platform for alumni with user profiles, post feeds, networking flows, and real-time API integration with backend services.",
    tech: ["React.js", "REST APIs", "JavaScript"],
  },
  {
    title: "Club Management System",
    type: "Browser-Based · React Frontend Developer",
    desc: "Developed a responsive admin dashboard using React.js. Built multiple modules including Members, Credits, Schedules, Trainings, Transactions, and Approvals. Created reusable components and optimized UI performance.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "Git", "GitHub"],
    images: [club1],
  },
  {
    title: "BNI",
    type: "Browser-Based · React Frontend Developer",
    desc: "Developed a responsive corporate website using React.js. Built landing pages, service modules, and contact enquiry forms. Created reusable components, ensured mobile responsiveness, and integrated frontend with Laravel backend APIs.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "Git", "GitHub", "REST APIs", "Laravel"],
  },
  {
    title: "BuildOS – Construction Management Software",
    type: "Browser-Based · Full-Stack Developer",
    desc: "Developed a full-stack Construction Management Software using React.js, Node.js, Express.js, PostgreSQL, and Prisma ORM. Built modules for CRM & Leads, Projects, Inventory, Procurement, Vendors, and Finance Management. Implemented CRUD operations and integrated REST APIs.",
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    images: [buildos1, buildos2],
  },
  {
    title: "Business Universe ERP System",
    type: "Browser-Based · Full-Stack Developer",
    desc: "Built a full-stack ERP application with modules for CRM, Sales, HR, Finance, Inventory, and Analytics. Developed RESTful APIs, database schemas, authentication, role-based access control, and complete CRUD functionality.",
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    images: [business1, business2],
  },
  {
    title: "Eventide – Event Management Platform",
    type: "Browser-Based · Full-Stack Developer",
    desc: "Developed a full-stack event booking and management application using Node.js, Express.js, PostgreSQL, and Prisma ORM. Implemented event creation, ticket booking, attendee management, and role-based access control.",
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    images: [eventide1, eventide2],
  },
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeImages, setActiveImages] = useState<string[] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll<HTMLElement>(".project-card");

    cards.forEach((c) => {
      // Keep Vanilla Tilt with maxTilt 10, perspective 1500, no glare
      VanillaTilt.init(c, { max: 10, speed: 500, perspective: 1500, glare: false });

      // GSAP ScrollTrigger for slide up
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

    return () => {
      cards.forEach((c) => (c as any).vanillaTilt?.destroy());
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardEl = container.children[index] as HTMLElement;
    if (cardEl) {
      container.scrollTo({
        left: cardEl.offsetLeft - (container.clientWidth - cardEl.clientWidth) / 2,
        behavior: "smooth"
      });
    }
    setMobileIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((child, idx) => {
      const childEl = child as HTMLElement;
      const childCenter = childEl.offsetLeft + childEl.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });
    
    if (closestIndex !== mobileIndex) {
      setMobileIndex(closestIndex);
    }
  };

  return (
    <section id="projects" className="relative py-28 px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center lg:text-left">
          <h2 className="section-title">Projects</h2>
          <p className="text-[#9ca3af] mt-4 max-w-2xl mx-auto lg:mx-0">// Selected work showcasing full-stack delivery.</p>
        </div>

        {/* Desktop View: 2-column Grid (Hidden on mobile) */}
        <div ref={ref} className="hidden md:grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((p) => (
            <div key={p.title} className="project-card text-center sm:text-left">
              <div className="text-xs font-mono text-[#f97316] mb-2">{p.type}</div>
              <h3 className="font-display text-2xl font-bold mb-3 text-[#f5f5f0] tracking-wide">{p.title}</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed mb-5">{p.desc}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                {p.tech.map((t) => (
                  <span key={t} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>
              
              {/* Forge Style Rectangular Link Buttons */}
              <div className="flex justify-center sm:justify-start gap-3">
                <a href="#" className="btn-forge-outline py-2 px-4 text-xs font-mono flex items-center gap-1.5">
                  <Github size={14} /> CODE
                </a>
                {p.images ? (
                  <button
                    onClick={() => {
                      setActiveImages(p.images);
                      setActiveImageIndex(0);
                    }}
                    className="btn-forge py-2 px-4 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink size={14} /> LIVE DEMO
                  </button>
                ) : (
                  <a href="#" className="btn-forge py-2 px-4 text-xs font-mono flex items-center gap-1.5">
                    <ExternalLink size={14} /> LIVE DEMO
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Horizontal Scroll Carousel with Peeking Cards (Visible on mobile only) */}
        <div className="md:hidden mt-12 flex flex-col items-center w-full overflow-hidden">
          {/* Scrollable Cards Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full px-8 pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((p) => (
              <div 
                key={p.title} 
                className="snap-center shrink-0 w-[285px] h-[450px] flex flex-col justify-between p-6 bg-[#161616] border border-[#2a2a2a] rounded-[2px] shadow-xl"
              >
                <div>
                  <div className="text-xs font-mono text-[#f97316] mb-2">{p.type}</div>
                  <h3 className="font-display text-xl font-bold mb-3 text-[#f5f5f0] tracking-wide line-clamp-2">{p.title}</h3>
                  <p className="text-[#9ca3af] text-xs leading-relaxed mb-4 line-clamp-6">{p.desc}</p>
                </div>
                
                <div>
                  <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-badge text-[10px] py-0.5 px-1.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {/* Forge Style Rectangular Link Buttons */}
                  <div className="flex justify-center gap-3">
                    <a href="#" className="btn-forge-outline py-2 px-3 text-xs font-mono flex items-center gap-1.5">
                      <Github size={13} /> CODE
                    </a>
                    {p.images ? (
                      <button
                        onClick={() => {
                          setActiveImages(p.images);
                          setActiveImageIndex(0);
                        }}
                        className="btn-forge py-2 px-3 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink size={13} /> LIVE
                      </button>
                    ) : (
                      <a href="#" className="btn-forge py-2 px-3 text-xs font-mono flex items-center gap-1.5">
                        <ExternalLink size={13} /> LIVE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Control Arrows */}
          <div className="flex items-center gap-5 mt-6">
            <button
              onClick={() => scrollToCard((mobileIndex - 1 + projects.length) % projects.length)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f97316] hover:text-[#f97316] text-[#f5f5f0] p-3 rounded-[2px] transition-all cursor-pointer shadow-md flex items-center justify-center"
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-mono text-sm font-bold text-[#9ca3af]">
              {mobileIndex + 1} <span className="text-[#9ca3af]/40">/</span> {projects.length}
            </span>
            <button
              onClick={() => scrollToCard((mobileIndex + 1) % projects.length)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f97316] hover:text-[#f97316] text-[#f5f5f0] p-3 rounded-[2px] transition-all cursor-pointer shadow-md flex items-center justify-center"
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* React Portal Lightbox Modal for Screenshots */}
      {activeImages && isMounted && createPortal(
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-center items-center p-4 md:p-8 animate-fade-in">
          {/* Fixed Close Button - Styled with Forge Accent to escape parent container transforms */}
          <button
            onClick={() => setActiveImages(null)}
            className="fixed top-6 right-6 text-[#9ca3af] hover:text-[#f5f5f0] bg-[#161616] border border-[#f97316] p-3 rounded-sm z-[10000] transition-all cursor-pointer shadow-lg hover:scale-105"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Main Image Container */}
          <div className="relative max-w-5xl w-full flex justify-center items-center px-12">
            {/* Prev Button */}
            {activeImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length)}
                className="absolute left-0 text-[#9ca3af] hover:text-[#f5f5f0] bg-[#161616]/90 border border-[#2a2a2a] hover:border-[#f97316] p-3 rounded-sm z-50 transition-all cursor-pointer shadow-md"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image */}
            <img
              src={activeImages[activeImageIndex]}
              alt={`Screenshot ${activeImageIndex + 1}`}
              className="max-h-[82vh] max-w-full object-contain border border-[#2a2a2a] shadow-2xl bg-[#0d0d0d] select-none"
            />

            {/* Next Button */}
            {activeImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % activeImages.length)}
                className="absolute right-0 text-[#9ca3af] hover:text-[#f5f5f0] bg-[#161616]/90 border border-[#2a2a2a] hover:border-[#f97316] p-3 rounded-sm z-50 transition-all cursor-pointer shadow-md"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Pagination Indicator */}
          {activeImages.length > 1 && (
            <div className="flex gap-2.5 mt-6">
              {activeImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeImageIndex ? "bg-[#f97316] scale-110" : "bg-[#2a2a2a] hover:bg-[#4b5563]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </section>
  );
}
