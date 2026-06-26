import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = 0, ry = 0, x = 0, y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, input, textarea, .cert-card, .project-card")) {
        ring.current?.style.setProperty("width", "60px");
        ring.current?.style.setProperty("height", "60px");
        ring.current?.style.setProperty("border-color", "#f97316");
      } else {
        ring.current?.style.setProperty("width", "32px");
        ring.current?.style.setProperty("height", "32px");
        ring.current?.style.setProperty("border-color", "#2a2a2a");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
