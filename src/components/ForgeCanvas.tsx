import { useEffect, useRef } from "react";
import * as THREE from "three";

const techList = [
  "React.js", "Node.js", "Express.js", "JavaScript", "TypeScript",
  "PostgreSQL", "Prisma ORM", "MySQL", "HTML5", "CSS3",
  "Git", "GitHub", "VS Code", "REST API", "Docker",
  "Tailwind CSS", "Laravel", "Python", "C", "LinkedIn", "Mail", "Phone"
];

// Helper to convert hex to rgba
function hexToRgbA(hex: string, alpha: number): string {
  if (hex === "#ffffff") return `rgba(255, 255, 255, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper to draw a rounded rectangle
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Helper to draw the HTML5/CSS3 shield shape
function drawShield(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(128, 50);
  ctx.lineTo(190, 65);
  ctx.lineTo(180, 180);
  ctx.lineTo(128, 210);
  ctx.lineTo(76, 180);
  ctx.lineTo(66, 65);
  ctx.closePath();
}

// Helper to draw a hexagon
function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const hx = x + Math.cos(angle) * r;
    const hy = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
}

// Helper to draw a database cylinder
function drawCylinder(ctx: CanvasRenderingContext2D) {
  // Top oval
  ctx.beginPath();
  ctx.ellipse(128, 80, 50, 18, 0, 0, 2 * Math.PI);
  ctx.stroke();
  // Middle curve
  ctx.beginPath();
  ctx.ellipse(128, 128, 50, 18, 0, 0, Math.PI);
  ctx.stroke();
  // Bottom curve
  ctx.beginPath();
  ctx.ellipse(128, 176, 50, 18, 0, 0, Math.PI);
  ctx.stroke();
  // Vertical sides
  ctx.beginPath();
  ctx.moveTo(78, 80);
  ctx.lineTo(78, 176);
  ctx.moveTo(178, 80);
  ctx.lineTo(178, 176);
  ctx.stroke();
}

// Draw a small particle texture for dust
function createParticleTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(249, 115, 22, 0.8)"); // amber halo
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, 2 * Math.PI);
    ctx.fill();
  }
  return canvas;
}

// Main programmatic drawing helper for tech stack icons
function createIconCanvas(name: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, 256, 256);

  let color = "#ffffff";
  switch (name) {
    case "React.js": color = "#61DAFB"; break;
    case "Node.js": color = "#68A063"; break;
    case "Express.js": color = "#ffffff"; break;
    case "JavaScript": color = "#F7DF1E"; break;
    case "TypeScript": color = "#3178C6"; break;
    case "PostgreSQL": color = "#336791"; break;
    case "Prisma ORM": color = "#10B981"; break;
    case "MySQL": color = "#F29111"; break;
    case "HTML5": color = "#E34F26"; break;
    case "CSS3": color = "#1572B6"; break;
    case "Git": color = "#F05032"; break;
    case "GitHub": color = "#ffffff"; break;
    case "VS Code": color = "#007ACC"; break;
    case "REST API": color = "#8A2BE2"; break;
    case "Docker": color = "#2496ED"; break;
    case "Tailwind CSS": color = "#06B6D4"; break;
    case "Laravel": color = "#FF2D20"; break;
    case "Python": color = "#3776AB"; break;
    case "C": color = "#A8B9CC"; break;
    case "LinkedIn": color = "#0A66C2"; break;
    case "Mail": color = "#EA4335"; break;
    case "Phone": color = "#25D366"; break;
  }

  // 1. Soft Pulsing Glow/Halo in 2D texture
  const glowGrad = ctx.createRadialGradient(128, 128, 10, 128, 128, 110);
  glowGrad.addColorStop(0, hexToRgbA(color, 0.22));
  glowGrad.addColorStop(0.5, hexToRgbA(color, 0.06));
  glowGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(128, 128, 110, 0, 2 * Math.PI);
  ctx.fill();

  // Glow filter and stroke setups
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // 2. Draw Vector Icons Programmatically
  ctx.beginPath();
  if (name === "React.js") {
    ctx.ellipse(128, 128, 80, 26, 0, 0, 2 * Math.PI);
    ctx.ellipse(128, 128, 80, 26, Math.PI / 3, 0, 2 * Math.PI);
    ctx.ellipse(128, 128, 80, 26, (2 * Math.PI) / 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(128, 128, 11, 0, 2 * Math.PI);
    ctx.fill();
  } 
  else if (name === "JavaScript") {
    roundRect(ctx, 58, 58, 140, 140, 8);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#0d0d0d";
    ctx.font = "bold 65px Inter, sans-serif";
    ctx.fillText("JS", 130, 178);
  } 
  else if (name === "TypeScript") {
    roundRect(ctx, 58, 58, 140, 140, 8);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Inter, sans-serif";
    ctx.fillText("TS", 130, 175);
  } 
  else if (name === "HTML5") {
    drawShield(ctx);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(102, 95);
    ctx.lineTo(154, 95);
    ctx.lineTo(150, 120);
    ctx.lineTo(116, 120);
    ctx.lineTo(119, 142);
    ctx.lineTo(148, 142);
    ctx.lineTo(144, 178);
    ctx.lineTo(128, 185);
    ctx.lineTo(112, 178);
    ctx.lineTo(110, 155);
    ctx.lineTo(126, 155);
    ctx.lineTo(127, 165);
    ctx.lineTo(138, 161);
    ctx.lineTo(139, 148);
    ctx.lineTo(103, 148);
    ctx.closePath();
    ctx.fill();
  } 
  else if (name === "CSS3") {
    drawShield(ctx);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(102, 95);
    ctx.lineTo(154, 95);
    ctx.lineTo(150, 122);
    ctx.lineTo(124, 122);
    ctx.lineTo(126, 138);
    ctx.lineTo(148, 138);
    ctx.lineTo(144, 178);
    ctx.lineTo(128, 185);
    ctx.lineTo(112, 178);
    ctx.lineTo(110, 155);
    ctx.lineTo(126, 155);
    ctx.lineTo(127, 165);
    ctx.lineTo(138, 161);
    ctx.lineTo(139, 148);
    ctx.lineTo(124, 148);
    ctx.closePath();
    ctx.fill();
  }
  else if (name === "Node.js") {
    ctx.lineWidth = 6;
    drawHexagon(ctx, 128, 128, 70);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(128, 165);
    ctx.quadraticCurveTo(88, 128, 128, 91);
    ctx.quadraticCurveTo(168, 128, 128, 165);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#0d0d0d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(128, 165);
    ctx.lineTo(128, 91);
    ctx.stroke();
  } 
  else if (name === "Express.js") {
    ctx.lineWidth = 6;
    ctx.arc(128, 128, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic bold 75px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ex", 124, 124);
  } 
  else if (name === "PostgreSQL") {
    drawCylinder(ctx);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PG", 128, 128);
  } 
  else if (name === "Prisma ORM") {
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.fillStyle = "#10B981";
    ctx.beginPath();
    ctx.moveTo(128, 55);
    ctx.lineTo(65, 175);
    ctx.lineTo(128, 155);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#059669";
    ctx.beginPath();
    ctx.moveTo(128, 55);
    ctx.lineTo(191, 175);
    ctx.lineTo(128, 155);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#047857";
    ctx.beginPath();
    ctx.moveTo(65, 175);
    ctx.lineTo(191, 175);
    ctx.lineTo(128, 155);
    ctx.closePath();
    ctx.fill();
  } 
  else if (name === "MySQL") {
    drawCylinder(ctx);
    ctx.stroke();
    ctx.strokeStyle = "#00758F";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(78, 128);
    ctx.quadraticCurveTo(128, 85, 178, 128);
    ctx.stroke();
  } 
  else if (name === "Git") {
    ctx.save();
    ctx.translate(128, 128);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = color;
    roundRect(ctx, -50, -50, 100, 100, 12);
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(128, 92);
    ctx.lineTo(128, 164);
    ctx.moveTo(128, 132);
    ctx.quadraticCurveTo(152, 132, 152, 108);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(128, 92, 7, 0, 2 * Math.PI);
    ctx.arc(128, 164, 7, 0, 2 * Math.PI);
    ctx.arc(152, 108, 7, 0, 2 * Math.PI);
    ctx.fill();
  } 
  else if (name === "GitHub") {
    ctx.lineWidth = 6;
    ctx.arc(128, 128, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(102, 120);
    ctx.quadraticCurveTo(128, 115, 154, 120);
    ctx.lineTo(160, 98);
    ctx.lineTo(146, 125);
    ctx.quadraticCurveTo(128, 134, 110, 125);
    ctx.lineTo(96, 98);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(128, 135, 26, 0, Math.PI);
    ctx.fill();
  } 
  else if (name === "VS Code") {
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(72, 112);
    ctx.lineTo(176, 176);
    ctx.lineTo(176, 80);
    ctx.lineTo(72, 144);
    ctx.lineTo(96, 128);
    ctx.lineTo(72, 112);
    ctx.stroke();
  } 
  else if (name === "REST API") {
    ctx.lineWidth = 6;
    ctx.arc(128, 128, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("[API]", 128, 128);
  } 
  else if (name === "Docker") {
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(64, 160);
    ctx.lineTo(192, 160);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(72, 160);
    ctx.quadraticCurveTo(128, 195, 184, 160);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = color;
    ctx.shadowBlur = 0;
    const cw = 16;
    const ch = 10;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        ctx.fillRect(96 + col * 20, 128 + row * 14, cw, ch);
      }
    }
  }
  else if (name === "Tailwind CSS") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(128, 95);
    ctx.quadraticCurveTo(160, 65, 185, 95);
    ctx.quadraticCurveTo(160, 125, 128, 95);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(95, 128);
    ctx.quadraticCurveTo(127, 98, 152, 128);
    ctx.quadraticCurveTo(127, 158, 95, 128);
    ctx.closePath();
    ctx.fill();
  }
  else if (name === "Laravel") {
    ctx.lineWidth = 6;
    ctx.arc(128, 128, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(102, 90);
    ctx.lineTo(102, 166);
    ctx.lineTo(154, 166);
    ctx.lineTo(154, 148);
    ctx.lineTo(120, 148);
    ctx.lineTo(120, 90);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  else if (name === "Python") {
    ctx.fillStyle = "#3776AB";
    ctx.beginPath();
    ctx.moveTo(128, 60);
    ctx.lineTo(148, 60);
    ctx.quadraticCurveTo(168, 60, 168, 80);
    ctx.lineTo(168, 110);
    ctx.lineTo(138, 110);
    ctx.quadraticCurveTo(128, 110, 128, 120);
    ctx.lineTo(128, 138);
    ctx.lineTo(100, 138);
    ctx.quadraticCurveTo(88, 138, 88, 118);
    ctx.lineTo(88, 90);
    ctx.quadraticCurveTo(88, 70, 108, 70);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#FFD343";
    ctx.beginPath();
    ctx.moveTo(128, 196);
    ctx.lineTo(108, 196);
    ctx.quadraticCurveTo(88, 196, 88, 176);
    ctx.lineTo(88, 146);
    ctx.lineTo(118, 146);
    ctx.quadraticCurveTo(128, 146, 128, 136);
    ctx.lineTo(128, 118);
    ctx.lineTo(156, 118);
    ctx.quadraticCurveTo(168, 118, 168, 138);
    ctx.lineTo(168, 166);
    ctx.quadraticCurveTo(168, 186, 148, 186);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(114, 82, 3, 0, 2 * Math.PI);
    ctx.arc(142, 174, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
  else if (name === "C") {
    ctx.lineWidth = 6;
    ctx.arc(128, 128, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.font = "bold 95px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("C", 124, 124);
  }
  else if (name === "LinkedIn") {
    ctx.fillStyle = color;
    roundRect(ctx, 58, 58, 140, 140, 12);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 78px Inter, sans-serif";
    ctx.fillText("in", 132, 172);
  }
  else if (name === "Mail") {
    ctx.lineWidth = 6;
    roundRect(ctx, 58, 78, 140, 100, 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(58, 78);
    ctx.lineTo(128, 133);
    ctx.lineTo(198, 78);
    ctx.stroke();
  }
  else if (name === "Phone") {
    ctx.lineWidth = 6;
    ctx.arc(128, 128, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(102, 102);
    ctx.quadraticCurveTo(112, 92, 122, 102);
    ctx.lineTo(114, 114);
    ctx.quadraticCurveTo(126, 128, 142, 142);
    ctx.lineTo(154, 134);
    ctx.quadraticCurveTo(164, 144, 154, 154);
    ctx.quadraticCurveTo(120, 164, 102, 120);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  return canvas;
}

export function ForgeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050507"); // Near-black
    scene.fog = new THREE.FogExp2("#050507", 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Create 3D planes for each tech stack icon
    const iconMeshes: THREE.Mesh[] = [];
    const planeGeom = new THREE.PlaneGeometry(1.6, 1.6);

    techList.forEach((tech, index) => {
      const iconCanvas = createIconCanvas(tech);
      const texture = new THREE.CanvasTexture(iconCanvas);
      
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending, // Makes colors pop and glow together
      });

      const mesh = new THREE.Mesh(planeGeom, material);

      // Random distribution across different depths
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 1; // depth spread

      mesh.position.set(x, y, z);
      
      // Random rotation
      mesh.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      );

      scene.add(mesh);

      // Animation parameters
      mesh.userData = {
        baseX: x,
        baseY: y,
        baseScale: 1.0 + Math.random() * 0.3,
        rotSpeedY: (Math.random() - 0.5) * 0.006,
        rotSpeedZ: (Math.random() - 0.5) * 0.003,
        floatFreq: 0.2 + Math.random() * 0.3,
        floatAmp: 0.3 + Math.random() * 0.4,
        floatOffset: Math.random() * Math.PI * 2,
      };

      iconMeshes.push(mesh);
    });

    // 3. Fine Particle Dust Setup
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22; // X
      positions[i + 1] = (Math.random() - 0.5) * 16; // Y
      positions[i + 2] = (Math.random() - 0.5) * 10; // Z
      speeds[i / 3] = 0.005 + Math.random() * 0.01;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pCanvas = createParticleTexture();
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    });

    const dust = new THREE.Points(particleGeo, particleMat);
    scene.add(dust);

    // Mouse movement variables
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll tracker
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    const startTime = performance.now();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Camera floating drift + mouse offset + scroll vertical parallax
      const driftX = Math.sin(elapsedTime * 0.25) * 0.6;
      const driftY = Math.cos(elapsedTime * 0.18) * 0.4;

      camera.position.x = driftX + currentX * 2.2;
      // Subtract scrollY factor to move camera down as page scrolls
      camera.position.y = driftY + currentY * 1.8 - scrollY * 0.006;
      camera.lookAt(0, -scrollY * 0.006, 0);

      const camY = camera.position.y;

      // Animate Tech Icons with Infinite Vertical Wrapping
      iconMeshes.forEach((mesh) => {
        // Self rotation
        mesh.rotation.y += mesh.userData.rotSpeedY;
        mesh.rotation.z += mesh.userData.rotSpeedZ;

        // Smooth sine wave float path (ideal base coordinate)
        const idealY =
          mesh.userData.baseY +
          Math.sin(elapsedTime * mesh.userData.floatFreq + mesh.userData.floatOffset) *
            mesh.userData.floatAmp;

        // Wrap Y position relative to camera Y position in a [-9, 9] range
        let wrappedY = ((idealY - camY + 9) % 18);
        if (wrappedY < 0) wrappedY += 18;
        mesh.position.y = wrappedY - 9 + camY;

        mesh.position.x =
          mesh.userData.baseX +
          Math.cos(elapsedTime * 0.2 + mesh.userData.floatOffset) * 0.15;

        // Pulsing glow size
        const pulseScale =
          mesh.userData.baseScale *
          (1 + Math.sin(elapsedTime * 1.5 + mesh.userData.floatOffset) * 0.08);
        mesh.scale.set(pulseScale, pulseScale, 1);
      });

      // Animate fine particle dust drifting upwards, wrapped relative to camera Y
      const positionsArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        positionsArray[idx + 1] += speeds[i]; // move Y up
        
        // Wrap relative to camera Y position in a [-9, 9] range
        const relY = positionsArray[idx + 1] - camY;
        if (relY > 9) {
          positionsArray[idx + 1] = camY - 9;
          positionsArray[idx] = (Math.random() - 0.5) * 22; // new random X
        } else if (relY < -9) {
          positionsArray[idx + 1] = camY + 9;
          positionsArray[idx] = (Math.random() - 0.5) * 22;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Lerp mouse effect
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      planeGeom.dispose();
      iconMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
      pTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050507] overflow-hidden">
      {/* Three.js Container */}
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Subtle Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,7,0.85)_100%)] z-1" />
    </div>
  );
}
