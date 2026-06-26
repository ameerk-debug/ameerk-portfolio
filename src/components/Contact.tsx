import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Linkedin, Github, Send } from "lucide-react";
import { gsap } from "gsap";

export function Contact() {
  const [sent, setSent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameVal = (document.getElementById("contact-name") as HTMLInputElement)?.value || "";
    const msgVal = (document.getElementById("contact-message") as HTMLTextAreaElement)?.value || "";
    
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/918778854678?text=${encodeURIComponent(
      `Hi Ameer, I'm ${nameVal || "a visitor"}. ${msgVal || "I saw your portfolio and want to connect!"}`
    )}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const formEl = containerRef.current.querySelector(".gsap-contact-form");
    const infoEl = containerRef.current.querySelector(".gsap-contact-info");

    if (formEl) {
      gsap.fromTo(
        formEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formEl,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (infoEl) {
      gsap.fromTo(
        infoEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoEl,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative py-28 px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center lg:text-left">
          <h2 className="section-title">Get in Touch</h2>
          <p className="text-[#9ca3af] mt-4 max-w-xl mx-auto lg:mx-0">// Open to internships, full-time roles, and freelance work.</p>
        </div>

        {/* Two-column Layout: Form Left, Social/Info Right */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Column 1: Form (Left) */}
          <form onSubmit={submit} className="bg-[#161616] border border-[#2a2a2a] rounded-[2px] p-7 space-y-5 gsap-contact-form">
            <div>
              <label className="text-xs font-mono text-[#f97316] mb-1.5 block tracking-wider">// NAME</label>
              <input required id="contact-name" className="forge-input" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs font-mono text-[#f97316] mb-1.5 block tracking-wider">// EMAIL</label>
              <input required type="email" id="contact-email" className="forge-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-mono text-[#f97316] mb-1.5 block tracking-wider">// MESSAGE</label>
              <textarea required id="contact-message" rows={5} className="forge-input resize-none" placeholder="Tell me about your project..." />
            </div>
            <button type="submit" className="btn-forge w-full justify-center">
              <Send size={16} /> {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </form>

          {/* Column 2: Social/Info (Right) */}
          <div className="space-y-4 gsap-contact-info">
            {[
              { icon: <Phone size={18} />, label: "Phone", value: "+91 87788 54678", href: "tel:+918778854678" },
              { icon: <Mail size={18} />, label: "Email", value: "ameerk1606@gmail.com", href: "mailto:ameerk1606@gmail.com" },
              { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/ameer-k-2b3a57356", href: "https://linkedin.com/in/ameer-k-2b3a57356/" },
              { icon: <Github size={18} />, label: "GitHub", value: "github.com/ameerk-debug", href: "https://github.com/ameerk-debug/" },
              { icon: <MapPin size={18} />, label: "Location", value: "Tirunelveli – 627005, Tamil Nadu", href: "#" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[2px] p-5 flex items-center gap-4 hover:border-[#f97316]/50 transition-colors duration-300">
                <div className="grid place-items-center w-12 h-12 bg-[#1f1f1f] border border-[#2a2a2a] text-[#f97316]">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9ca3af]/60 tracking-wider uppercase">{c.label}</div>
                  <div className="text-[#f5f5f0] text-sm font-semibold mt-0.5">{c.value}</div>
                </div>
              </a>
            ))}
            
            <div className="flex justify-center lg:justify-start gap-3 pt-2">
              <a className="social-icon" href="https://linkedin.com/in/ameer-k-2b3a57356/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a className="social-icon" href="https://github.com/ameerk-debug/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a className="social-icon" href="mailto:ameerk1606@gmail.com" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-[#2a2a2a] text-center text-xs font-mono text-[#9ca3af]/40">
          © {new Date().getFullYear()} Ameer K · Crafted with <span className="text-[#f97316]">React</span> + <span className="text-[#f97316]">GSAP</span>
        </div>
      </div>
    </section>
  );
}
