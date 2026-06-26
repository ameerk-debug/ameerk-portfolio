import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + 120;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(l.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const underline = e.currentTarget.querySelector(".link-underline");
    if (underline) {
      gsap.to(underline, { width: "100%", left: "0%", duration: 0.25, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, isActive: boolean) => {
    if (isActive) return;
    const underline = e.currentTarget.querySelector(".link-underline");
    if (underline) {
      gsap.to(underline, {
        width: "0%",
        left: "100%",
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(underline, { left: "0%" });
        },
      });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d0d0d]/95 border-b border-[#2a2a2a] py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 font-display font-black text-xl tracking-wider text-white"
        >
          <span className="grid place-items-center w-9 h-9 bg-[#f97316] text-[#0d0d0d] font-black text-lg">
            AK
          </span>
          <span>AMEER K</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                  className={`nav-link relative py-1 uppercase tracking-widest text-xs font-semibold ${
                    isActive ? "text-[#f97316] active" : "text-[#9ca3af]"
                  }`}
                >
                  {l.label}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] bg-[#f97316] link-underline"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/70 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-[280px] h-full bg-[#111111] border-l border-[#2a2a2a] p-8 flex flex-col z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <span className="font-display font-black text-lg text-white tracking-widest">
                NAVIGATION
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-[#9ca3af] hover:text-white"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col gap-5">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`font-display text-left block w-full py-2 text-xl uppercase tracking-wider transition-colors duration-200 ${
                      active === l.id
                        ? "text-[#f97316] font-bold"
                        : "text-[#9ca3af] hover:text-white"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
