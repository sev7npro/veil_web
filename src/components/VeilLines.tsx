import React from "react";

export default function VeilLines({ lang }: { lang?: any } = {}) {
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [isVisible, setIsVisible] = React.useState(true);
  const containerRef = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      cancelAnimationFrame(resizeTimeout);
      resizeTimeout = requestAnimationFrame(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(resizeTimeout);
    };
  }, []);

  // Intersection Observer for efficient scrolling culling
  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  const isMobile = dimensions.width < 768;
  const N = 18; // 18 symmetric pairs

  const lineStyles = React.useMemo(() => {
    const styles = [];
    for (let i = 0; i < N; i++) {
      const f = i / (N - 1); // 0 to 1
      // Thinner, elegant, dynamic stroke width on mobile resembling PC variant but scaled down
      const thickness = isMobile ? 0.22 + f * 0.35 : 0.45 + f * 1.0;
      // Translucent varied opacity like PC version
      const opacity = isMobile ? 0.14 + (1 - f) * 0.32 : 0.14 + (1 - f) * 0.45;

      // Glow effect enabled on both PC and mobile for consistent premium neon styling
      const isGlow = i >= 4 && i <= 8;

      styles.push({
        id: i,
        thickness,
        opacity,
        isGlow,
      });
    }
    return styles;
  }, [isMobile]);

  const upperPathsRef = React.useRef<(SVGPathElement | null)[]>([]);
  const lowerPathsRef = React.useRef<(SVGPathElement | null)[]>([]);
  const upperGlowPathsRef = React.useRef<(SVGPathElement | null)[]>([]);
  const lowerGlowPathsRef = React.useRef<(SVGPathElement | null)[]>([]);

  // Maintain refs lengths
  React.useEffect(() => {
    upperPathsRef.current = upperPathsRef.current.slice(0, N);
    lowerPathsRef.current = lowerPathsRef.current.slice(0, N);
    upperGlowPathsRef.current = upperGlowPathsRef.current.slice(0, N);
    lowerGlowPathsRef.current = lowerGlowPathsRef.current.slice(0, N);
  }, []);

  React.useEffect(() => {
    if (!isVisible) return; // Culling: fully idle when out of view

    let animFrameId: number;
    let lastTime = 0;
    const fps = isMobile ? 45 : 60; // 45 FPS on mobile provides high fluidity while saving on power consumption
    const interval = 1000 / fps;

    const updatePaths = (timestamp: number) => {
      const delta = timestamp - lastTime;
      if (delta < interval) {
        animFrameId = requestAnimationFrame(updatePaths);
        return;
      }
      lastTime = timestamp - (delta % interval);

      const time = timestamp / 1000;
      const W = dimensions.width;
      const H = dimensions.height;
      const scaleX = Math.max(W, 1000) / 2;

      // Reallocate spacings closer to PC parameters for a majestic spaced out display
      const baseGap = isMobile ? 11 : 14;
      const lineSpacing = isMobile ? 3.1 : 3.8;

      // Precompute time variables outside current loops
      const time0_8 = time * 0.8;
      const time1_4 = time * 1.4;
      const time1_9 = time * 1.9;
      const time2_2 = time * 2.2;

      const breath = 1.0 + 0.05 * Math.sin(time0_8);
      const numPoints = isMobile ? 48 : 60; // High frequency points on mobile for pristine high-fidelity curves
      const yCenter = H / 2;

      for (let i = 0; i < N; i++) {
        const innerHeight = baseGap + i * lineSpacing;

        // Optimizations: Math factor precomputations outside inner point-loop
        const lineHumpOffset =
          Math.sin(time1_9 - i * 0.25) * (isMobile ? 5.0 : 7.0);
        const animPhase = time2_2 + i * 0.15;
        const customAmplitude =
          (isMobile ? 38 : 48) + i * (isMobile ? 13.5 : 17.5) + lineHumpOffset;

        let dUpper = "";
        let dLower = "";

        for (let j = 0; j < numPoints; j++) {
          const x = (j / (numPoints - 1)) * W;
          const u = (x - W / 2) / scaleX;

          // Liquid-magnetic organic flow waves
          const ripple = u + 0.1 * Math.sin(time1_4 - u * 3.2);

          // Double-hump symmetrical shape: peaks near +/- 0.45, pinches in the center
          const dHump =
            Math.pow(Math.sin(ripple * Math.PI * 0.65), 2) *
            Math.exp(-0.75 * ripple * ripple);
          const dHumpAnim = dHump + 0.02 * Math.sin(animPhase - u * 9.0);

          // Dynamic vertical offsets
          const yOffset = innerHeight * breath + dHumpAnim * customAmplitude;

          const yUpper = yCenter - yOffset;
          const yLower = yCenter + yOffset;

          const prefix = j === 0 ? "M" : " L";
          dUpper += `${prefix} ${x.toFixed(1)} ${yUpper.toFixed(1)}`;
          dLower += `${prefix} ${x.toFixed(1)} ${yLower.toFixed(1)}`;
        }

        if (upperPathsRef.current[i]) {
          upperPathsRef.current[i]!.setAttribute("d", dUpper);
        }
        if (lowerPathsRef.current[i]) {
          lowerPathsRef.current[i]!.setAttribute("d", dLower);
        }
        if (upperGlowPathsRef.current[i]) {
          upperGlowPathsRef.current[i]!.setAttribute("d", dUpper);
        }
        if (lowerGlowPathsRef.current[i]) {
          lowerGlowPathsRef.current[i]!.setAttribute("d", dLower);
        }
      }

      animFrameId = requestAnimationFrame(updatePaths);
    };

    animFrameId = requestAnimationFrame((t) => {
      lastTime = t;
      updatePaths(t);
    });
    return () => cancelAnimationFrame(animFrameId);
  }, [dimensions, isMobile, isVisible]);

  return (
    <svg
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-1 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <defs>
        {/* Glow filters rendered with adaptive standard deviation for beautiful neon rendering */}
        <filter
          id="veil-glow-blur"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation={isMobile ? "1.6" : "3.5"} />
        </filter>

        {lineStyles.map((line) => {
          const i = line.id;
          // Dynamically generate the linear-radial glowing properties
          // Inner lines: Bright neon mint/cyan. Middle: Electric green. Outer: Indigo/violet
          let startCol = "#6366f1"; // Indigo
          let midCol = "#00f5c4"; // Neon mint cyan
          let endCol = "#3b82f6"; // Neon blue

          if (i >= 0 && i < 6) {
            // Inner lines - pure magical cyan
            startCol = "#4f46e5";
            midCol = "#00F5D4";
            endCol = "#06b6d4";
          } else if (i >= 6 && i < 12) {
            // Middle lines - beautiful emerald to cyan transition
            startCol = "#7c3aed";
            midCol = "#10b981";
            endCol = "#3b82f6";
          } else {
            // Outer lines - rich indigo to purple
            startCol = "#c084fc";
            midCol = "#6366f1";
            endCol = "#9333ea";
          }

          return (
            <linearGradient
              key={`line-gradient-${i}`}
              id={`veil-custom-grad-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={startCol} stopOpacity="0" />
              <stop
                offset="22%"
                stopColor={startCol}
                stopOpacity={line.opacity * 0.65}
              />
              <stop
                offset="50%"
                stopColor={midCol}
                stopOpacity={line.opacity}
              />
              <stop
                offset="78%"
                stopColor={endCol}
                stopOpacity={line.opacity * 0.65}
              />
              <stop offset="100%" stopColor={endCol} stopOpacity="0" />
            </linearGradient>
          );
        })}
      </defs>

      {/* Glow path duplicates - Enabled on both but optimized/thinned down on mobile */}
      {lineStyles.map((line) => {
        if (!line.isGlow) return null;
        const i = line.id;
        return (
          <g key={`glow-group-${i}`}>
            <path
              ref={(el) => {
                if (upperGlowPathsRef.current)
                  upperGlowPathsRef.current[i] = el;
              }}
              fill="none"
              stroke={`url(#veil-custom-grad-${i})`}
              strokeWidth={line.thickness * (isMobile ? 1.8 : 2.8)}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#veil-glow-blur)"
              opacity={isMobile ? 0.16 : 0.25}
            />
            <path
              ref={(el) => {
                if (lowerGlowPathsRef.current)
                  lowerGlowPathsRef.current[i] = el;
              }}
              fill="none"
              stroke={`url(#veil-custom-grad-${i})`}
              strokeWidth={line.thickness * (isMobile ? 1.8 : 2.8)}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#veil-glow-blur)"
              opacity={isMobile ? 0.16 : 0.25}
            />
          </g>
        );
      })}

      {/* Main crisp high fidelity line vectors */}
      {lineStyles.map((line) => {
        const i = line.id;
        return (
          <g key={`main-group-${i}`}>
            <path
              ref={(el) => {
                if (upperPathsRef.current) upperPathsRef.current[i] = el;
              }}
              fill="none"
              stroke={`url(#veil-custom-grad-${i})`}
              strokeWidth={line.thickness}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={(el) => {
                if (lowerPathsRef.current) lowerPathsRef.current[i] = el;
              }}
              fill="none"
              stroke={`url(#veil-custom-grad-${i})`}
              strokeWidth={line.thickness}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

