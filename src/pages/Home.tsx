import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import VeilLinesLogo from "../components/VeilLinesLogo";
import AdvantagesSection from "../components/AdvantagesSection";
import VeilStackSection from "../components/VeilStackSection";
import VeilStatsSection from "../components/VeilStatsSection";
import PrivacyFirstSection from "../components/PrivacyFirstSection";
import VeilManifesto from "../components/VeilManifesto";
import VeilBlockchainRoutes from "../components/VeilBlockchainRoutes";

const PROT_ITEMS = [
  {
    id: "solana",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        solana
      </span>
    ),
    icon: (
      <svg className="w-[18px] h-[15px] sm:w-[25px] sm:h-[20px] md:w-[32px] md:h-[26px] lg:w-[40px] lg:h-[32px] xl:w-[46px] xl:h-[37px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.8764 18.0313l-3.962 4.1393a.9201.9201 0 01-.306.2106.9407.9407 0 01-.367.0742H.4599a.4689.4689 0 01-.2522-.0733.4513.4513 0 01-.1696-.1962.4375.4375 0 01-.0314-.2545.4438.4438 0 01.117-.2298l3.9649-4.1393a.92.92 0 01.3052-.2102.9407.9407 0 01.3658-.0746H23.54a.4692.4692 0 01.2523.0734.4531.4531 0 01.1697.196.438.438 0 01.0313.2547.4442.4442 0 01-.1169.2297zm-3.962-8.3355a.9202.9202 0 00-.306-.2106.941.941 0 00-.367-.0742H.4599a.4687.4687 0 00-.2522.0734.4513.4513 0 00-.1696.1961.4376.4376 0 00-.0314.2546.444.444 0 00.117.2297l3.9649 4.1394a.9204.9204 0 00.3052.2102c.1154.049.24.0744.3658.0746H23.54a.469.469 0 00.2523-.0734.453.453 0 00.1697-.1961.4382.4382 0 00.0313-.2546.4444.4444 0 00-.1169-.2297zM.46 6.7225h18.7815a.9411.9411 0 00.367-.0742.9202.9202 0 00.306-.2106l3.962-4.1394a.4442.4442 0 00.117-.2297.4378.4378 0 00-.0314-.2546.453.453 0 00-.1697-.196.469.469 0 00-.2523-.0734H4.7596a.941.941 0 00-.3658.0745.9203.9203 0 00-.3052.2102L.1246 5.9687a.4438.4438 0 00-.1169.2295.4375.4375 0 00.0312.2544.4512.4512 0 00.1692.196.4689.4689 0 00.2518.0739z" />
      </svg>
    )
  },
  {
    id: "jup",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        jupiter
      </span>
    ),
    icon: (
      <svg className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[46px] xl:h-[46px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 80 800 640" fill="currentColor">
        <path d="M536,568.9c-66.8-108.5-166.4-170-289.4-195.6c-43.5-9-87.2-8.9-129.4,7.7c-28.9,11.4-33.3,23.4-19.7,53.7 c92.4-21.9,178.4-1.5,258.9,45c81.1,46.9,141.6,112.2,169.1,205c38.6-11.8,43.6-18.3,34.3-54.2C554.3,609.4,547.4,587.4,536,568.9 L536,568.9z" />
        <path d="M609.1,480.6c-85.8-125-207.3-194.9-355.8-218.3c-39.3-6.2-79.4-4.5-116.2,14.3c-17.6,9-33.2,20.5-37.4,44.9 c115.8-31.9,219.7-3.7,317.5,53c98.3,57,175.1,133.5,205,251.1c20.8-18.4,24.5-41,19.1-62C633.9,534.8,625.5,504.5,609.1,480.6 L609.1,480.6z" />
        <path d="M105,488.6c7.3,16.2,12.1,34.5,23,47.6c5.5,6.7,22.2,4.1,33.8,5.7c1.8,0.2,3.6,0.5,5.4,0.7 c102.9,15.3,184.1,65.1,242.1,152c3.4,5.1,8.9,12.7,13.4,12.7c17.4-0.1,34.9-2.8,52.5-4.5C449,557.5,232.8,438.3,105,488.6 L105,488.6z" />
        <path d="M656.6,366.7C599.9,287.4,521.7,234.6,432.9,197c-61.5-26.1-125.2-41.8-192.8-33.7 c-23.4,2.8-45.3,9.5-63.4,24.7c230.9,5.8,404.6,105.8,524,303.3c0.2-13.1,2.2-27.7-2.6-39.5C686.1,422.5,674.7,392,656.6,366.7z" />
        <path d="M709.8,325.3c-47-178.9-238-265-379.2-221.4C482.7,133.9,607.5,206.4,709.8,325.3z" />
        <path d="M155.4,583.9c54.6,69.3,124,109.7,213,122.8C334.4,643.2,214.6,574.5,155.4,583.9L155.4,583.9z" />
      </svg>
    )
  },
  {
    id: "jito",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        jito
      </span>
    ),
    icon: (
      <svg className="w-[14px] h-[17px] sm:w-[20px] sm:h-[24px] md:w-[26px] md:h-[31px] lg:w-[32px] lg:h-[38px] xl:w-[38px] xl:h-[45px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5,21.5 C2.5,14 7,9 13,9 C13.5,9 14,9.2 14,9.8 C14,15.5 10,21.5 2.5,21.5 Z" />
        <path d="M7.5,21.5 C7.5,16 11,12 16.5,12 C17,12 17.5,12.2 17.5,12.8 C17.5,17.5 14,21.5 7.5,21.5 Z" opacity="0.8" />
        <path d="M12.5,21.5 C12.5,18 15,15 19.5,15 C20,15 20.5,15.2 20.5,15.8 C20.5,19 18,21.5 12.5,21.5 Z" opacity="0.6" />
      </svg>
    )
  },
  {
    id: "arcium",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        arcium
      </span>
    ),
    icon: (
      <svg className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[46px] xl:h-[46px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3 L3 21 M12 3 L21 21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11 L7 21 M12 11 L17 21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    )
  },
  {
    id: "argon2id",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        argon2id
      </span>
    ),
    icon: (
      <svg className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[28px] md:h-[28px] lg:w-[36px] lg:h-[36px] xl:w-[42px] xl:h-[42px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="none">
        <path
          d="M12,1 L3,5 L3,13 C3,18.5 7,22.5 12,23.8 C17,22.5 21,18.5 21,13 L21,5 L12,1 Z M12,3.2 L19,6.3 L19,13 C19,17.2 16,20.4 12,21.6 C8,20.4 5,17.2 5,13 L5,6.3 L12,3.2 Z"
          fill="currentColor"
        />
        <path
          d="M12,7 C9.8,7 8,8.8 8,11 C8,12.5 8.8,13.8 10,14.5 L10,18 C10,19.1 10.9,20 12,20 C13.1,20 14,19.1 14,18 L14,14.5 C15.2,13.8 16,12.5 16,11 C16,8.8 14.2,7 12,7 Z"
          fill="currentColor"
          opacity="0.85"
         />
      </svg>
    )
  }
];

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
  const { t: translationsDict } = useLanguage();
  const t = translationsDict.home;

  return (
    <div className="relative w-full bg-[#050505] overflow-x-hidden">
      {/* Background radial haze gradient - removed */}

      {/* Procedural liquid neon interactive atmosphere disabled as requested */}


      {/* Hero View Container with smooth slow scale/opacity focus pull */}
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
                      <span>{lang === "RU" ? "БЕСШУМНОЕ ИСПОЛНЕНИЕ." : "QUIET EXECUTION."}</span>
                      <span>{lang === "RU" ? "ИНТЕЛЛЕКТУАЛЬНАЯ МАРШРУТИЗАЦИЯ." : "INTELLIGENT ROUTING."}</span>
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
              {/* Action 1: Launch App (Inert styled cursor feedback) */}
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

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isPreloaded ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 1.0, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-24 w-[85%] max-w-[340px] sm:w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-0 sm:px-4 flex flex-col items-center select-none"
              id="integrated-systems"
            >
              <div 
                className="w-full overflow-hidden relative py-2 select-none marquee-fade-mask"
              >
                {/* Hardware-accelerated sliding ticker row */}
                <div className="flex animate-marquee">
                  {/* First complete pass of brand items */}
                  {PROT_ITEMS.map((item) => (
                    <div key={`p1-${item.id}`} className="flex items-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 group hover:scale-[1.03] duration-300 transition-all select-none col-span-1">
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                  {/* Identical repeat pass for a 100% seamless transition joint */}
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

      {/* Module 2: High-Fidelity Private Terminal Mockup section on scroll */}
      <AdvantagesSection lang={lang} />

      {/* Module 3: The VEIL Stack Isometric Architecture Section */}
      <VeilStackSection lang={lang} />

      {/* Dynamic Quiet Luxury Stats Block */}
      <VeilStatsSection lang={lang} />

      {/* Module 4: Privacy First Interactive Contour Flow Section */}
      <PrivacyFirstSection lang={lang} />

      {/* Module 5: CTA Manifesto Section */}
      <VeilManifesto lang={lang} />
    </div>
  );
}
