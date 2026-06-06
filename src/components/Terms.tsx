import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface TermsProps {
  lang?: "EN" | "RU";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS",
  ) => void;
}

export default function Terms({ lang: propLang, onNavigate }: TermsProps) {
  const { lang: contextLang, t } = useLanguage();
  const lang = propLang || contextLang;
  const navigate = useNavigate();
  const content = t.terms;

  const [openSections, setOpenSections] = React.useState<{
    [key: string]: boolean;
  }>({
    "1.0": true,
  });

  const toggleSection = (num: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-4 text-[#FFFFFF]">
            {content.hero}
          </h1>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E5D9C4]">
            {content.subhero}
          </p>
          <div className="mt-8 w-px h-16 bg-[#121212] mx-auto" />
        </motion.div>

        {/* Flat Accordion Rows */}
        <div className="flex flex-col border-t border-[#121212]">
          {content.sections.map((section, idx) => {
            const isOpen = !!openSections[section.num];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-[#121212] py-8 md:py-10"
              >
                {/* Header block */}
                <div
                  onClick={() => toggleSection(section.num)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[#E5D9C4] font-mono text-xs tracking-[0.25em] font-light min-w-[2.5rem]">
                      {section.num}
                    </span>
                    <h3 className="font-sans text-white text-lg sm:text-xl font-light tracking-[0.08em] transition-colors group-hover:text-[#E5D9C4]">
                      {section.title}
                    </h3>
                  </div>

                  {/* Plus -> Cross Indicator */}
                  <motion.div
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      color: isOpen ? "#E5D9C4" : "#FFFFFF",
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center pointer-events-none"
                  >
                    <div className="absolute w-full h-[1px] bg-current" />
                    <div className="absolute h-full w-[1px] bg-current" />
                  </motion.div>
                </div>

                {/* Expanded Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-0 sm:pl-[4.5rem] pt-6 flex flex-col gap-6 sm:gap-8">
                        {/* Main Description */}
                        {section.desc && (
                          <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                            {section.desc}
                          </p>
                        )}

                        {/* Subsections */}
                        {section.subsections && (
                          <div className="flex flex-col gap-6 sm:gap-8 mt-2">
                            {section.subsections.map((sub, i) => (
                              <div key={i} className="flex flex-col gap-3">
                                <h4 className="font-sans text-stone-200 font-normal tracking-wide text-xs">
                                  {sub.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {sub.items.map((item, j) => (
                                    <li
                                      key={j}
                                      className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Row */}
        <div className="mt-20 pt-10 border-t border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => (onNavigate ? onNavigate("RISKS") : navigate("/risks"))}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#E5D9C4]" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] tracking-[0.2em] text-stone-600 uppercase font-mono">{lang === "EN" ? "PREVIOUS" : "НАЗАД"}</span>
              <span className="text-xs tracking-wider font-light text-stone-400 group-hover:text-[#E5D9C4] transition-colors">{lang === "EN" ? "Risk Disclosure" : "Раскрытие рисков"}</span>
            </div>
          </button>

          <button
            onClick={() => (onNavigate ? onNavigate("PRIVACY") : navigate("/privacy"))}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.2em] text-stone-600 uppercase font-mono">{lang === "EN" ? "NEXT" : "ДАЛЕЕ"}</span>
              <span className="text-xs tracking-wider font-light text-stone-400 group-hover:text-[#E5D9C4] transition-colors">{lang === "EN" ? "Privacy Policy" : "Политика конфиденциальности"}</span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#E5D9C4]" />
          </button>
        </div>
      </div>
    </div>
  );
}
