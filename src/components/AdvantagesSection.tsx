import React from "react";
import { motion } from "motion/react";
import TerminalMockup from "./TerminalMockup";
import { useLanguage } from "../contexts/LanguageContext";

interface AdvantagesSectionProps {
  lang?: "EN" | "RU";
}

export default function AdvantagesSection({
  lang: propLang,
}: AdvantagesSectionProps = {}) {
  const { lang: contextLang, t: translationsDict } = useLanguage();
  const lang = propLang || contextLang;
  const t = translationsDict.advantages;
  const isRu = lang === "RU";

  return (
    <section
      className="relative w-full bg-transparent select-none text-left z-20 pt-16 pb-0 md:py-[120px] overflow-hidden"
      id="advantages-module"
    >
      {/* Heavy bottom fade gradient to transition the continuous liquid neon bleed back to deep solid black */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] md:h-[400px] bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent pointer-events-none z-0" />

      {/* Dynamic atmospheric top glow bleeding from the Hero section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(circle_at_center,rgba(153,69,255,0.11)_0%,rgba(0,232,250,0.03)_50%,transparent_100%)] blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute top-[#20px] left-[15%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(0,232,250,0.06)_0%,transparent_100%)] blur-[100px] pointer-events-none select-none z-0" />
      <div className="absolute top-[#20px] right-[15%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.04)_0%,transparent_100%)] blur-[100px] pointer-events-none select-none z-0" />

      <div className="w-full flex flex-col justify-center items-center overflow-hidden relative z-10">
        {/* 1. Header Area with fade-in motion trigger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full text-center px-6 mb-8 md:mb-[64px]"
          id="advantages-header"
        >
          {lang === "RU" ? (
            <div className="flex flex-col items-center">
              <span className="font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3 block">
                Приватный терминал:
              </span>
              <h2 className="font-serif font-light text-[#EDEAE2] tracking-[0.01em] leading-[1.2] text-3xl sm:text-[38px] md:text-[46px] lg:text-[50px] max-w-2xl mx-auto">
                абсолютное{" "}
                <span className="text-[#EDEAE2] font-normal italic pr-1">
                  бесшумное исполнение
                </span>{" "}
                на дексах
              </h2>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3 block">
                The private terminal:
              </span>
              <h2 className="font-serif font-light text-[#EDEAE2] tracking-[0.01em] leading-[1.2] text-3xl sm:text-[38px] md:text-[46px] lg:text-[50px] max-w-2xl mx-auto">
                absolute{" "}
                <span className="text-[#EDEAE2] font-normal italic pr-1">
                  silent execution
                </span>{" "}
                exchange
              </h2>
            </div>
          )}
        </motion.div>

        {/* 2. Responsive advantages grid stack (Static and visible) */}
        <div
          className="grid w-full max-w-[1320px] px-6 lg:px-12 items-center grid-cols-1 md:grid-cols-[1fr_2.2fr_1fr] gap-0 md:gap-12"
          id="advantages-bento-grid"
        >
          {/* Left Column: Advantages 1 & 2 (Right-aligned text) */}
          <div className="flex flex-col gap-0 md:gap-12 text-center md:text-right order-2 md:order-1 items-center md:items-end w-full">
            <div className="w-full md:max-w-[300px] flex flex-col gap-0 md:gap-12 items-center md:items-end">
              {/* Advantage 1: Zero MEV */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-center md:items-end w-[calc(100%+3rem)] -mx-6 px-6 py-5 md:w-full md:mx-0 md:px-0 md:py-0 text-left md:text-right border-t border-b border-[#2A1B4E]/30 md:border-none bg-[#0D0719] md:bg-transparent -mt-[30px] md:mt-0 relative z-10 animate-fade-in"
              >
                {/* SVG Shield icon */}
                <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center shrink-0 bg-transparent text-[#9945FF] hover:text-[#B171FF] transition-colors duration-300">
                  {/* Concentric ripples around the icon for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
                    <div className="absolute w-[34px] h-[34px] rounded-full border border-[#9945FF]/20" />
                    <div className="absolute w-[44px] h-[44px] rounded-full border border-[#9945FF]/12" />
                    <div className="absolute w-[54px] h-[54px] rounded-full border border-[#9945FF]/8" />
                    <div className="absolute w-[64px] h-[64px] rounded-full border border-[#9945FF]/4" />
                  </div>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-[20px] h-[20px] md:w-full md:h-full relative z-10">
                    <path
                      d="M20 6L32 10V18C32 25 27 29.5 20 34C13 29.5 8 25 8 18V10L20 6Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#EDEAE2] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv1_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-stone-400 leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv1_desc}
                  </p>
                </div>
              </motion.div>

              {/* Advantage 2: Non-Custodial */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-center md:items-end w-[calc(100%+3rem)] -mx-6 px-6 py-5 md:w-full md:mx-0 md:px-0 md:py-0 text-left md:text-right border-b border-[#2A1B4E]/30 md:border-none bg-[#0D0719] md:bg-transparent"
              >
                {/* SVG Key-like / Lock icon */}
                <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center shrink-0 bg-transparent text-[#9945FF] hover:text-[#B171FF] transition-colors duration-300">
                  {/* Concentric ripples around the icon for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
                    <div className="absolute w-[34px] h-[34px] rounded-full border border-[#9945FF]/20" />
                    <div className="absolute w-[44px] h-[44px] rounded-full border border-[#9945FF]/12" />
                    <div className="absolute w-[54px] h-[54px] rounded-full border border-[#9945FF]/8" />
                    <div className="absolute w-[64px] h-[64px] rounded-full border border-[#9945FF]/4" />
                  </div>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-[20px] h-[20px] md:w-full md:h-full relative z-10">
                    <rect
                      x="11"
                      y="18"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 18V13C15 10.24 17.24 8 20 8C22.76 8 25 10.24 25 13V18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="24" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#EDEAE2] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv2_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-stone-400 leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv2_desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Center Column: Interactive Trading mock browser window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 flex justify-center w-full min-w-0 mt-0 mb-0 md:mt-0 md:mb-0 relative z-0"
          >
            <div className="w-full max-w-[155px] md:max-w-[310px]">
              <TerminalMockup lang={lang} />
            </div>
          </motion.div>

          {/* Right Column: Advantages 3 & 4 (Left-aligned text) */}
          <div className="flex flex-col gap-0 md:gap-12 text-center md:text-left order-3 items-center md:items-start w-full">
            <div className="w-full md:max-w-[300px] flex flex-col gap-0 md:gap-12 items-center md:items-start">
              {/* Advantage 3: Silent Routing */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-center md:items-start w-[calc(100%+3rem)] -mx-6 px-6 py-5 md:w-full md:mx-0 md:px-0 md:py-0 text-left border-t border-b border-[#2A1B4E]/30 md:border-none bg-[#0D0719] md:bg-transparent"
              >
                {/* SVG Flowing Path Lines */}
                <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center shrink-0 bg-transparent text-[#9945FF] hover:text-[#B171FF] transition-colors duration-300">
                  {/* Concentric ripples around the icon for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
                    <div className="absolute w-[34px] h-[34px] rounded-full border border-[#9945FF]/20" />
                    <div className="absolute w-[44px] h-[44px] rounded-full border border-[#9945FF]/12" />
                    <div className="absolute w-[54px] h-[54px] rounded-full border border-[#9945FF]/8" />
                    <div className="absolute w-[64px] h-[64px] rounded-full border border-[#9945FF]/4" />
                  </div>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-[20px] h-[20px] md:w-full md:h-full relative z-10">
                    <path
                      d="M10 32C10 26 14 20 20 20C26 20 30 14 30 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 24C10 20 12 16 16 16C22 16 24 10 30 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                    <circle cx="30" cy="8" r="1.5" fill="currentColor" />
                    <circle cx="10" cy="32" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#EDEAE2] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv3_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-stone-400 leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv3_desc}
                  </p>
                </div>
              </motion.div>

              {/* Advantage 4: Instant Execution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-center md:items-start w-[calc(100%+3rem)] -mx-6 px-6 py-5 md:w-full md:mx-0 md:px-0 md:py-0 text-left border-b border-[#2A1B4E]/30 md:border-none bg-[#0D0719] md:bg-transparent"
              >
                {/* SVG Lightning Bolt icon */}
                <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center shrink-0 bg-transparent text-[#9945FF] hover:text-[#B171FF] transition-colors duration-300">
                  {/* Concentric ripples around the icon for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
                    <div className="absolute w-[34px] h-[34px] rounded-full border border-[#9945FF]/20" />
                    <div className="absolute w-[44px] h-[44px] rounded-full border border-[#9945FF]/12" />
                    <div className="absolute w-[54px] h-[54px] rounded-full border border-[#9945FF]/8" />
                    <div className="absolute w-[64px] h-[64px] rounded-full border border-[#9945FF]/4" />
                  </div>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-[20px] h-[20px] md:w-full md:h-full relative z-10">
                    <path
                      d="M23 6L11 22H21L17 34L29 18H19L23 6Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#EDEAE2] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv4_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-stone-400 leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv4_desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
