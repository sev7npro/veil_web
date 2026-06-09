import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import VeilLinesLogo from "./VeilLinesLogo";
import VeilBlockchainRoutes from "./VeilBlockchainRoutes";
import { PROT_ITEMS } from "../data/protocols";

interface HeroSectionProps {
  isPreloaded: boolean;
}

export default function HeroSection({ isPreloaded }: HeroSectionProps) {
  const { lang, t: translationsDict } = useLanguage();
  const t = translationsDict.home;
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Premium smooth auto-scroll alignment from Module 1 (Hero) to Module 2 (Terminal)
  React.useEffect(() => {
    let isSnapping = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const heroHeight = window.innerHeight;

      if (
        !isSnapping &&
        currentScroll > 10 &&
        currentScroll < heroHeight * 0.45 &&
        currentScroll > lastScrollY
      ) {
        const targetElement = document.getElementById("advantages-module");
        if (targetElement) {
          isSnapping = true;
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isSnapping = false;
          }, 1200);
        }
      }
      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letters = ["V", "E", "I", "L"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.16,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 1.02,
      filter: "blur(15px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 2.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const taglineVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(6px)",
      letterSpacing: "0.20em",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      letterSpacing: "0.25em",
      transition: {
        delay: 1.0,
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const buttonsVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 1.4,
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isPreloaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden shrink-0 bg-transparent"
    >
      {/* Mobile translation container to lift both routes (cables) and content by 50px as requested */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center -translate-y-[50px] md:translate-y-0">
        {/* Ambient background cryptographic cyber routes animation with interactive 3D sway */}
        <VeilBlockchainRoutes isPreloaded={isPreloaded} />

        {/* Content Vertical Stack with flawless padding for mobile */}
        <div
          className="relative flex flex-col items-center justify-center text-center z-10 px-6 max-w-4xl pt-24 sm:pt-0 translate-y-[20px] sm:translate-y-0"
          id="veil-content-wrapper"
        >
          {/* Premium minimal vertical lines curtain logo - cleanly positioned without negative overlaps on mobile */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? -65 : 15, scale: 0.95 }}
            animate={isPreloaded ? { opacity: 1, y: isMobile ? -80 : 0, scale: 1 } : { opacity: 0, y: isMobile ? -65 : 15, scale: 0.95 }}
            transition={{
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mb-8 md:mb-12 text-center opacity-95 flex items-center justify-center translate-y-[20px] sm:translate-y-0"
            id="veil-hero-logo-wrapper"
          >
            <VeilLinesLogo
              className="w-full h-full"
              lineColor="#FFFFFF"
              bgMode="transparent"
              strokeWidth={6}
            />
          </motion.div>

          {/* Wrapper to shift wordmark and everything below on mobile */}
          <div className="translate-y-[15px] sm:translate-y-0 w-full flex flex-col items-center">
            {/* VEIL Wordmark with elegant staggers */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isPreloaded ? "visible" : "hidden"}
              className="flex justify-center items-center font-serif text-[#EDEAE2] font-extralight -translate-y-[35px] sm:translate-y-0"
              style={{
                fontSize: "clamp(54px, 15vw, 180px)",
                gap: isMobile ? "0.22em" : "0.45em",
                lineHeight: "1.0",
                marginTop: isMobile ? "10px" : "-80px",
              }}
              id="veil-wordmark-container"
            >
              {letters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline: split and stacked on mobile, single elegant line on desktop */}
            <motion.div
              variants={taglineVariants}
              initial="hidden"
              animate={isPreloaded ? "visible" : "hidden"}
              className="mt-8 sm:mt-8 w-full flex flex-col items-center justify-center px-4"
              id="veil-tagline"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center select-none"
                >
                  {isMobile ? (
                    <div className="flex flex-col items-center gap-1.5 text-center font-sans font-light tracking-[0.20em] uppercase text-white/70 text-[10px] min-[375px]:text-[11px] leading-relaxed">
                      <span>{t.taglineLine1}</span>
                      <span>{t.taglineLine2}</span>
                    </div>
                  ) : (
                    <span
                      className="font-sans font-light text-white text-center uppercase"
                      style={{
                        fontSize: "clamp(9px, 1.1vw, 12px)",
                        letterSpacing: "0.25em",
                        lineHeight: "1.6",
                      }}
                    >
                      {t.tagline}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons arranged side-by-side on mobile to match the premium Hyperliquid layout */}
            <motion.div
              variants={buttonsVariants}
              initial="hidden"
              animate={isPreloaded ? "visible" : "hidden"}
              className="mt-14 sm:mt-10 grid grid-cols-2 gap-3 w-full max-w-[340px] px-2 md:flex md:flex-row md:justify-center md:items-center md:gap-4 md:max-w-none md:px-0"
              id="veil-cta-actions"
            >
              <button
                onClick={() => window.open("https://t.me/veilstels_bot", "_blank")}
                className="group relative flex items-center justify-center h-[44px] rounded-full bg-[#EAE2D0] hover:bg-[#F5F0E8] text-[#0A0A0C] font-sans text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-[0_4px_24px_rgba(234,226,208,0.055)] cursor-pointer text-center whitespace-nowrap overflow-hidden"
                id="btn-launch-app"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-1"
                  >
                    {isMobile ? t.launchShort : t.launch}
                  </motion.span>
                </AnimatePresence>
              </button>

              <button
                onClick={() => navigate("/docs")}
                className="flex items-center justify-center h-[44px] rounded-full bg-transparent border border-[#EDEAE2]/28 hover:border-[#EDEAE2]/55 hover:bg-[#EDEAE2]/4 text-[#EDEAE2]/75 hover:text-[#EDEAE2] font-sans text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer text-center whitespace-nowrap overflow-hidden"
                id="btn-readme-docs"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-1"
                  >
                    {isMobile ? t.docsShort : t.docs}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isPreloaded ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 1.0, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-24 w-[85%] max-w-[340px] sm:w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-0 sm:px-4 flex flex-col items-center select-none"
              id="integrated-systems"
            >
              <div className="w-full overflow-hidden relative py-2 select-none marquee-fade-mask">
                <div className="flex animate-marquee">
                  {PROT_ITEMS.map((item) => (
                    <div key={`p1-${item.id}`} className="flex items-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 group hover:scale-[1.03] duration-300 transition-all select-none col-span-1">
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                  {PROT_ITEMS.map((item) => (
                    <div key={`p2-${item.id}`} className="flex items-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 group hover:scale-[1.03] duration-300 transition-all select-none col-span-1">
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
