import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface VeilBlockchainRoutesProps {
  isPreloaded?: boolean;
}

export default function VeilBlockchainRoutes({ isPreloaded = true }: VeilBlockchainRoutesProps) {
  const [isMobile, setIsMobile] = useState(true);

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

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const offsetX = clientX - innerWidth / 2;
      const offsetY = clientY - innerHeight / 2;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  // Number of beautifully parallel, smooth lines forming the quantum wave ribbon
  const lineCount = 46;
  const paths = Array.from({ length: lineCount }).map((_, i) => {
    // Spans from -1.0 to 1.0 (with a tiny cluster near the central index)
    const t = (i - (lineCount - 1) / 2) / ((lineCount - 1) / 2);
    
    // Non-linear shaping to cluster the lines naturally around the center line and edges,
    // creating that beautiful, high-tech dimensional wireframe cluster.
    const signedPower = (val: number) => Math.sign(val) * Math.pow(Math.abs(val), 1.12);
    const tShaped = signedPower(t);

    // Left outer spread Y spacing from center (540 in a 1080 canvas)
    const leftSpread = 420;
    // Central bottleneck tight pinch spacing (increased to untangle the middle lines so they don't look like a single blended light beam)
    const centerSpread = 80;
    // Right outer spread Y spacing from center (540 in a 1080 canvas)
    const rightSpread = 420;

    const yStart_base = 540 + tShaped * leftSpread;
    const yCenter_base = 540 + tShaped * centerSpread;
    const yEnd_base = 540 + tShaped * rightSpread;

    const startX = -100;
    const centerX = 960;
    const endX = 2020;

    // Advanced Bezier control points to produce a pure Sin-squared taper transition
    const cp1X = 420;
    const cp2X = 720;
    const cp3X = 1200;
    const cp4X = 1500;

    // Sway offsets for organic individual movement (desynchronized by index)
    const swayAmpCenter = 32 + Math.abs(Math.sin(i * 0.15)) * 18;
    const swayAmpEnds = 12 + Math.abs(Math.cos(i * 0.15)) * 12;

    const phaseA_offset_center = Math.sin(i * 0.45) * swayAmpCenter;
    const phaseA_offset_start = Math.cos(i * 0.3) * swayAmpEnds;
    const phaseA_offset_end = Math.sin(i * 0.35) * swayAmpEnds;

    const phaseB_offset_center = -phaseA_offset_center * 0.95;
    const phaseB_offset_start = -phaseA_offset_start * 0.95;
    const phaseB_offset_end = -phaseA_offset_end * 0.95;

    const yStart_A = yStart_base + phaseA_offset_start;
    const yCenter_A = yCenter_base + phaseA_offset_center;
    const yEnd_A = yEnd_base + phaseA_offset_end;

    const yStart_B = yStart_base + phaseB_offset_start;
    const yCenter_B = yCenter_base + phaseB_offset_center;
    const yEnd_B = yEnd_base + phaseB_offset_end;

    const d_base = `M ${startX},${yStart_base} C ${cp1X},${yStart_base} ${cp2X},${yCenter_base} ${centerX},${yCenter_base} C ${cp3X},${yCenter_base} ${cp4X},${yEnd_base} ${endX},${yEnd_base}`;
    const d_A = `M ${startX},${yStart_A} C ${cp1X},${yStart_A} ${cp2X},${yCenter_A} ${centerX},${yCenter_A} C ${cp3X},${yCenter_A} ${cp4X},${yEnd_A} ${endX},${yEnd_A}`;
    const d_B = `M ${startX},${yStart_B} C ${cp1X},${yStart_B} ${cp2X},${yCenter_B} ${centerX},${yCenter_B} C ${cp3X},${yCenter_B} ${cp4X},${yEnd_B} ${endX},${yEnd_B}`;

    // Desynchronized speeds for natural movement
    const duration = 14 + (i % 6) * 2.5;

    return { id: `wave-line-${i}`, d_base, d_A, d_B, duration, index: i };
  });

  return (
    <div className="absolute inset-0 w-full h-[100vh] min-h-screen pointer-events-none select-none z-0 overflow-hidden bg-transparent">
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
        <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] bg-radial from-[#00E8FA]/10 via-[#9945FF]/3 to-transparent blur-[160px] pointer-events-none select-none" />

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

          {/* 1. UNDERLYING VOLUMETRIC FLOWS: Static, beautifully glowing blurred ribbon contours that project soft light from underneath */}
          <g filter="url(#luxuryHaze)">
            {paths.map((path, idx) => {
              // Standard static glowing lines to keep rendering extremely quiet, clean, and luxurious
              if (idx % 2 !== 0) return null;
              return (
                <path
                  key={`glow-under-${path.id}`}
                  d={path.d_base}
                  fill="none"
                  stroke="url(#hourglassGlowGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="opacity-25"
                >
                  <animate
                    attributeName="d"
                    dur={`${path.duration}s`}
                    repeatCount="indefinite"
                    values={`${path.d_base}; ${path.d_A}; ${path.d_B}; ${path.d_base}`}
                    keyTimes="0; 0.33; 0.66; 1"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                  />
                </path>
              );
            })}
          </g>

          {/* 2. CRISP RUNNING CHANNELS: High-definition precise lanes stacked beautifully on top of the glowing aura */}
          <g>
            {paths.map((path) => (
              <path
                key={`sharp-line-${path.id}`}
                d={path.d_base}
                fill="none"
                stroke="url(#hourglassGrad)"
                strokeWidth="0.95"
                strokeOpacity="0.75"
                strokeLinecap="round"
              >
                <animate
                  attributeName="d"
                  dur={`${path.duration}s`}
                  repeatCount="indefinite"
                  values={`${path.d_base}; ${path.d_A}; ${path.d_B}; ${path.d_base}`}
                  keyTimes="0; 0.33; 0.66; 1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                />
              </path>
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
