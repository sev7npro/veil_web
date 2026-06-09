import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

interface DocumentationProps {
  lang?: "EN" | "RU";
}

export default function Documentation({ lang: propLang }: DocumentationProps = {}) {
  const { lang: contextLang, t: translationsDict } = useLanguage();
  const lang = propLang || contextLang;
  const content = translationsDict.documentation;

  const metadata = React.useMemo(() => {
    if (lang === "RU") {
      return {
        title: "Документация | VEIL — Модульная архитектура",
        description: "Подробный разбор безопасности VEIL: локальное шифрование AES-256-GCM, приватный обход мемпула через Jito и обфускация транзакций."
      };
    }
    return {
      title: "Documentation | VEIL — Modular Architecture",
      description: "Deep dive into VEIL's secure trade signing, local AES-256-GCM encryption, Jito private mempool bypass, and transaction obfuscation."
    };
  }, [lang]);

  useDocumentMetadata(metadata);

  // Track which sections are open (default to empty or open first section)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "01": true,
  });

  const toggleSection = (num: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] pt-32 pb-24 px-6 font-sans content-visibility-auto">
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
                    <h3 className="font-sans text-white text-lg sm:text-xl font-light tracking-[0.08em] uppercase transition-colors group-hover:text-[#E5D9C4]">
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
                      <div className="pl-0 sm:pl-[4.5rem] pt-6 flex flex-col gap-6">
                        {/* Main Description */}
                        {section.desc && (
                          <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                            {section.desc}
                          </p>
                        )}

                        {/* Flat Items List */}
                        {section.items && (
                          <ul className="flex flex-col gap-3">
                            {section.items.map((item, idy) => (
                              <li
                                key={idy}
                                className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed flex items-start gap-3"
                              >
                                <span className="text-stone-600 font-light select-none">—</span>
                                <span className="flex-1 whitespace-pre-wrap">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Nested Subsections */}
                        {section.subsections && (
                          <div className="flex flex-col gap-6 sm:gap-8 mt-2">
                            {section.subsections.map((sub, i) => (
                              <div key={i} className="flex flex-col gap-3">
                                <h4 className="font-sans text-stone-200 font-normal tracking-wide text-xs uppercase">
                                  {sub.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {sub.items.map((subItem, j) => (
                                    <li
                                      key={j}
                                      className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed flex items-start gap-3"
                                    >
                                      <span className="text-stone-600 font-light select-none">—</span>
                                      <span className="flex-1 whitespace-pre-wrap">{subItem}</span>
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
      </div>
    </div>
  );
}
