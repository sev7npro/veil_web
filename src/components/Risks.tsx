import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface RisksProps {
  lang?: "EN" | "RU";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS",
  ) => void;
}

const risksContent = {
  EN: {
    hero: "RISK DISCLOSURE",
    subhero: "VEIL",
    sections: [
      {
        num: "1.0",
        title: "MARKET VOLATILITY",
        desc: "Digital assets can go to zero. Fast. Past performance means nothing.\n\nYou already know this — but it needs to be written here.",
      },
      {
        num: "2.0",
        title: "NETWORK RISKS",
        subsections: [
          {
            title: "2.1.",
            items: [
              "Solana — the protocol depends on network stability. Delays, forks, or L1 failures can make transaction execution temporarily impossible.",
            ],
          },
          {
            title: "2.2.",
            items: [
              "Helius, Jito, Jupiter — external infrastructure. Failures on their side can temporarily restrict access to market data and execution.",
            ],
          },
        ],
      },
      {
        num: "3.0",
        title: "SMART CONTRACT RISKS",
        desc: "During swaps, funds interact with third-party liquidity pools — Raydium, Orca, and others.\n\nVEIL is not responsible for bugs, exploits, or hacks of these protocols. Verify what you are signing.",
      },
      {
        num: "4.0",
        title: "LOSS OF ACCESS",
        subsections: [
          {
            title: "4.1.",
            items: [
              "Loss of PIN — irreversible loss of access to funds. No backdoor. No recovery. No support that will fix it. Write down your PIN. Store it offline.",
            ],
          },
          {
            title: "4.2.",
            items: [
              "You are responsible for the security of your device and Telegram account. Compromised device — compromised assets.",
            ],
          },
        ],
      },
      {
        num: "5.0",
        title: "EXPERIMENTAL TECHNOLOGIES",
        desc: "Veil Flow and integration Arcium TEE — early-stage technologies.\n\nUsage implies accepting the risks that accompany any frontier protocol. Do not invest what you are not prepared to lose.",
      },
    ],
  },
  RU: {
    hero: "РАСКРЫТИЕ РИСКОВ",
    subhero: "VEIL",
    sections: [
      {
        num: "1.0",
        title: "РЫНОЧНАЯ ВОЛАТИЛЬНОСТЬ",
        desc: "Цифровые активы могут уйти в ноль. Быстро. Прошлые результаты ничего не значат.\n\nТы уже это знаешь — но это должно быть написано здесь.",
      },
      {
        num: "2.0",
        title: "СЕТЕВЫЕ РИСКИ",
        subsections: [
          {
            title: "2.1.",
            items: [
              "Solana — протокол зависит от стабильности сети. Задержки, форки или сбои L1 могут сделать исполнение транзакций временно невозможным.",
            ],
          },
          {
            title: "2.2.",
            items: [
              "Helius, Jito, Jupiter — внешняя инфраструктура. Сбои на их стороне могут временно ограничить доступ к рыночным данным и исполнению.",
            ],
          },
        ],
      },
      {
        num: "3.0",
        title: "РИСКИ СМАРТ-КОНТРАКТОВ",
        desc: "При свопах средства взаимодействуют со сторонними пулами ликвидности — Raydium, Orca и другими.\n\nVEIL не несёт ответственности за баги, эксплойты или взломы этих протоколов. Проверяй что подписываешь.",
      },
      {
        num: "4.0",
        title: "ПОТЕРЯ ДОСТУПА",
        subsections: [
          {
            title: "4.1.",
            items: [
              "Потеря PIN — необратимая потеря доступа к средствам. Никакого бэкдора. Никакого восстановления. Никакой поддержки которая это исправит. Запиши PIN. Храни офлайн.",
            ],
          },
          {
            title: "4.2.",
            items: [
              "Ты несёшь ответственность за безопасность своего устройства и аккаунта Telegram. Скомпрометированное устройство — скомпрометированные активы.",
            ],
          },
        ],
      },
      {
        num: "5.0",
        title: "ЭКСПЕРИМЕНТАЛЬНЫЕ ТЕХНОЛОГИИ",
        desc: "Veil Flow и интеграция Arcium TEE — технологии на ранней стадии.\n\nИспользование подразумевает принятие рисков, которые сопровождают любой frontier-протокол. Не вкладывай то, что не готов потерять.",
      },
    ],
  },
};

export default function Risks({ lang: propLang, onNavigate }: RisksProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const navigate = useNavigate();
  const content = risksContent[lang];

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
            onClick={() => (onNavigate ? onNavigate("PRIVACY") : navigate("/privacy"))}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#E5D9C4]" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] tracking-[0.2em] text-stone-600 uppercase font-mono">{lang === "EN" ? "PREVIOUS" : "НАЗАД"}</span>
              <span className="text-xs tracking-wider font-light text-stone-400 group-hover:text-[#E5D9C4] transition-colors">{lang === "EN" ? "Privacy Policy" : "Политика конфиденциальности"}</span>
            </div>
          </button>

          <button
            onClick={() => (onNavigate ? onNavigate("TERMS") : navigate("/terms"))}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.2em] text-stone-600 uppercase font-mono">{lang === "EN" ? "NEXT" : "ДАЛЕЕ"}</span>
              <span className="text-xs tracking-wider font-light text-stone-400 group-hover:text-[#E5D9C4] transition-colors">{lang === "EN" ? "Terms of Service" : "Условия использования"}</span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#E5D9C4]" />
          </button>
        </div>
      </div>
    </div>
  );
}
