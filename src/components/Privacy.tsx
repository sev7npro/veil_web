import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface PrivacyProps {
  lang?: "EN" | "RU";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS",
  ) => void;
}

const privacyContent = {
  EN: {
    hero: "PRIVACY POLICY",
    subhero: "VEIL",
    sections: [
      {
        num: "1.0",
        title: "WHAT WE DO NOT COLLECT",
        desc: "No names. No emails. No phone numbers. No IP addresses.\n\nYour profile is your public Solana address. Nothing more.",
      },
      {
        num: "2.0",
        title: "HOW KEYS ARE PROCESSED",
        subsections: [
          {
            title: "2.1.",
            items: [
              "Private keys are encrypted via AES-256-GCM. Your PIN is processed via Argon2id + HKDF. The derived key exists only in RAM at the moment of signing.",
            ],
          },
          {
            title: "2.2.",
            items: [
              "The server receives only ciphertext and nonce. Without your PIN — decryption is mathematically impossible.",
            ],
          },
          {
            title: "2.3.",
            items: [
              "We do not have access to your funds. Not technically. Not legally. Not in any way.",
            ],
          },
        ],
      },
      {
        num: "3.0",
        title: "TRANSACTION PRIVACY",
        subsections: [
          {
            title: "3.1.",
            items: [
              "Veil Flow obfuscates the transaction routing. Logs connecting the main wallet and ephemeral nodes are not kept.",
            ],
          },
          {
            title: "3.2.",
            items: [
              "Jito Block Engine makes your intents invisible in the public mempool until confirmed on-chain.",
            ],
          },
        ],
      },
      {
        num: "4.0",
        title: "LOCAL STORAGE",
        desc: "Operation history, address book, and settings are stored in an encrypted SQLite database within the isolated container of your account.\n\nThe /purge command or account deletion destroys data without the possibility of recovery. Irreversible.",
      },
      {
        num: "5.0",
        title: "TRACKING",
        desc: "The terminal does not use third-party trackers.\n\nNo Google Analytics. No Facebook Pixel. No geolocation. No device fingerprinting.\n\nZero.",
      },
    ],
  },
  RU: {
    hero: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
    subhero: "VEIL",
    sections: [
      {
        num: "1.0",
        title: "ЧТО МЫ НЕ СОБИРАЕМ",
        desc: "Никаких имён. Никаких email. Никаких телефонов. Никаких IP-адресов.\n\nТвой профиль — это твой публичный адрес Solana. Ничего больше.",
      },
      {
        num: "2.0",
        title: "КАК ОБРАБАТЫВАЮТСЯ КЛЮЧИ",
        subsections: [
          {
            title: "2.1.",
            items: [
              "Приватные ключи шифруются через AES-256-GCM. Твой PIN обрабатывается через Argon2id + HKDF. Производный ключ существует только в RAM в момент подписания.",
            ],
          },
          {
            title: "2.2.",
            items: [
              "Сервер получает только ciphertext и nonce. Без твоего PIN — расшифровка математически невозможна.",
            ],
          },
          {
            title: "2.3.",
            items: [
              "Мы не имеем доступа к твоим средствам. Не технически. Не юридически. Никак.",
            ],
          },
        ],
      },
      {
        num: "3.0",
        title: "ПРИВАТНОСТЬ ТРАНЗАКЦИЙ",
        subsections: [
          {
            title: "3.1.",
            items: [
              "Veil Flow обфусцирует маршрут транзакций. Логи связи между основным кошельком и эфемерными узлами не ведутся.",
            ],
          },
          {
            title: "3.2.",
            items: [
              "Jito Block Engine делает твои намерения невидимыми в публичном мемпуле до подтверждения ончейн.",
            ],
          },
        ],
      },
      {
        num: "4.0",
        title: "ЛОКАЛЬНОЕ ХРАНЕНИЕ",
        desc: "История операций, адресная книга и настройки хранятся в зашифрованной SQLite в изолированном контейнере твоего аккаунта.\n\nКоманда /purge или удаление аккаунта — данные уничтожаются без возможности восстановления. Необратимо.",
      },
      {
        num: "5.0",
        title: "ТРЕКИНГ",
        desc: "Терминал не использует сторонние трекеры.\n\nНикакого Google Analytics. Никакого Facebook Pixel. Никакой геолокации. Никакого fingerprinting устройств.\n\nНоль.",
      },
    ],
  },
};

export default function Privacy({ lang: propLang, onNavigate }: PrivacyProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const navigate = useNavigate();
  const content = privacyContent[lang];

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
            onClick={() => (onNavigate ? onNavigate("TERMS") : navigate("/terms"))}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#E5D9C4]" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] tracking-[0.2em] text-stone-600 uppercase font-mono">{lang === "EN" ? "PREVIOUS" : "НАЗАД"}</span>
              <span className="text-xs tracking-wider font-light text-stone-400 group-hover:text-[#E5D9C4] transition-colors">{lang === "EN" ? "Terms of Service" : "Условия использования"}</span>
            </div>
          </button>

          <button
            onClick={() => (onNavigate ? onNavigate("RISKS") : navigate("/risks"))}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.2em] text-stone-600 uppercase font-mono">{lang === "EN" ? "NEXT" : "ДАЛЕЕ"}</span>
              <span className="text-xs tracking-wider font-light text-stone-400 group-hover:text-[#E5D9C4] transition-colors">{lang === "EN" ? "Risk Disclosure" : "Раскрытие рисков"}</span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#E5D9C4]" />
          </button>
        </div>
      </div>
    </div>
  );
}
