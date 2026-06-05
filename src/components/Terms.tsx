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

const termsContent = {
  EN: {
    hero: "TERMS OF USE",
    subhero: "VEIL",
    sections: [
      {
        num: "1.0",
        title: "WHAT THIS IS",
        desc: "VEIL is a software interface for interacting with the Solana blockchain. Not a bank. Not a custodian. Not a financial advisor. Not an exchange.\n\nThis is a tool. You decide what to do with it.",
      },
      {
        num: "2.0",
        title: "YOUR KEYS — YOUR RESPONSIBILITY",
        desc: "We do not store your keys. Your PIN derives your keys. We store only encrypted bytes. Without your PIN — decryption is mathematically impossible.",
        subsections: [
          {
            title: "2.1.",
            items: [
              "You bear full responsibility for the safety of your PIN. Write it down. Store it offline. Do not share it with anyone.",
            ],
          },
          {
            title: "2.2.",
            items: [
              "If you lose your PIN, your funds are inaccessible. No backdoor. No recovery. Mathematics makes no exceptions.",
            ],
          },
        ],
      },
      {
        num: "3.0",
        title: "TRANSACTION EXECUTION",
        desc: "VEIL provides access to third-party execution infrastructure — Jito Block Engine, Jupiter V6.",
        subsections: [
          {
            title: "3.1.",
            items: [
              "MEV protection reduces the risk of frontrunning. There is no 100% execution guarantee during extreme network congestion.",
            ],
          },
          {
            title: "3.2.",
            items: [
              "Network fees and Jito tips are paid by you. They are not refundable under any circumstances.",
            ],
          },
        ],
      },
      {
        num: "4.0",
        title: "VEIL FLOW AND PRIVACY",
        desc: "Stealth routing protects the privacy of legitimate trading strategies.",
        subsections: [
          {
            title: "4.1.",
            items: [
              "The protocol must not be used for money laundering, terrorist financing, or sanctions evasion.",
            ],
          },
          {
            title: "4.2.",
            items: [
              "By using the protocol, you confirm the legal origin of your assets.",
            ],
          },
        ],
      },
      {
        num: "5.0",
        title: "LIMITATION OF LIABILITY",
        desc: 'The software is provided "as is".',
        subsections: [
          {
            title: "5.1.",
            items: [
              "VEIL is not responsible for losses from market volatility, smart contract bugs of third-party DEXs, or Solana network failures.",
            ],
          },
          {
            title: "5.2.",
            items: [
              "Trading digital assets carries the risk of losing 100% of your capital. You know this.",
            ],
          },
        ],
      },
    ],
  },
  RU: {
    hero: "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ",
    subhero: "VEIL",
    sections: [
      {
        num: "1.0",
        title: "ЧТО ЭТО ТАКОЕ",
        desc: "VEIL — программный интерфейс для взаимодействия с блокчейном Solana. Не банк. Не кастодиан. Не финансовый советник. Не биржа.\n\nЭто инструмент. Ты решаешь что с ним делать.",
      },
      {
        num: "2.0",
        title: "ТВОИ КЛЮЧИ — ТВОЯ ОТВЕТСТВЕННОСТЬ",
        desc: "Мы не храним твои ключи. Твой PIN деривирует твои ключи. Мы храним только зашифрованные байты. Без твоего PIN — расшифровка математически невозможна.",
        subsections: [
          {
            title: "2.1.",
            items: [
              "Ты несёшь полную ответственность за сохранность PIN. Запиши. Храни офлайн. Не передавай никому.",
            ],
          },
          {
            title: "2.2.",
            items: [
              "Потерял PIN — средства недоступны. Никакого бэкдора. Никакого восстановления. Математика не делает исключений.",
            ],
          },
        ],
      },
      {
        num: "3.0",
        title: "ИСПОЛНЕНИЕ ТРАНЗАКЦИЙ",
        desc: "VEIL предоставляет доступ к сторонней инфраструктуре исполнения — Jito Block Engine, Jupiter V6.",
        subsections: [
          {
            title: "3.1.",
            items: [
              "MEV защита снижает риск фронтраннинга. Гарантия 100% исполнения при экстремальных перегрузках сети отсутствует.",
            ],
          },
          {
            title: "3.2.",
            items: [
              "Комиссии сети и Jito tips оплачиваются тобой. Не возвращаются ни при каких обстоятельствах.",
            ],
          },
        ],
      },
      {
        num: "4.0",
        title: "VEIL FLOW И ПРИВАТНОСТЬ",
        desc: "Stealth routing защищает приватность законных торговых стратегий.",
        subsections: [
          {
            title: "4.1.",
            items: [
              "Протокол запрещено использовать для отмывания средств, финансирования терроризма или обхода санкций.",
            ],
          },
          {
            title: "4.2.",
            items: [
              "Используя протокол, ты подтверждаешь законность происхождения своих активов.",
            ],
          },
        ],
      },
      {
        num: "5.0",
        title: "ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ",
        desc: "Программное обеспечение предоставляется «как есть».",
        subsections: [
          {
            title: "5.1.",
            items: [
              "VEIL не несёт ответственности за убытки от рыночной волатильности, ошибок смарт-контрактов сторонних DEX или сбоев сети Solana.",
            ],
          },
          {
            title: "5.2.",
            items: [
              "Торговля цифровыми активами несёт риск потери 100% капитала. Ты это знаешь.",
            ],
          },
        ],
      },
    ],
  },
};

export default function Terms({ lang: propLang, onNavigate }: TermsProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const navigate = useNavigate();
  const content = termsContent[lang];

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
