import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface BlockData {
  id: number;
  label: string;
  gridX: number;
  gridY: number;
  gridZ: number; // 1 for Core, 2 for App Layer
  height: number;
  topColor: string;
  leftColor: string;
  rightColor: string;
  isHero?: boolean;
}

interface VeilStackSectionProps {
  lang?: "EN" | "RU";
}

export default function VeilStackSection({
  lang = "EN",
}: VeilStackSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);

  // High-fidelity animation progress state for the 10 blocks (1-indexed for convenience or 0-9)
  const [animateProgress, setAnimateProgress] = React.useState<number[]>(
    new Array(11).fill(0),
  );

  const t = {
    EN: {
      stackTitle: "The VEIL",
      stackTitleItalic: "Stack",
      solanaPlatform: "SOLANA FOUNDATION",
      veilCore: "VEIL CORE",
      veilAppLayer: "VEIL APP LAYER",
      heroSystem: "HERO SYSTEM",
      block1_meta: "CURRENT STATE // PRIVACY COGNITO",
      block1_title: "Absolute privacy.",
      block1_desc:
        "Private trading without compromise. Transaction routing via private Jito bundles bypassing the public mempool using hidden STELS addresses. Transactions are fully protected against sandwich attacks and front-running.",
      block2_meta: "CURRENT STATE // SECURE BASTION",
      block2_title: "Sovereign custody.",
      block2_desc:
        "Two-wallet model (Master/Stels) with local key generation and AES-256-GCM encryption on the basis of Argon2id right in your device. Autonomous control of the database with encrypted backups. Your keys — your rules.",
      block3_meta: "STAGE // 03   -   TELEGRAM ACCESS DESK",
      block3_title: "MINI APP & BOT TERMINAL",
      block3_desc:
        "Complete independence from centralized servers. Your messenger is your sovereign trading gateway. Two parallel interfaces (bot text-based FSM console and graphical Mini App) guarantee 100% fault tolerance and liquidity management freedom.",
      nexus_meta: "CURRENT STATE // NEXUS V3 - DERIVATIVES TRACK",
      nexus_title: "Perpetual trading.",
      nexus_desc:
        "Professional derivative track for perpetual contracts. Direct backend integration with the Jupiter Perpetuals protocol is launched and successfully functioning. Local risk engine ensures margin and liquidation control, isolated positions operate via Stels wallets, and fee payments are processed via private relayers without binding Master and Stels addresses.",
    },
    RU: {
      stackTitle: "Архитектура",
      stackTitleItalic: "VEIL",
      solanaPlatform: "БАЗА SOLANA",
      veilCore: "ЯДРО VEIL",
      veilAppLayer: "УРОВЕНЬ ПРИЛОЖЕНИЙ",
      heroSystem: "ГЛАВНЫЙ МОДУЛЬ",
      block1_meta: "CURRENT STATE // PRIVACY COGNITO",
      block1_title: "Абсолютная приватность.",
      block1_desc:
        "Приватный трейдинг без компромиссов. Маршрутизация транзакций через приватные бандлы Jito в обход публичного мемпула с использованием скрытых STELS-адресов. Сделки защищены от сэндвич-атак и фронтраннинга.",
      block2_meta: "CURRENT STATE // SECURE BASTION",
      block2_title: "Суверенное хранение.",
      block2_desc:
        "Двухкошельковая модель (Master/Stels) с локальной генерацией ключей и шифрованием по алгоритму AES-256-GCM на базе Argon2id прямо в твоем девайсе. Автономный контроль базы данных с зашифрованными бэкапами. Твои ключи — твои правила.",
      block3_meta: "STAGE // 03   -   TELEGRAM ACCESS DESK",
      block3_title: "MINI APP И БОТ-ТЕРМИНАЛ",
      block3_desc:
        "Полная независимость от централизованных серверов. Ваш мессенджер — ваш суверенный торговый шлюз. Два параллельных интерфейса (текстовая FSM-консоль бота и графическое Mini App) гарантируют 100% отказоустойчивость и свободу управления ликвидностью.",
      nexus_meta: "CURRENT STATE // NEXUS V3 - DERIVATIVES TRACK",
      nexus_title: "Бессрочная торговля.",
      nexus_desc:
        "Профессиональный деривативный трек для бессрочных контрактов. Прямая бэкенд-интеграция с протоколом Jupiter Perpetuals запущена и успешно функционирует. Локальный движок рисков обеспечивает контроль маржи и ликвидаций, изолированные позиции работают через STELS-кошельки, а оплата комиссий обрабатывается через приватные ретрансляторы (relayers) без привязки Master и STELS адресов.",
    },
  }[lang];

  const blockLabels = {
    EN: {
      b1: "Private RPC",
      b2: "MEV Shield",
      b3: "MINI APP TERMINAL",
      b4: "Order Router",
      b5: "Liquidity Agg.",
      b6: "Spot Trading",
      b7: "NEXUS",
      b8: "Analytics",
      b9: "Portfolio",
      b10: "More Apps",
    },
    RU: {
      b1: "Приватный RPC",
      b2: "MEV Щит",
      b3: "MINI APP TERMINAL",
      b4: "Маршрутизатор",
      b5: "Агрегатор ликв.",
      b6: "Спот-торговля",
      b7: "NEXUS",
      b8: "Аналитика",
      b9: "Портфолио",
      b10: "Другие аппы",
    },
  }[lang];

  // Determine if mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [stage, setStage] = React.useState(0);
  const stageRef = React.useRef(0);
  const [mobileSlideIndex, setMobileSlideIndex] = React.useState(0);
  const [hoveredBlockId, setHoveredBlockId] = React.useState<number | null>(
    null,
  );
  const isLockedRef = React.useRef(false);
  const isSnappingRef = React.useRef(false);
  const hasExitedDownRef = React.useRef(false);
  const hasExitedUpRef = React.useRef(false);
  const wheelTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Mobile slide index is manually controlled by arrows
    return () => {};
  }, [isMobile]);

  // Monitor layout scrolling to reset exit flags once the section goes completely out of view
  React.useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const outOfView =
        rect.bottom < -150 || rect.top > window.innerHeight + 150;
      if (outOfView) {
        hasExitedDownRef.current = false;
        hasExitedUpRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      setStage(3);
      return;
    }

    const smoothScrollTo = (
      targetY: number,
      duration: number,
      callback?: () => void,
    ) => {
      const startY = window.scrollY;
      const difference = targetY - startY;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out curve for buttery deceleration
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startY + difference * ease);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else if (callback) {
          callback();
        }
      };

      requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // If currently animated snapping is in progress, block all inputs
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      // If scroll is not locked, check if we should lock and snap
      if (!isLockedRef.current) {
        if (e.deltaY > 0) {
          // Scrolling down: lock and snap if the section is entering or partly overshot, and we haven't exited
          const canLockDown =
            rect.top >= -250 &&
            rect.top <= window.innerHeight * 0.8 &&
            stageRef.current < 3 &&
            !hasExitedDownRef.current;
          if (canLockDown) {
            e.preventDefault();
            isLockedRef.current = true;
            isSnappingRef.current = true;

            const targetY = window.scrollY + rect.top;
            smoothScrollTo(targetY, 1100, () => {
              isSnappingRef.current = false;
            });
            return;
          }
        } else if (e.deltaY < 0) {
          // Scrolling up: lock and snap if we are coming from below and section top is within range
          const canLockUp =
            rect.top >= -window.innerHeight * 0.8 &&
            rect.top <= 250 &&
            stageRef.current > 0 &&
            !hasExitedUpRef.current;
          if (canLockUp) {
            e.preventDefault();
            isLockedRef.current = true;
            isSnappingRef.current = true;

            const targetY = window.scrollY + rect.top;
            smoothScrollTo(targetY, 1100, () => {
              isSnappingRef.current = false;
            });
            return;
          }
        }
        return; // standard uninhibited native scroll
      }

      // If we are locked, block standard scrolling entirely
      e.preventDefault();

      if (!wheelTimeoutRef.current) {
        if (e.deltaY > 0) {
          // Advance stages
          if (stageRef.current < 3) {
            stageRef.current++;
            setStage(stageRef.current);
            wheelTimeoutRef.current = setTimeout(() => {
              wheelTimeoutRef.current = null;
            }, 850);
          } else {
            // All stages shown: unlock scroll downward
            isLockedRef.current = false;
            hasExitedDownRef.current = true;
            hasExitedUpRef.current = false;
            wheelTimeoutRef.current = setTimeout(() => {
              wheelTimeoutRef.current = null;
            }, 700);
          }
        } else if (e.deltaY < 0) {
          // Regress stages
          if (stageRef.current > 0) {
            stageRef.current--;
            setStage(stageRef.current);
            wheelTimeoutRef.current = setTimeout(() => {
              wheelTimeoutRef.current = null;
            }, 850);
          } else {
            // Back to initial: unlock scroll upward
            isLockedRef.current = false;
            hasExitedUpRef.current = true;
            hasExitedDownRef.current = false;
            wheelTimeoutRef.current = setTimeout(() => {
              wheelTimeoutRef.current = null;
            }, 700);
          }
        }
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (isLockedRef.current || isSnappingRef.current) {
        const blockedKeys = [
          "ArrowUp",
          "ArrowDown",
          "Space",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ];
        if (blockedKeys.includes(e.key)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeydown, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isMobile]);

  // 10 blocks definition
  const allBlocks: BlockData[] = [
    {
      id: 1,
      label: blockLabels.b1,
      gridX: 1.1,
      gridY: 1.2,
      gridZ: 2,
      height: 80,
      topColor: "#1E1C30",
      leftColor: "#100E1D",
      rightColor: "#151325",
    },
    {
      id: 2,
      label: blockLabels.b2,
      gridX: -1.1,
      gridY: 1.2,
      gridZ: 2,
      height: 55,
      topColor: "#1C1A2C",
      leftColor: "#0F0E1A",
      rightColor: "#131221",
    },
    {
      id: 3,
      label: blockLabels.b3,
      gridX: 0.0,
      gridY: 1.2,
      gridZ: 2,
      height: 180,
      topColor: "#5A4E8A",
      leftColor: "#3A3268",
      rightColor: "#4A4278",
      isHero: true,
    },
    {
      id: 4,
      label: blockLabels.b4,
      gridX: 1.1,
      gridY: -1.2,
      gridZ: 2,
      height: 100,
      topColor: "#1E1C30",
      leftColor: "#100E1D",
      rightColor: "#151325",
    },
    {
      id: 5,
      label: blockLabels.b5,
      gridX: 2.2,
      gridY: 1.2,
      gridZ: 2,
      height: 130,
      topColor: "#1C1A2E",
      leftColor: "#0E0E1C",
      rightColor: "#121221",
    },
    {
      id: 6,
      label: blockLabels.b6,
      gridX: -2.2,
      gridY: 1.2,
      gridZ: 2,
      height: 120,
      topColor: "#2A2440",
      leftColor: "#1A152B",
      rightColor: "#211A34",
    },
    {
      id: 7,
      label: blockLabels.b7,
      gridX: -1.1,
      gridY: -1.2,
      gridZ: 2,
      height: 85,
      topColor: "#24203A",
      leftColor: "#161326",
      rightColor: "#1C182F",
    },
    {
      id: 8,
      label: blockLabels.b8,
      gridX: 2.2,
      gridY: -1.2,
      gridZ: 2,
      height: 110,
      topColor: "#26223C",
      leftColor: "#171428",
      rightColor: "#1E1931",
    },
    {
      id: 9,
      label: blockLabels.b9,
      gridX: -2.2,
      gridY: -1.2,
      gridZ: 2,
      height: 70,
      topColor: "#221E36",
      leftColor: "#141123",
      rightColor: "#1A162B",
    },
    {
      id: 10,
      label: blockLabels.b10,
      gridX: 0.0,
      gridY: -1.2,
      gridZ: 2,
      height: 95,
      topColor: "#28223E",
      leftColor: "#18142A",
      rightColor: "#1F1932",
    },
  ];

  // Sorting blocks to get the exact left-to-right rank (used for stagger animation index)
  const sortedByXminusY = React.useMemo(() => {
    return [...allBlocks].sort(
      (a, b) => a.gridX - a.gridY - (b.gridX - b.gridY),
    );
  }, [lang]); // depends on lang because allBlocks depends on labels

  const getRank = React.useCallback(
    (blockId: number) => {
      return sortedByXminusY.findIndex((b) => b.id === blockId);
    },
    [sortedByXminusY],
  );

  const hasAnimated = React.useRef(false);

  // Handle stagger animations once section is in view
  React.useEffect(() => {
    if (isMobile) {
      setAnimateProgress(new Array(11).fill(1));
      return;
    }

    const showStage3 = stage >= 3;

    if (!showStage3) {
      // Allow re-animating if scrolled back up
      setAnimateProgress(new Array(11).fill(0));
      hasAnimated.current = false;
      return;
    }

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 700; // ms
    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

    let start: number | null = null;
    let animActive = true;

    const step = (timestamp: number) => {
      if (!animActive) return;
      if (!start) start = timestamp;
      const elapsedTotal = timestamp - start;
      let allCompleted = true;

      const nextProgress = new Array(11).fill(0);

      allBlocks.forEach((block) => {
        const rank = getRank(block.id);
        const staggerDelay = rank * 70; // 0.07s per block, left to right
        const elapsedBlock = elapsedTotal - staggerDelay;

        let progress = 0;
        if (elapsedBlock > 0) {
          progress = Math.min(1, elapsedBlock / duration);
        }

        nextProgress[block.id] = easeOutQuart(progress);

        if (progress < 1) {
          allCompleted = false;
        }
      });

      setAnimateProgress(nextProgress);

      if (!allCompleted) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);

    return () => {
      animActive = false;
    };
  }, [stage >= 3, isMobile, getRank]);

  // Platforms thickness: all identical, with gaps between them
  const platformThickness = 40;
  const platformGap = 20;

  const thickness1 = platformThickness; // Solana platform thickness
  const thickness2 = platformThickness; // VEIL Core platform thickness
  const thickness3 = platformThickness; // VEIL App platform thickness

  // Helper calculating vertical offsets under perfect stacking
  const getZOffset = (gz: number) => {
    if (gz === 0) return 0;
    if (gz === 1) return -(thickness1 + platformGap);
    // For gz >= 2 (App Layer surface, where the towers sit)
    return -(thickness1 + thickness2 + platformGap * 2);
  };

  // Standard isometric projection formula inside raw coordinate system
  const project = (gx: number, gy: number, gz: number) => {
    const tileW = 60;
    const tileH = 30;
    const x = (gx - gy) * tileW;
    const y = (gx + gy) * tileH + getZOffset(gz);
    return { x, y };
  };

  // Build points helper for a centered platform slab of size W x H at level Z
  const getSlabPoints = (W: number, H: number, Z: number) => {
    const hx = W / 2;
    const hy = H / 2;
    return {
      back: project(-hx, -hy, Z),
      left: project(-hx, hy, Z),
      front: project(hx, hy, Z),
      right: project(hx, -hy, Z),
    };
  };

  // Precompile slab coordinates relative to transform origin of the SVG group
  // All three slabs are of absolutely identical width and depth (no step, straight stack)
  const slabW = 5.2;
  const slabH = 3.9;
  const slabS1 = getSlabPoints(slabW, slabH, 0); // Solana
  const slabS2 = getSlabPoints(slabW, slabH, 1); // VEIL Core
  const slabS3 = getSlabPoints(slabW, slabH, 2); // VEIL App (Identical in size to Solana and Veil Core, no pyramid steps)

  // Sort blocks for Back-to-Front Painter's Algorithm
  // Backmost blocks have smallest (gridX + gridY), frontmost have largest.
  const painterSortedBlocks = React.useMemo(() => {
    return [...allBlocks].sort((a, b) => {
      if (a.gridZ !== b.gridZ) {
        return a.gridZ - b.gridZ; // Lower layer blocks drawn first (background)
      }
      return a.gridX + a.gridY - (b.gridX + b.gridY);
    });
  }, [lang]);

  const slabTopColor = "#0d0a1b";
  const slabLeftColor = "#1D1936";
  const slabRightColor = "#151228";
  const slabStrokeColor = "rgba(144, 136, 176, 0.22)";

  const labelS1X = (slabS1.left.x + slabS1.front.x) / 2;
  const labelS1Y = (slabS1.left.y + slabS1.front.y) / 2 + thickness1 / 2 + 3;

  const labelS2X = (slabS2.left.x + slabS2.front.x) / 2;
  const labelS2Y = (slabS2.left.y + slabS2.front.y) / 2 + thickness2 / 2 + 3;

  const labelS3X = (slabS3.left.x + slabS3.front.x) / 2;
  const labelS3Y = (slabS3.left.y + slabS3.front.y) / 2 + thickness3 / 2 + 3;

  // Helper calculating exact center of a block's top face dynamically
  const getBlockTopCenter = (blockId: number) => {
    const block = allBlocks.find((b) => b.id === blockId);
    if (!block) return { x: 0, y: 0 };
    const base = project(block.gridX, block.gridY, block.gridZ);
    const heightScale =
      animateProgress[block.id] !== undefined ? animateProgress[block.id] : 1;
    const currentHeight = block.height * heightScale;
    return { x: base.x, y: base.y - currentHeight };
  };

  // Stages threshold visibility
  const showStage1 = isMobile || stage >= 1;
  const showStage2 = isMobile || stage >= 2;
  const showStage3 = isMobile || stage >= 3;

  const focusStage1 = showStage1 && !showStage2;
  const focusStage2 = showStage2 && !showStage3;
  const focusStage3 = showStage3;

  let activeMobileBlock: number | string | null = null;
  if (isMobile) {
    if (mobileSlideIndex === 0) activeMobileBlock = "slab1"; // SOLANA (Sovereign Custody)
    else if (mobileSlideIndex === 1) activeMobileBlock = "slab2"; // VEIL CORE (Privacy)
    else if (mobileSlideIndex === 2) activeMobileBlock = 7; // NEXUS
    else if (mobileSlideIndex === 3) activeMobileBlock = 3; // Mini App Terminal
  }
  const effectiveHoveredBlockId = hoveredBlockId ?? (typeof activeMobileBlock === "number" ? activeMobileBlock : null);
  let effectiveHoveredSlab = typeof activeMobileBlock === "string" ? activeMobileBlock : null;
  if (effectiveHoveredBlockId === 7 || effectiveHoveredBlockId === 3) {
    effectiveHoveredSlab = "slab3";
  }

  const callout3Opacity = isMobile ? 1 : showStage1 ? 1 : 0;
  const callout1Opacity = isMobile ? 1 : showStage2 ? 1 : 0;
  const callout2Opacity = isMobile ? 1 : showStage3 ? 1 : 0;
  const callout4Opacity = isMobile ? 1 : showStage3 ? 1 : 0;

  const isMiniAppHovered = effectiveHoveredBlockId === 3;
  const isNexusHovered = effectiveHoveredBlockId === 7;

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#050505] select-none text-left z-20 ${
        isMobile ? "pt-4 pb-12" : "min-h-screen"
      }`}
      id="module-stack"
    >
      <div
        className={`${
          isMobile
            ? "flex flex-col items-center gap-0 px-4"
            : "absolute inset-0 flex flex-col justify-center items-center overflow-hidden"
        }`}
      >
        {/* Module Title */}
        <div
          className="w-full text-center px-6 transition-all duration-1000 ease-out mt-[50px] md:mt-0 md:absolute md:top-16 md:left-0 md:right-0 md:z-30 md:mb-0"
          style={{
            opacity: isMobile || showStage1 ? 1 : 0,
            transform:
              isMobile || showStage1 ? "translateY(0)" : "translateY(24px)",
            marginBottom: isMobile ? "24px" : "0",
          }}
        >
          <h2
            className="font-sans font-light text-[#b3afb8]"
            style={{
              fontSize: "clamp(20px, 2.5vw, 34px)",
              letterSpacing: "0.02em",
            }}
          >
            {t.stackTitle}{" "}
            <span className="text-[#EDEAE2] font-medium tracking-wide">
              {t.stackTitleItalic}
            </span>
          </h2>
        </div>

        {/* Central visual wrapper */}
        <div className="relative w-full max-w-[1200px] h-[340px] sm:h-[450px] md:h-[650px] stack-diagram-wrapper">
          {/* ================= DESKTOP SIDE ANNOTATION CALLOUTS ================= */}
          {!isMobile && (
            <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-10 py-10 px-8 sm:px-14">
              {/* Left Column (Privacy & Sovereign Layers) */}
              <div className="col-span-3 flex flex-col justify-between h-full py-4">
                {/* Block 1 (Left Top, Privacy Layer) */}
                <div
                  className="callout transition-all duration-1000 select-text pointer-events-auto"
                  style={{
                    opacity: callout1Opacity,
                    transform: showStage2
                      ? "translateY(0)"
                      : "translateY(16px)",
                    pointerEvents: showStage2 ? "auto" : "none",
                  }}
                >
                  <h3 className="text-white font-light text-lg sm:text-xl tracking-wide mt-2">
                    {t.block1_title}
                  </h3>
                  <p className="text-stone-400 font-light text-xs sm:text-sm mt-3 leading-relaxed max-w-[280px]">
                    {t.block1_desc}
                  </p>
                </div>

                {/* Block 2 (Left Bottom, Sovereign Layer) */}
                <div
                  className="callout transition-all duration-1000 select-text pointer-events-auto"
                  style={{
                    opacity: callout3Opacity,
                    transform: showStage1
                      ? "translateY(0)"
                      : "translateY(16px)",
                    pointerEvents: showStage1 ? "auto" : "none",
                  }}
                >
                  <h3 className="text-white font-light text-lg sm:text-xl tracking-wide mt-2">
                    {t.block2_title}
                  </h3>
                  <p className="text-stone-400 font-light text-xs sm:text-sm mt-3 leading-relaxed max-w-[280px]">
                    {t.block2_desc}
                  </p>
                </div>
              </div>

              {/* Middle is empty for the isometric canvas */}
              <div className="col-span-6" />

              {/* Right Column (Derivatives & Access Layers) */}
              <div className="col-span-3 flex flex-col justify-center gap-6 h-full py-4">
                {/* Block 7 (Right Top, NEXUS) */}
                <div
                  className={`callout transition-all duration-1000 select-text pointer-events-auto ${
                    isNexusHovered ? "scale-[1.02]" : ""
                  }`}
                  style={{
                    opacity: callout4Opacity,
                    transform: showStage3
                      ? "translateY(0)"
                      : "translateY(16px)",
                    pointerEvents: showStage3 ? "auto" : "none",
                  }}
                >
                  <h3 className="text-[#E3D4B6] font-medium text-lg sm:text-xl tracking-wide mt-2 transition-all duration-300">
                    {t.nexus_title}
                  </h3>
                  <p className="text-stone-300 font-light text-xs sm:text-sm mt-3 leading-relaxed max-w-[280px] transition-all duration-300">
                    {t.nexus_desc}
                  </p>
                </div>

                {/* Block 3 (Right Bottom, Mini App & Bot Terminal) */}
                <div
                  className={`callout transition-all duration-1000 select-text pointer-events-auto ${
                    isMiniAppHovered ? "scale-[1.02]" : ""
                  }`}
                  style={{
                    opacity: callout2Opacity,
                    transform: showStage3
                      ? "translateY(0)"
                      : "translateY(16px)",
                    pointerEvents: showStage3 ? "auto" : "none",
                    transitionDelay: showStage3 ? "700ms" : "0ms",
                  }}
                >
                  <h3 className="text-white font-light text-lg sm:text-xl tracking-wide mt-2 transition-all duration-300">
                    {t.block3_title}
                  </h3>
                  <p className="text-stone-400 font-light text-xs sm:text-sm mt-3 leading-relaxed max-w-[280px] transition-all duration-300">
                    {t.block3_desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= MOBILE CONTROLS ================= */}
          {isMobile && (
            <button
              onClick={() => setMobileSlideIndex((prev) => (prev + 1) % 4)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center p-3 text-[#8B5CF6] hover:text-purple-400 transition-colors"
              aria-label="Next slide"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}

          {/* ================= THE SVG CANVAS ================= */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Ambient Violet Glow under the isometric stack */}
            <div className="absolute w-[600px] h-[300px] bg-indigo-900/10 rounded-full filter blur-[120px] pointer-events-none" />

            <svg
              viewBox="0 0 1200 700"
              className="w-full h-full overflow-visible stack-svg select-none pointer-events-auto scale-[1.45] -translate-y-[44px] md:translate-y-0 md:scale-100"
              id="veil-stack-svg"
            >
              <defs>
                {/* Glow Filter for the Trading Terminal Hero block */}
                <filter
                  id="glow-filter"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="16" result="blur" />
                </filter>
                <linearGradient
                  id="hero-top-grad"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#5A4E8A" />
                  <stop offset="100%" stopColor="#7E6FB5" />
                </linearGradient>
                {/* White Glow Filter for the Sovereign top face */}
                <filter
                  id="white-glow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* We apply a translation to center around bottom-half of viewBox */}
              <g transform="translate(600, 410)">
                {/* ================= LAYER 1: SOLANA PLATFORM ================= */}
                <g
                  className="transition-opacity duration-1000"
                  style={{ opacity: showStage1 ? 1 : 0.15 }}
                >
                  {/* Left front face */}
                  <polygon
                    points={`${slabS1.left.x},${slabS1.left.y} ${slabS1.front.x},${slabS1.front.y} ${slabS1.front.x},${slabS1.front.y + thickness1} ${slabS1.left.x},${slabS1.left.y + thickness1}`}
                    fill={slabLeftColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Right front face */}
                  <polygon
                    points={`${slabS1.front.x},${slabS1.front.y} ${slabS1.right.x},${slabS1.right.y} ${slabS1.right.x},${slabS1.right.y + thickness1} ${slabS1.front.x},${slabS1.front.y + thickness1}`}
                    fill={slabRightColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Top Slab polygon */}
                  <polygon
                    points={`${slabS1.back.x},${slabS1.back.y} ${slabS1.left.x},${slabS1.left.y} ${slabS1.front.x},${slabS1.front.y} ${slabS1.right.x},${slabS1.right.y}`}
                    fill={slabTopColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Whole Plate Purple Glow Overlays */}
                  <g
                    className="transition-opacity duration-500 ease-out pointer-events-none"
                    style={{
                      opacity: effectiveHoveredSlab === "slab1" ? 0.3 : 0,
                    }}
                  >
                    {/* Left front glow overlay */}
                    <polygon
                      points={`${slabS1.left.x},${slabS1.left.y} ${slabS1.front.x},${slabS1.front.y} ${slabS1.front.x},${slabS1.front.y + thickness1} ${slabS1.left.x},${slabS1.left.y + thickness1}`}
                      fill="#8B5CF6"
                      filter="url(#white-glow)"
                    />
                    {/* Right front glow overlay */}
                    <polygon
                      points={`${slabS1.front.x},${slabS1.front.y} ${slabS1.right.x},${slabS1.right.y} ${slabS1.right.x},${slabS1.right.y + thickness1} ${slabS1.front.x},${slabS1.front.y + thickness1}`}
                      fill="#8B5CF6"
                      filter="url(#white-glow)"
                    />
                    {/* Top Slab glow overlay */}
                    <polygon
                      points={`${slabS1.back.x},${slabS1.back.y} ${slabS1.left.x},${slabS1.left.y} ${slabS1.front.x},${slabS1.front.y} ${slabS1.right.x},${slabS1.right.y}`}
                      fill="#C084FC"
                      filter="url(#white-glow)"
                    />
                  </g>
                  {/* Solana Slab Label on front left edge */}
                  <text
                    x={labelS1X}
                    y={labelS1Y}
                    textAnchor="middle"
                    transform={`rotate(26.56, ${labelS1X}, ${labelS1Y})`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: effectiveHoveredSlab === "slab1" ? 600 : 400,
                      fontSize: "8px",
                      fill: effectiveHoveredSlab === "slab1" ? "#FFFFFF" : "rgba(144, 136, 176, 0.65)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t.solanaPlatform}
                  </text>
                </g>

                {/* ================= LAYER 2: VEIL CORE PLATFORM ================= */}
                <g
                  className="transition-opacity duration-1000"
                  style={{ opacity: showStage2 ? 1 : 0.15 }}
                >
                  {/* Left front face */}
                  <polygon
                    points={`${slabS2.left.x},${slabS2.left.y} ${slabS2.front.x},${slabS2.front.y} ${slabS2.front.x},${slabS2.front.y + thickness2} ${slabS2.left.x},${slabS2.left.y + thickness2}`}
                    fill={slabLeftColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Right front face */}
                  <polygon
                    points={`${slabS2.front.x},${slabS2.front.y} ${slabS2.right.x},${slabS2.right.y} ${slabS2.right.x},${slabS2.right.y + thickness2} ${slabS2.front.x},${slabS2.front.y + thickness2}`}
                    fill={slabRightColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Top Slab polygon */}
                  <polygon
                    points={`${slabS2.back.x},${slabS2.back.y} ${slabS2.left.x},${slabS2.left.y} ${slabS2.front.x},${slabS2.front.y} ${slabS2.right.x},${slabS2.right.y}`}
                    fill={slabTopColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Whole Plate Purple Glow Overlays */}
                  <g
                    className="transition-opacity duration-500 ease-out pointer-events-none"
                    style={{
                      opacity: effectiveHoveredSlab === "slab2" ? 0.3 : 0,
                    }}
                  >
                    {/* Left front glow overlay */}
                    <polygon
                      points={`${slabS2.left.x},${slabS2.left.y} ${slabS2.front.x},${slabS2.front.y} ${slabS2.front.x},${slabS2.front.y + thickness2} ${slabS2.left.x},${slabS2.left.y + thickness2}`}
                      fill="#8B5CF6"
                      filter="url(#white-glow)"
                    />
                    {/* Right front glow overlay */}
                    <polygon
                      points={`${slabS2.front.x},${slabS2.front.y} ${slabS2.right.x},${slabS2.right.y} ${slabS2.right.x},${slabS2.right.y + thickness2} ${slabS2.front.x},${slabS2.front.y + thickness2}`}
                      fill="#8B5CF6"
                      filter="url(#white-glow)"
                    />
                    {/* Top Slab glow overlay */}
                    <polygon
                      points={`${slabS2.back.x},${slabS2.back.y} ${slabS2.left.x},${slabS2.left.y} ${slabS2.front.x},${slabS2.front.y} ${slabS2.right.x},${slabS2.right.y}`}
                      fill="#C084FC"
                      filter="url(#white-glow)"
                    />
                  </g>
                  {/* VEIL Core label */}
                  <text
                    x={labelS2X}
                    y={labelS2Y}
                    textAnchor="middle"
                    transform={`rotate(26.56, ${labelS2X}, ${labelS2Y})`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: effectiveHoveredSlab === "slab2" ? 600 : 400,
                      fontSize: "8px",
                      fill: effectiveHoveredSlab === "slab2" ? "#FFFFFF" : "rgba(144, 136, 176, 0.65)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t.veilCore}
                  </text>
                </g>

                {/* ================= LAYER 3: VEIL APP LAYER PLATFORM ================= */}
                <g
                  className="transition-opacity duration-1000"
                  style={{ opacity: showStage3 ? 1 : 0.15 }}
                >
                  {/* Left front face */}
                  <polygon
                    points={`${slabS3.left.x},${slabS3.left.y} ${slabS3.front.x},${slabS3.front.y} ${slabS3.front.x},${slabS3.front.y + thickness3} ${slabS3.left.x},${slabS3.left.y + thickness3}`}
                    fill={slabLeftColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Right front face */}
                  <polygon
                    points={`${slabS3.front.x},${slabS3.front.y} ${slabS3.right.x},${slabS3.right.y} ${slabS3.right.x},${slabS3.right.y + thickness3} ${slabS3.front.x},${slabS3.front.y + thickness3}`}
                    fill={slabRightColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Top Slab polygon */}
                  <polygon
                    points={`${slabS3.back.x},${slabS3.back.y} ${slabS3.left.x},${slabS3.left.y} ${slabS3.front.x},${slabS3.front.y} ${slabS3.right.x},${slabS3.right.y}`}
                    fill={slabTopColor}
                    stroke={slabStrokeColor}
                    strokeWidth="1"
                  />
                  {/* Whole Plate Purple Glow Overlays */}
                  <g
                    className="transition-opacity duration-500 ease-out pointer-events-none"
                    style={{
                      opacity: effectiveHoveredSlab === "slab3" ? 0.15 : 0,
                    }}
                  >
                    {/* Left front glow overlay */}
                    <polygon
                      points={`${slabS3.left.x},${slabS3.left.y} ${slabS3.front.x},${slabS3.front.y} ${slabS3.front.x},${slabS3.front.y + thickness3} ${slabS3.left.x},${slabS3.left.y + thickness3}`}
                      fill="#8B5CF6"
                      filter="url(#white-glow)"
                    />
                    {/* Right front glow overlay */}
                    <polygon
                      points={`${slabS3.front.x},${slabS3.front.y} ${slabS3.right.x},${slabS3.right.y} ${slabS3.right.x},${slabS3.right.y + thickness3} ${slabS3.front.x},${slabS3.front.y + thickness3}`}
                      fill="#8B5CF6"
                      filter="url(#white-glow)"
                    />
                    {/* Top Slab glow overlay */}
                    <polygon
                      points={`${slabS3.back.x},${slabS3.back.y} ${slabS3.left.x},${slabS3.left.y} ${slabS3.front.x},${slabS3.front.y} ${slabS3.right.x},${slabS3.right.y}`}
                      fill="#C084FC"
                      filter="url(#white-glow)"
                    />
                  </g>
                  {/* VEIL App layer label */}
                  <text
                    x={labelS3X}
                    y={labelS3Y}
                    textAnchor="middle"
                    transform={`rotate(26.56, ${labelS3X}, ${labelS3Y})`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: effectiveHoveredSlab === "slab3" ? 600 : 400,
                      fontSize: "8px",
                      fill: effectiveHoveredSlab === "slab3" ? "#FFFFFF" : "rgba(144, 136, 176, 0.65)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t.veilAppLayer}
                  </text>
                </g>

                {/* ================= RENDER ALL BLOCKS BACK-TO-FRONT ================= */}
                {painterSortedBlocks.map((block) => {
                  const revealedScale =
                    animateProgress[block.id] !== undefined
                      ? animateProgress[block.id]
                      : 0;
                  const currentHeight = block.height * revealedScale;

                  if (currentHeight <= 0) return null;

                  const w = 0.35; // Block half width (spacing is perfect with this)
                  const zBase = block.gridZ;

                  // Bottom face corners projected isometrically
                  const b0 = project(block.gridX - w, block.gridY - w, zBase); // Back
                  const b1 = project(block.gridX - w, block.gridY + w, zBase); // Left
                  const b2 = project(block.gridX + w, block.gridY + w, zBase); // Front
                  const b3 = project(block.gridX + w, block.gridY - w, zBase); // Right

                  // Top face corners (offset isometrically on screen vertically by height)
                  const t0 = { x: b0.x, y: b0.y - currentHeight };
                  const t1 = { x: b1.x, y: b1.y - currentHeight };
                  const t2 = { x: b2.x, y: b2.y - currentHeight };
                  const t3 = { x: b3.x, y: b3.y - currentHeight };

                  const isHero = block.isHero;
                  const topColor = isHero
                    ? "url(#hero-top-grad)"
                    : block.topColor;
                  const leftColor = block.leftColor;
                  const rightColor = block.rightColor;
                  const strokeColor = isHero
                    ? "rgba(180,160,240,0.60)"
                    : "rgba(160,140,210,0.18)";

                  // Top face center for rotating labels cleanly
                  const tcX = (t0.x + t1.x + t2.x + t3.x) / 4;
                  const tcY = (t0.y + t1.y + t2.y + t3.y) / 4;

                  // Left-Front vertical face center coordinate calculation
                  const lfcX = (b1.x + b2.x) / 2;
                  const lfcY = (b1.y + b2.y) / 2 - currentHeight / 2;

                  return (
                    <g
                      key={block.id}
                      className="iso-block cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHoveredBlockId(block.id)}
                      onMouseLeave={() => setHoveredBlockId(null)}
                    >
                      {/* Pulsing bottom glow under the Hero Trading Terminal block */}
                      {isHero && revealedScale > 0.5 && (
                        <ellipse
                          cx={b2.x - 30}
                          cy={b2.y - 20}
                          rx="80"
                          ry="40"
                          fill="#6B5E9A"
                          opacity="0.30"
                          filter="url(#glow-filter)"
                          style={{
                            animation: "heroGlowPulse 3s ease-in-out infinite",
                          }}
                        />
                      )}

                      {/* Left Side Face */}
                      <polygon
                        points={`${b1.x},${b1.y} ${b2.x},${b2.y} ${t2.x},${t2.y} ${t1.x},${t1.y}`}
                        fill={leftColor}
                        stroke={strokeColor}
                        strokeWidth="0.75"
                      />

                      {/* Right Side Face */}
                      <polygon
                        points={`${b2.x},${b2.y} ${b3.x},${b3.y} ${t3.x},${t3.y} ${t2.x},${t2.y}`}
                        fill={rightColor}
                        stroke={strokeColor}
                        strokeWidth="0.75"
                      />

                      {/* Top Face */}
                      <polygon
                        points={`${t0.x},${t0.y} ${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y}`}
                        fill={topColor}
                        stroke={strokeColor}
                        strokeWidth="1.2"
                      />

                      {/* Top Face Glow Overlay */}
                      <polygon
                        points={`${t0.x},${t0.y} ${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y}`}
                        fill="#C084FC"
                        filter="url(#white-glow)"
                        className="transition-opacity duration-500 ease-out pointer-events-none"
                        style={{
                          opacity: effectiveHoveredBlockId === block.id ? 0.8 : 0,
                        }}
                      />

                      {/* Mathematical Isometric Label flat on the left-front face */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`translate(${lfcX}, ${lfcY}) rotate(-90) skewX(-30)`}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: isHero || block.id === 7 ? 600 : 400,
                          fontSize: isHero || block.id === 7 ? "9px" : "8px",
                          fill:
                            effectiveHoveredBlockId === block.id
                              ? "#C084FC"
                              : isHero
                                ? "#E5D9C4"
                                : "#6b7280",
                          fillOpacity:
                            isHero || block.id === 7 || effectiveHoveredBlockId === block.id
                              ? 1.0
                              : 0.4,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          pointerEvents: "none",
                          transition: "fill 0.3s ease, fill-opacity 0.3s ease",
                        }}
                      >
                        {block.label}
                      </text>
                    </g>
                  );
                })}

                {/* ================= DESKTOP CONNECTOR ARROWS & PIPELINES ================= */}
                {!isMobile &&
                  (() => {
                    const target1 = {
                      x: (slabS2.left.x + slabS2.front.x) / 2,
                      y: (slabS2.left.y + slabS2.front.y) / 2 + thickness2 / 2,
                    };
                    const target2 = getBlockTopCenter(3); // Trading Terminal
                    const targetNexus = getBlockTopCenter(7); // NEXUS
                    const target3 = {
                      x: (slabS1.left.x + slabS1.front.x) / 2,
                      y: (slabS1.left.y + slabS1.front.y) / 2 + thickness1 / 2,
                    };

                    return (
                      <g
                        className="transition-opacity duration-1000"
                        style={{ opacity: showStage1 ? 1 : 0 }}
                      >
                        {/* Callout 1 Connector: Pointing to MEV Shield (Z=2) */}
                        <path
                          d={`M-320,-150 L-200,-150 L${target1.x},${target1.y}`}
                          fill="none"
                          stroke="rgba(160,140,200,0.4)"
                          strokeWidth="1.25"
                          strokeDasharray="4,4"
                          style={{
                            opacity: callout1Opacity,
                            transition: "opacity 0.8s ease-out",
                          }}
                        />
                        <circle
                          cx={target1.x}
                          cy={target1.y}
                          r="4"
                          fill="#EDEAE2"
                          stroke="#4A4170"
                          strokeWidth="1.5"
                          style={{
                            opacity: callout1Opacity,
                            transition: "opacity 0.6s 0.2s ease-out",
                          }}
                        />

                        {/* Callout 2 Connector: Pointing to Trading Terminal */}
                        <path
                          d={`M320,110 L200,110 L${target2.x},${target2.y}`}
                          fill="none"
                          stroke="rgba(160,140,200,0.4)"
                          strokeWidth="1.25"
                          strokeDasharray="4,4"
                          style={{
                            opacity: callout2Opacity,
                            transition: "opacity 0.8s ease-out",
                          }}
                        />
                        <circle
                          cx={target2.x}
                          cy={target2.y}
                          r="4"
                          fill="#EDEAE2"
                          stroke="#5A4E8A"
                          strokeWidth="1.5"
                          style={{
                            opacity: callout2Opacity,
                            transition: "opacity 0.6s 0.2s ease-out",
                          }}
                        />

                        {/* Callout 4 Connector: Pointing to NEXUS Block */}
                        <path
                          d={`M320,-150 L200,-150 L${targetNexus.x},${targetNexus.y}`}
                          fill="none"
                          stroke="rgba(160,140,200,0.4)"
                          strokeWidth="1.25"
                          strokeDasharray="4,4"
                          style={{
                            opacity: callout4Opacity,
                            transition: "opacity 0.8s ease-out",
                          }}
                        />
                        <circle
                          cx={targetNexus.x}
                          cy={targetNexus.y}
                          r="4"
                          fill="#EDEAE2"
                          stroke="#C084FC"
                          strokeWidth="1.5"
                          style={{
                            opacity: callout4Opacity,
                            transition: "opacity 0.6s 0.2s ease-out",
                          }}
                        />

                        {/* Callout 3 Connector: Pointing to Solana base center */}
                        <path
                          d={`M-320,110 L-200,110 L${target3.x},${target3.y}`}
                          fill="none"
                          stroke="rgba(160,140,200,0.4)"
                          strokeWidth="1.25"
                          strokeDasharray="4,4"
                          style={{
                            opacity: callout3Opacity,
                            transition: "opacity 0.8s ease-out",
                          }}
                        />
                        <circle
                          cx={target3.x}
                          cy={target3.y}
                          r="4"
                          fill="#EDEAE2"
                          stroke="#4A4170"
                          strokeWidth="1.5"
                          style={{
                            opacity: callout3Opacity,
                            transition: "opacity 0.6s 0.2s ease-out",
                          }}
                        />
                      </g>
                    );
                  })()}
              </g>
            </svg>
          </div>
        </div>

        {/* ================= MOBILE SWIPEABLE CAROUSEL ================= */}
        {isMobile && (
          <div className="w-full flex flex-col items-center px-6 -mt-[78px] md:mt-12 max-w-[480px] z-20">
            <div className="flex justify-center items-center gap-2.5 mb-6 w-full">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setMobileSlideIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    mobileSlideIndex === index ? "w-6 bg-[#C084FC]" : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="relative w-full h-[200px] overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileSlideIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -40) {
                      setMobileSlideIndex((prev) => (prev + 1) % 4);
                    } else if (offset.x > 40) {
                      setMobileSlideIndex((prev) => (prev === 0 ? 3 : prev - 1));
                    }
                  }}
                >
                  <h3 className={`font-medium text-lg sm:text-xl tracking-wide mt-2 ${
                    mobileSlideIndex === 2 ? "text-[#E3D4B6]" : mobileSlideIndex === 3 ? "text-[#E5D9C4]" : "text-white"
                  }`}>
                    {mobileSlideIndex === 0 && t.block2_title}
                    {mobileSlideIndex === 1 && t.block1_title}
                    {mobileSlideIndex === 2 && t.nexus_title}
                    {mobileSlideIndex === 3 && t.block3_title}
                  </h3>
                  <p className="text-stone-400 font-light text-xs sm:text-sm mt-3 leading-relaxed pb-8">
                    {mobileSlideIndex === 0 && t.block2_desc}
                    {mobileSlideIndex === 1 && t.block1_desc}
                    {mobileSlideIndex === 2 && t.nexus_desc}
                    {mobileSlideIndex === 3 && t.block3_desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
