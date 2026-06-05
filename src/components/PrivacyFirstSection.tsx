import React, { useEffect, useRef, useState } from "react";

interface PrivacyFirstSectionProps {
  lang?: "EN" | "RU";
}

export default function PrivacyFirstSection({
  lang = "EN",
}: PrivacyFirstSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef<number>(0.5);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const t = {
    EN: {
      topLabel: "No VCs. No paid insiders. No extraction.",
      mainTitle: "Privacy first",
      subline: "Built for traders who move without leaving traces.",
      stat1: "VC Allocation",
      stat2: "On-Chain",
      stat3: "Execution",
    },
    RU: {
      topLabel: "Без инсайдеров. Без фондов. Без скрытых поборов.",
      mainTitle: "Приватность прежде всего",
      subline: "Для трейдеров, которые меняют балансы, не оставляя следов.",
      stat1: "Доля венчурных фондов",
      stat2: "Он-чейн",
      stat3: "Исполнение ордеров",
    },
  }[lang];

  // Resize and screen-type detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth * (window.devicePixelRatio || 1);
          canvas.height = parent.clientHeight * (window.devicePixelRatio || 1);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Intersection Observer to start animations only when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // Scroll listener to update parallax shifts via ref (avoids state thrashing)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScrollableDistance = rect.height + viewportHeight;
      const currentScrollPosition = viewportHeight - rect.top;
      const progress = Math.max(
        0,
        Math.min(1, currentScrollPosition / totalScrollableDistance),
      );

      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // HTML5 Canvas animation logic for double-lobed (infinity / figure-8) curves in violet
  useEffect(() => {
    if (!isInView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t_time = 0;
    let smoothProgress = 0.5;

    const drawCascadingLobes = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Clear the canvas each frame
      ctx.clearRect(0, 0, W, H);

      const scale = window.devicePixelRatio || 1;

      // Smooth the progress using linear interpolation with high momentum (6% step) for maximum velvet touch
      smoothProgress += (scrollProgressRef.current - smoothProgress) * 0.055;

      // Calculate shift from middle range [-0.5, 0.5]
      const localProgress = smoothProgress - 0.5;
      
      // Calculate scroll speed to inject energy into the continuous waves
      const scrollVelocity = Math.abs(scrollProgressRef.current - smoothProgress);

      // Fine-tuned responsive parallax displacements
      const centerYOffset = localProgress * 65 * scale;
      const centerXOffset = Math.sin(localProgress * Math.PI) * 25 * scale;

      const cx = W / 2 + centerXOffset;
      const cy = H / 2 + centerYOffset;

      // Generous gaps between rings: fewer contours mean larger spacing "сделай шаг между кольцами больше"
      const numContours = isMobile ? 8 : 11;

      // Continuous time rotation produces the beautiful slow outward flowing ripple effect
      const flowOffset = (t_time * 0.12) % 1.0;

      // Loop rendering each individual curve
      for (let i = 0; i < numContours; i++) {
        const ringP = (i + flowOffset) / numContours;
        const p = Math.min(1.0, Math.max(0.0, ringP));

        // Base expansion factor scales linearly with scroll "вниз кольца отдаляются, вверх возвращаются"
        const baseExpansion = 0.85 + smoothProgress * 1.45;

        // Base radius R clears the center words completely and fans out to the borders of the container
        const minR = (isMobile ? 60 : 225) * scale * baseExpansion;
        // Outer radius extends fully to cover all corners
        const maxR = Math.max(W, H) * (0.95 + smoothProgress * 0.45);

        // Monotonic radius calculation ensures smooth, luxury motion
        const baseR = minR + Math.pow(p, 1.35) * (maxR - minR);

        // Sinusoidal opacity map that fades out softly near the center and extends into the screen borders
        const edgeFade = Math.pow(Math.sin(p * Math.PI), 0.75); 
        const alpha = edgeFade * (isMobile ? 0.28 : 0.35);

        // Deep luxurious royal VEIL violet color
        const rVal = Math.floor(95 + p * 35);
        const gVal = Math.floor(70 + p * 25);
        const bVal = Math.floor(195 + p * 45);
        ctx.strokeStyle = `rgba(${rVal}, ${gVal}, ${Math.min(255, bVal)}, ${alpha})`;
        
        ctx.lineWidth = (0.75 + (1 - p) * 0.85) * scale;

        ctx.beginPath();
        const points = 200; // Perfect, silky smooth curve representation

        // Pinched peanut/hourglass factor with slow breeding wave in the pinch
        const breathingPinch = (0.50 - p * 0.12) + Math.sin(t_time * 0.4 + p * Math.PI) * 0.015;

        // Twist rotation is driven mainly by scrolling + a tiny, organic wave factor
        const rotateAngle = localProgress * 0.22 + Math.cos(t_time * 0.15) * 0.02;

        for (let j = 0; j <= points; j++) {
          const theta = (j / points) * Math.PI * 2;

          // Our robust parametric hourglass radius
          const r = baseR * (1 - breathingPinch * Math.pow(Math.abs(Math.sin(theta)), 1.8));

          // Base coordinate transformations
          const ox = r * Math.cos(theta);
          const oy = r * Math.sin(theta);

          // Apply subtle rotation matrix
          const rx = ox * Math.cos(rotateAngle) - oy * Math.sin(rotateAngle);
          const ry = ox * Math.sin(rotateAngle) + oy * Math.cos(rotateAngle);

          // Center-aligned with custom aspect ratio compression
          const px = cx + rx * (isMobile ? 1.25 : 1.4);
          const py = cy + ry * 0.65;

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      // Increment time for constant breathing - flows faster with higher scroll velocity!
      t_time += 0.009 + scrollVelocity * 0.16;

      animationFrameId = requestAnimationFrame(drawCascadingLobes);
    };

    drawCascadingLobes();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="module-privacy"
      className="relative w-full min-h-[50vh] md:min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden select-none py-12 md:py-0"
    >
      {/* 1. Concentric Hourglass/Infinity Curves HTML5 Canvas Background */}
      <canvas
        ref={canvasRef}
        id="contour-canvas"
        className="absolute inset-0 w-full h-full z-0 opacity-100 pointer-events-none"
        style={{ display: "block" }}
      />

      {/* 2. Soft Pulsing Violet Center Radial Glow Behind Content */}
      <div
        className="center-glow opacity-80"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "160px" : "650px",
          height: isMobile ? "120px" : "450px",
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.01) 50%, rgba(0, 0, 0, 0) 75%)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "glowPulse 6s ease-in-out infinite",
        }}
      />

      {/* 3. Center Content Wrapper */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center justify-center transition-all duration-1000 ease-out"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Top Label */}
        <p
          className="font-sans font-light tracking-[0.08em] text-stone-400"
          style={{
            fontSize: isMobile ? "10px" : "15px",
            marginBottom: isMobile ? "10px" : "20px",
            animation: isInView
              ? "fadeInUp 1.2s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
              : "none",
          }}
        >
          {t.topLabel}
        </p>

        {/* Main Title / Headline */}
        <h2
          className="font-serif font-light text-[#FFFFFF]"
          style={{
            fontSize: isMobile
              ? "clamp(24px, 6vw, 36px)"
              : "clamp(62px, 7vw, 96px)",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            animation: isInView
              ? "fadeInUp 1.4s 0.6s cubic-bezier(0.16, 1, 0.3, 1) both"
              : "none",
            willChange: "transform, opacity",
          }}
        >
          {t.mainTitle}
          <span className="text-[#8B5CF6] font-semibold">.</span>
        </h2>

        {/* Subline */}
        <p
          className="font-sans font-light text-stone-400 max-w-lg mx-auto"
          style={{
            fontSize: isMobile ? "11px" : "15px",
            letterSpacing: "0.04em",
            marginTop: isMobile ? "12px" : "24px",
            animation: isInView
              ? "fadeInUp 1.2s 1.0s cubic-bezier(0.16, 1, 0.3, 1) both"
              : "none",
          }}
        >
          {t.subline}
        </p>
      </div>
    </section>
  );
}
