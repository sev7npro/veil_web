import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface FAQProps {
  lang?: "EN" | "RU";
}

export default function FAQ({ lang: propLang }: FAQProps = {}) {
  const { lang: contextLang, t } = useLanguage();
  const content = t.faq;

  const [openSections, setOpenSections] = React.useState<{
    [key: string]: boolean;
  }>({
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

        {/* Flat Accordion Rows Categorized */}
        <div className="flex flex-col">
          {content.groups.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: groupIdx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-16 last:mb-0"
            >
              {/* Group Title Separator */}
              <div className="border-b border-[#E5D9C4]/30 pb-4 mb-4">
                <h2 className="font-sans text-xs md:text-sm tracking-[0.2em] font-medium text-[#E5D9C4] uppercase">
                  {group.title}
                </h2>
              </div>

              {/* Group Items */}
              <div className="flex flex-col">
                {group.items.map((section, idx) => {
                  const isOpen = !!openSections[section.num];
                  return (
                    <div
                      key={idx}
                      className="border-b border-[#121212] py-8 md:py-10 last:border-b-0"
                    >
                      {/* Header block */}
                      <div
                        onClick={() => toggleSection(section.num)}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-[#E5D9C4] font-mono text-xs tracking-[0.25em] font-light">
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
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center pointer-events-none shrink-0 ml-4 animate-duration-300"
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
                            transition={{
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pl-0 sm:pl-12 pt-6 flex flex-col gap-6 sm:gap-8">
                              {section.desc && (
                                <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                                  {section.desc}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
