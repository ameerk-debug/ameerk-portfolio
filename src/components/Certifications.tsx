import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Award, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

import pythonCert from "./python-cert.jpg";
import webCert from "./web-cert.jpg";
import infosoft1 from "./infosoft-1.png";
import infosoft2 from "./infosoft-2.png";
import nptelIot from "./nptel-iot.png";
import nptelSecurity from "./nptel-security.png";
import eduManage1 from "./edu-manage-1.png";
import eduManage2 from "./edu-manage-2.png";

const certs = [
  {
    title: "Full Stack Developer Intern",
    issuer: "Jaz Infotech",
    details: "Completed a 3-month full-stack development internship. Built a school management system with student data portals, attendance tracking, and RESTful APIs using React.js, Node.js, Express.js, and MySQL.",
    images: [eduManage1, eduManage2]
  },
  { 
    title: "Python Certification", 
    issuer: "LinkedIn Learning", 
    details: "Core Python programming, data structures, OOP, and scripting fundamentals.",
    images: [pythonCert]
  },
  { 
    title: "HTML, CSS & JavaScript", 
    issuer: "LinkedIn Learning", 
    details: "Modern responsive web fundamentals, DOM manipulation, and ES6+ JavaScript.",
    images: [webCert]
  },
  {
    title: "Frontend Development Internship",
    issuer: "Team Infosoft",
    details: "Completed frontend development and deployment internship. Gained hands-on experience with HTML5, CSS3, JS, and REACT.JS.",
    images: [infosoft1, infosoft2]
  },
  {
    title: "Industry 4.0 & Industrial IoT",
    issuer: "NPTEL (IIT Kharagpur)",
    details: "Completed a 12-week course on Industry 4.0 and Industrial Internet of Things with a consolidated score of 58%. Developed key understanding of IoT architectures and industrial smart systems.",
    images: [nptelIot]
  },
  {
    title: "Privacy & Security in Social Media",
    issuer: "NPTEL (IIIT Hyderabad)",
    details: "Completed a 12-week course on Privacy and Security in Online Social Media with a consolidated score of 49%. Mastered privacy threats, user data leakage, and security mechanisms.",
    images: [nptelSecurity]
  }
];

export function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeImages, setActiveImages] = useState<string[] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".gsap-cert-card");
    cards.forEach((c) => {
      gsap.fromTo(
        c,
        { opacity: 0, scale: 0.95, y: 35 },
        {
          opacity: 1,
          scale: 1,
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
    <section id="certifications" ref={containerRef} className="relative py-28 px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center lg:text-left">
          <h2 className="section-title">Certifications</h2>
          <p className="text-[#9ca3af] mt-4">// Hover to reveal details.</p>
        </div>

        {/* Desktop & Tablet View: Grid (Hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certs.map((c) => (
            <div key={c.title} className="cert-card gsap-cert-card">
              <div className="cert-inner">
                {/* Front Side */}
                <div className="cert-face">
                  <div className="grid place-items-center w-14 h-14 bg-[#1f1f1f] border border-[#f97316] text-[#f97316] mb-4">
                    <Award size={26} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#f5f5f0] tracking-wide uppercase">{c.title}</h3>
                  <div className="text-xs font-mono text-[#9ca3af] mt-1">{c.issuer}</div>
                </div>
                {/* Back Side */}
                <div className="cert-face cert-back">
                  <div className="text-xs font-mono text-[#f97316] mb-2">// CERTIFICATE DETAILS</div>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed mb-4">{c.details}</p>
                  {c.images && c.images.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImages(c.images);
                        setActiveImageIndex(0);
                      }}
                      className="btn-forge py-2 px-4 text-xs font-mono flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Eye size={14} /> VIEW CERTIFICATE
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Horizontal Scroll Carousel with Peeking Cards (Visible on mobile only) */}
        <div className="sm:hidden mt-12 flex flex-col items-center w-full overflow-hidden">
          {/* Scrollable Cards Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full px-8 pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {certs.map((c) => (
              <div 
                key={c.title} 
                className="snap-center shrink-0 w-[285px] cert-card"
              >
                <div className="cert-inner">
                  {/* Front Side */}
                  <div className="cert-face">
                    <div className="grid place-items-center w-14 h-14 bg-[#1f1f1f] border border-[#f97316] text-[#f97316] mb-4">
                      <Award size={26} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#f5f5f0] tracking-wide uppercase">{c.title}</h3>
                    <div className="text-xs font-mono text-[#9ca3af] mt-1">{c.issuer}</div>
                  </div>
                  {/* Back Side */}
                  <div className="cert-face cert-back">
                    <div className="text-xs font-mono text-[#f97316] mb-2">// CERTIFICATE DETAILS</div>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed mb-4">{c.details}</p>
                    {c.images && c.images.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImages(c.images);
                          setActiveImageIndex(0);
                        }}
                        className="btn-forge py-2 px-4 text-xs font-mono flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
                      >
                        <Eye size={14} /> VIEW CERTIFICATE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Control Arrows */}
          <div className="flex items-center gap-5 mt-6">
            <button
              onClick={() => scrollToCard((mobileIndex - 1 + certs.length) % certs.length)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f97316] hover:text-[#f97316] text-[#f5f5f0] p-3 rounded-[2px] transition-all cursor-pointer shadow-md flex items-center justify-center"
              aria-label="Previous Certificate"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-mono text-sm font-bold text-[#9ca3af]">
              {mobileIndex + 1} <span className="text-[#9ca3af]/40">/</span> {certs.length}
            </span>
            <button
              onClick={() => scrollToCard((mobileIndex + 1) % certs.length)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f97316] hover:text-[#f97316] text-[#f5f5f0] p-3 rounded-[2px] transition-all cursor-pointer shadow-md flex items-center justify-center"
              aria-label="Next Certificate"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen React Portal Lightbox Modal for Certificates */}
      {activeImages && isMounted && createPortal(
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-center items-center p-4 md:p-8 animate-fade-in">
          {/* Fixed Close Button - Styled with Forge Accent */}
          <button
            onClick={() => setActiveImages(null)}
            className="fixed top-6 right-6 text-[#9ca3af] hover:text-[#f5f5f0] bg-[#161616] border border-[#f97316] p-3 rounded-sm z-[10000] transition-all cursor-pointer shadow-lg hover:scale-105"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Main Image Container */}
          <div className="relative max-w-4xl w-full flex justify-center items-center px-12">
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

            <img
              src={activeImages[activeImageIndex]}
              alt={`Certificate screenshot ${activeImageIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain border border-[#2a2a2a] shadow-2xl bg-[#0d0d0d] select-none"
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
