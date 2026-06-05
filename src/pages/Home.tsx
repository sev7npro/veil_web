import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import VeilLines from "../components/VeilLines";
import VeilLinesLogo from "../components/VeilLinesLogo";
import AdvantagesSection from "../components/AdvantagesSection";
import VeilStackSection from "../components/VeilStackSection";
import VeilStatsSection from "../components/VeilStatsSection";
import PrivacyFirstSection from "../components/PrivacyFirstSection";
import VeilManifesto from "../components/VeilManifesto";

interface HomeProps {
  isPreloaded: boolean;
}

export default function Home({ isPreloaded }: HomeProps) {
  const { lang } = useLanguage();
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

      // When the user starts scrolling down from the top region of the page, smoothly snap down to Module 2
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

  // Stagger configurations for VEIL letters with luxury cinematic motion profiles
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

  // Tagline configuration: fades in with an exquisite slow focus pull
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

  // CTA button configuration: graceful luxury slide-up with blur focus resolve
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

  // Direct precise translations for dynamic visual transition
  const t = {
    EN: {
      tagline: "EXECUTE SILENTLY. ROUTE INTELLIGENTLY.",
      launch: "LAUNCH APP",
      docs: "DOCUMENTATION",
    },
    RU: {
      tagline: "БЕСШУМНОЕ ИСПОЛНЕНИЕ. ИНТЕЛЛЕКТУАЛЬНАЯ МАРШРУТИЗАЦИЯ.",
      launch: "ЗАПУСТИТЬ ПРИЛОЖЕНИЕ",
      docs: "ДОКУМЕНТАЦИЯ",
    },
  }[lang];

  return (
    <>
      {/* Hero View Container with smooth slow scale/opacity focus pull */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isPreloaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden shrink-0 bg-[#050505]"
      >
        {/* Background radial haze gradient - beautiful dark emerald and indigo liquid glow at center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isPreloaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(16, 185, 129, 0.09) 0%, rgba(59, 130, 246, 0.04) 50%, rgba(5, 5, 5, 0) 100%)",
          }}
        />

        {/* SVG silk line visualization directly behind the wordmark with slow-fade entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isPreloaded ? { opacity: 0.65, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 4.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <VeilLines />
        </motion.div>

        {/* Content Vertical Stack with flawless padding for mobile */}
        <div
          className="relative flex flex-col items-center justify-center text-center z-10 px-6 max-w-4xl pt-16 sm:pt-0"
          id="veil-content-wrapper"
        >
          {/* Premium minimal vertical lines curtain logo - cleanly positioned without negative overlaps on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={isPreloaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
            transition={{
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mb-8 md:mb-12 text-center opacity-95 flex items-center justify-center"
            id="veil-hero-logo-wrapper"
          >
            <VeilLinesLogo
              className="w-full h-full"
              lineColor="#EDEAE2"
              bgMode="transparent"
              strokeWidth={11}
            />
          </motion.div>

          {/* VEIL Wordmark with elegant staggers */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isPreloaded ? "visible" : "hidden"}
            className="flex justify-center items-center font-serif text-[#EDEAE2] font-extralight"
            style={{
              fontSize: "clamp(54px, 15vw, 180px)",
              letterSpacing: isMobile ? "0.22em" : "0.45em",
              marginRight: isMobile ? "-0.22em" : "-0.45em",
              lineHeight: "1.0",
              marginTop: isMobile ? "-10px" : "-80px",
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

          {/* Tagline */}
          <motion.p
            variants={taglineVariants}
            initial="hidden"
            animate={isPreloaded ? "visible" : "hidden"}
            className="mt-6 sm:mt-8 font-sans font-light text-[#6B6760] text-center uppercase px-4"
            style={{
              fontSize: "clamp(9px, 1.1vw, 12px)",
              letterSpacing: "0.25em",
              lineHeight: "1.6",
            }}
            id="veil-tagline"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {t.tagline}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          {/* Action Buttons arranged side-by-side on mobile to match the premium Hyperliquid layout */}
          <motion.div
            variants={buttonsVariants}
            initial="hidden"
            animate={isPreloaded ? "visible" : "hidden"}
            className="mt-10 grid grid-cols-2 gap-3 w-full max-w-[340px] px-2 md:flex md:flex-row md:justify-center md:items-center md:gap-4 md:max-w-none md:px-0"
            id="veil-cta-actions"
          >
            {/* Action 1: Launch App (Inert styled cursor feedback) */}
            <button
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
                  {isMobile ? (lang === "RU" ? "ЗАПУСТИТЬ" : "LAUNCH") : t.launch}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Action 2: System Documentation */}
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
                  {isMobile ? (lang === "RU" ? "ДОКИ" : "DOCS") : t.docs}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Module 2: High-Fidelity Private Terminal Mockup section on scroll */}
      <AdvantagesSection lang={lang} />

      {/* Module 3: The VEIL Stack Isometric Architecture Section */}
      <VeilStackSection lang={lang} />

      {/* Dynamic Quiet Luxury Stats Block */}
      <VeilStatsSection lang={lang} />

      {/* Module 3.5: Quiet Luxury Metrics Visual Bridge */}
      <VeilLines lang={lang} />

      {/* Module 4: Privacy First Interactive Contour Flow Section */}
      <PrivacyFirstSection lang={lang} />

      {/* Module 5: CTA Manifesto Section */}
      <VeilManifesto lang={lang} />
    </>
  );
}
