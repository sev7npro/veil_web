import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface VeilBlockchainRoutesProps {
  isPreloaded?: boolean;
}

export default function VeilBlockchainRoutes({ isPreloaded = true }: VeilBlockchainRoutesProps) {
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation state triggers
  const [_, setRenderTrigger] = useState(0);
  const timeRef = useRef(0);
  
  // High fidelity mouse trackers
  const targetMouse = useRef({ x: 960, y: 540 });
  const currentMouse = useRef({ x: 960, y: 540 });
  const mouseActive = useRef(false);
  const activeStrength = useRef(0.0); // Smooth LERP controller for mouse weight

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Premium, slow-reacting spring mouse tracking for cinematic parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 20, mass: 2.5 };
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [2.0, -2.0]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-2.0, 2.0]), springConfig);
  const xTranslation = useSpring(useTransform(mouseX, [-400, 400], [-18, 18]), springConfig);
  const yTranslation = useSpring(useTransform(mouseY, [-400, 400], [-18, 18]), springConfig);

  // Parallax tracking mouse tracker
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMoveParallax = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const offsetX = clientX - innerWidth / 2;
      const offsetY = clientY - innerHeight / 2;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMoveParallax);
    return () => window.removeEventListener("mousemove", handleMouseMoveParallax);
  }, [isMobile, mouseX, mouseY]);

  // Infinite, high-performance requestAnimationFrame loop to calculate elastic physics
  useEffect(() => {
    let animId: number;
    
    const tick = () => {
      // Advance time clock
      timeRef.current += 0.007;

      // Smooth inertia LERP for mouse tracking
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.09;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.09;

      // Smooth transition for when mouse enters or leaves area
      const targetStrength = mouseActive.current ? 1.0 : 0.0;
      activeStrength.current += (targetStrength - activeStrength.current) * 0.06;

      // Force render frame
      setRenderTrigger((prev) => prev + 1);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Global mouse move & leave trackers on window for elastic line manipulation
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      // Projected coordinates into 1920x1080 viewBox space
      const svgX = (rawX / rect.width) * 1920;
      const svgY = (rawY / rect.height) * 1080;

      targetMouse.current = { x: svgX, y: svgY };
      mouseActive.current = true;
    };

    const handleGlobalMouseLeave = () => {
      mouseActive.current = false;
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleGlobalMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, []);

  // Structural parameters of lines
  const lineCount = 46;
  
  // Calculate dynamic path strings for this frame
  const renderPaths = () => {
    const t_elapsed = timeRef.current;
    const mx = currentMouse.current.x;
    const my = currentMouse.current.y;
    const currentWeight = activeStrength.current;

    return Array.from({ length: lineCount }).map((_, i) => {
      const t = (i - (lineCount - 1) / 2) / ((lineCount - 1) / 2);
      const signedPower = (val: number) => Math.sign(val) * Math.pow(Math.abs(val), 1.12);
      const tShaped = signedPower(t);

      // Distances & spacing metrics
      const leftSpread = 420;
      const centerSpread = 80;
      const rightSpread = 420;

      const yStart_base = 540 + tShaped * leftSpread;
      const yCenter_base = 540 + tShaped * centerSpread;
      const yEnd_base = 540 + tShaped * rightSpread;

      // Base nodes
      const startX = -100;
      const centerX = 960;
      const endX = 2020;

      const cp1X_base = 420;
      const cp2X_base = 720;
      const cp3X_base = 1200;
      const cp4X_base = 1500;

      // Slow organic sways
      const swayAmpCenter = 32 + Math.abs(Math.sin(i * 0.15)) * 18;
      const swayAmpEnds = 12 + Math.abs(Math.cos(i * 0.15)) * 12;

      // Calculate time-varying sways
      const phase_center = Math.sin(t_elapsed * 1.5 + i * 0.45) * swayAmpCenter;
      const phase_start = Math.cos(t_elapsed * 1.2 + i * 0.3) * swayAmpEnds;
      const phase_end = Math.sin(t_elapsed * 1.35 + i * 0.35) * swayAmpEnds;

      // Baseline control nodes for this line
      let ptStart = { x: startX, y: yStart_base + phase_start };
      let ptCp1 = { x: cp1X_base, y: yStart_base + phase_start };
      let ptCp2 = { x: cp2X_base, y: yCenter_base + phase_center };
      let ptCenter = { x: centerX, y: yCenter_base + phase_center };
      let ptCp3 = { x: cp3X_base, y: yCenter_base + phase_center };
      let ptCp4 = { x: cp4X_base, y: yEnd_base + phase_end };
      let ptEnd = { x: endX, y: yEnd_base + phase_end };

      // Helper for elastic mouse attraction / pull distortion
      const applyGlowPull = (pt: { x: number; y: number }, basePull = 0.6) => {
        const dx = mx - pt.x;
        const dy = my - pt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 480; // Larger physical drag radius

        if (dist < influenceRadius) {
          // Dynamic bell-curve decay for elastic string feeling
          const strength = Math.pow(1.0 - dist / influenceRadius, 1.4);
          const pullFactor = strength * basePull * currentWeight;
          return {
            x: pt.x + dx * pullFactor,
            y: pt.y + dy * pullFactor,
          };
        }
        return pt;
      };

      // Anchor endpoints to edges of the screen to make cables stretch instead of shifting uniformly
      const ptStart_d = ptStart;
      const ptEnd_d = ptEnd;

      // Outer control points maintain tension, without stretching with mouse
      const ptCp1_d = ptCp1;
      const ptCp2_d = ptCp2;
      const ptCenter_d = ptCenter; // Center element is main flex point
      const ptCp3_d = ptCp3;
      const ptCp4_d = ptCp4;

      // Build Bezier SVG Path D attribute with beautiful curves
      const pathD = `M ${ptStart_d.x},${ptStart_d.y} C ${ptCp1_d.x},${ptCp1_d.y} ${ptCp2_d.x},${ptCp2_d.y} ${ptCenter_d.x},${ptCenter_d.y} C ${ptCp3_d.x},${ptCp3_d.y} ${ptCp4_d.x},${ptCp4_d.y} ${ptEnd_d.x},${ptEnd_d.y}`;

      return { id: `elastic-line-${i}`, pathD, index: i };
    });
  };

  const calculatedPaths = renderPaths();

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-[100vh] min-h-screen pointer-events-none select-none z-0 overflow-hidden bg-transparent"
    >
      {/* 3D Cinematic Parallax container spanning the entire viewport */}
      <motion.div
        style={{
          perspective: 2500,
          perspectiveOrigin: "center center",
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          x: isMobile ? 0 : xTranslation,
          y: isMobile ? 0 : yTranslation,
          willChange: "transform",
        }}
        animate={isPreloaded ? { opacity: 0.95, scale: 1.02 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-[0.5%] w-[99%] h-[99%] flex items-center justify-center"
      >
        {/* Soft, volumetric central backlight glow that anchors the hourglass ribbon */}
        {/* Background glow removed */}

        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Hourglass Quantum Ribbon master linear color gradient */}
            <linearGradient id="hourglassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.02" />
              <stop offset="15%" stopColor="#7c3aed" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="48%" stopColor="#00E8FA" stopOpacity="1" />
              <stop offset="52%" stopColor="#00E8FA" stopOpacity="1" />
              <stop offset="65%" stopColor="#14F195" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#0ea5e9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.02" />
            </linearGradient>

            {/* Sub-glow color gradient for underlying animated light fields */}
            <linearGradient id="hourglassGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#00E8FA" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#14F195" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>

            {/* Luxurious, wide blur filter for glowing light underneath the lines */}
            <filter id="luxuryHaze" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16px" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. UNDERLYING VOLUMETRIC FLOWS: Glow paths */}
          <g filter="url(#luxuryHaze)">
            {calculatedPaths.map((path, idx) => {
              if (idx % 2 !== 0) return null;
              return (
                <path
                  key={`glow-under-${path.id}`}
                  d={path.pathD}
                  fill="none"
                  stroke="url(#hourglassGlowGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-25"
                />
              );
            })}
          </g>

          {/* 2. CRISP RUNNING CHANNELS: Crisp cables */}
          <g>
            {calculatedPaths.map((path) => (
              <path
                key={`sharp-line-${path.id}`}
                d={path.pathD}
                fill="none"
                stroke="url(#hourglassGrad)"
                strokeWidth="0.45"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
