import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import TerminalMockup from "./TerminalMockup";

interface DocumentationProps {
  lang?: "EN" | "RU";
}

const docsContent = {
  EN: {
    hero: "DOCUMENTATION",
    subhero: "TRADING TERMINAL ON SOLANA",
    sections: [
      {
        num: "01",
        title: "WHY THIS EXISTS",
        subtitle: "THE PROBLEM",
        bullets: [
          "Solana is fast and cheap. Its architecture is also completely transparent. Three problems follow from this:",
          "Custodial risk: Most Telegram trading bots store private keys on centralized servers in plaintext.",
          "MEV extraction: Transactions in the public mempool are exposed to sandwich attacks. You pay the spread to bots, not the market.",
          "On-chain tracking: Analytics platforms (Nansen, Arkham) link sender and recipient addresses in real time. Your strategy is visible.",
          "Veil eliminates all three. Your keys — only yours. Your orders are invisible until execution. Your addresses are not linked.",
        ],
      },
      {
        num: "02",
        title: "YOUR KEYS STAY WITH YOU",
        subtitle: "KEY SECURITY",
        desc: "Zero-trust by design. After your PIN is set — we are mathematically unable to access your funds.",
        subsections: [
          {
            title: "2.1. How keys are stored",
            items: [
              "When you create a Vault, your private key is encrypted with AES-256-GCM.",
              "Your PIN is processed through Argon2id. The derived key is fed into HKDF.",
              "Only the ciphertext and nonce are written to the local database (SQLite).",
              "Decryption happens exclusively in RAM at signing time. The PIN is never stored.",
            ],
          },
          {
            title: "2.2. Zeroization after signing",
            items: [
              "Immediately after Ed25519 signing, raw key bytes are wiped from RAM using the Zeroize trait. A full server memory dump yields nothing.",
              "Server compromise does not grant access to funds. Without the PIN — only encrypted noise.",
            ],
          },
        ],
      },
      {
        num: "03",
        title: "HOW ORDERS ARE PROCESSED",
        subtitle: "EXECUTION ENGINE",
        desc: "Speed. MEV protection. No public mempool exposure.",
        subsections: [
          {
            title: "3.1. Jito Block Engine",
            items: [
              "All orders (swaps, snipes) are routed through the Jito Block Engine as atomic bundles.",
              "Your transactions are invisible to public RPC nodes until they land in a block.",
              "Atomic execution: either the entire bundle executes at your requested price, or it reverts. Sandwich attacks are structurally impossible.",
            ],
          },
          {
            title: "3.2. Jupiter V6 routing",
            items: [
              "Jupiter V6 finds optimal swap paths across all Solana DEXs automatically. Minimal price impact. No manual route selection.",
            ],
          },
        ],
      },
      {
        num: "04",
        title: "STEALTH ROUTING",
        subtitle: "VEIL FLOW",
        desc: "Analytics see your transactions. They cannot see the link between you and the recipient.\nWhen Stealth Routing is active:",
        subsections: [
          {
            title: "Ephemeral nodes",
            items: [
              "One-time transit addresses are generated dynamically. They are used once and discarded.",
            ],
          },
          {
            title: "Liquidity fragmentation",
            items: [
              "The original amount is split across independent transit nodes. No single hop carries the full amount.",
            ],
          },
          {
            title: "Timing obfuscation",
            items: [
              "Micro-delays between transfers prevent timing analysis in block explorers.",
              "Phase II: Arcium TEE — amounts and balances hidden from Solana validators. In development.",
            ],
          },
        ],
      },
      {
        num: "05",
        title: "TWO WAYS TO TRADE",
        subtitle: "INTERFACES",
        desc: "GUI for traders who prefer visuals. CLI for traders who think in commands.",
        subsections: [
          {
            title: "5.1. Telegram Terminal (Mini App)",
            items: [
              "Full GUI inside Telegram WebView.",
              "Real-time charts and order books.",
              "Portfolio view. Slippage settings. One-tap execution.",
            ],
          },
          {
            title: "5.2. Veil Core — Command Line",
            items: [
              "Text and voice input.",
              "Natural language parsing — write what you want to do, get a signed transaction.",
              '→ "Swap 50 SOL to USDC with 0.5% slippage via Jito" — bundle compiled and signed automatically.',
            ],
          },
        ],
      },
      {
        num: "06",
        title: "COMPLETE WIPE",
        subtitle: "PURGE PROTOCOL",
        desc: "One button. Irreversible.",
        subsections: [
          {
            title: "What gets destroyed",
            items: [
              "Master Wallet — destroyed.",
              "Stels Wallets — destroyed.",
              "Address book — cleared.",
              "PIN and session keys — deleted.",
              "RAM — zeroed via Zeroize.",
            ],
          },
          {
            title: "Why this matters",
            items: [
              "Most wallets have no exit. Data accumulates and stays.",
              "PURGE is a hard guarantee. After activation — there is nothing to steal. Nothing to extract. Nothing to subpoena.",
            ],
          },
        ],
      },
    ],
  },
  RU: {
    hero: "ДОКУМЕНТАЦИЯ",
    subhero: "ТОРГОВЫЙ ТЕРМИНАЛ НА SOLANA",
    sections: [
      {
        num: "01",
        title: "ПОЧЕМУ ЭТО СУЩЕСТВУЕТ",
        subtitle: "ПРОБЛЕМА",
        bullets: [
          "Solana быстрая и дешевая. Ее архитектура также полностью прозрачна. Из этого вытекают три проблемы:",
          "Кастодиальный риск: Большинство торговых ботов в Telegram хранят приватные ключи на централизованных серверах в открытом виде.",
          "MEV-извлечение: Транзакции в публичном мемпуле подвержены сэндвич-атакам. Вы платите спред ботам, а не рынку.",
          "Ончейн-отслеживание: Аналитические платформы (Nansen, Arkham) связывают адреса отправителя и получателя в реальном времени. Ваша стратегия видна.",
          "Veil устраняет все три. Ваши ключи — только ваши. Ваши ордера скрыты до момента исполнения. Ваши адреса не связаны.",
        ],
      },
      {
        num: "02",
        title: "ВАШИ КЛЮЧИ ОСТАЮТСЯ С ВАМИ",
        subtitle: "БЕЗОПАСНОСТЬ КЛЮЧЕЙ",
        desc: "Zero-trust по умолчанию. После установки PIN-кода мы математически не можем получить доступ к вашим средствам.",
        subsections: [
          {
            title: "2.1. Как хранятся ключи",
            items: [
              "При создании надежного хранилища (Vault) ваш приватный ключ шифруется с помощью AES-256-GCM.",
              "Ваш PIN-код обрабатывается через Argon2id. Полученный ключ передается в HKDF.",
              "В локальную базу данных (SQLite) записываются только зашифрованный текст и nonce.",
              "Расшифровка происходит исключительно в оперативной памяти (RAM) во время процесcа подписания. PIN-код никогда не сохраняется.",
            ],
          },
          {
            title: "2.2. Удаление после подписи",
            items: [
              'Сразу после подписания Ed25519 "сырые" байты ключа удаляются из оперативной памяти с помощью Zeroize. Полный дамп памяти сервера ничего не даст.',
              "Компрометация сервера не дает доступа к средствам. Без PIN-кода — только зашифрованный шум.",
            ],
          },
        ],
      },
      {
        num: "03",
        title: "КАК ОБРАБАТЫВАЮТСЯ ОРДЕРА",
        subtitle: "МЕХАНИЗМ ИСПОЛНЕНИЯ",
        desc: "Скорость. Защита от MEV. Отсутствие уязвимости публичного мемпула.",
        subsections: [
          {
            title: "3.1. Jito Block Engine",
            items: [
              "Все ордера (свопы, снайпинг) маршрутизируются через Jito Block Engine как атомарные пакеты (bundles).",
              "Ваши транзакции невидимы для публичных узлов RPC, пока они не попадут в блок.",
              "Атомарное выполнение: либо весь бандл выполняется по запрошенной вами цене, либо отменяется. Сэндвич-атаки структурно невозможны.",
            ],
          },
          {
            title: "3.2. Маршрутизация Jupiter V6",
            items: [
              "Jupiter V6 автоматически ищет оптимальные пути обмена на всех DEX-биржах Solana. Минимальное влияние на цену. Нет ручного выбора маршрута.",
            ],
          },
        ],
      },
      {
        num: "04",
        title: "СКРЫТАЯ МАРШРУТИЗАЦИЯ",
        subtitle: "VEIL FLOW",
        desc: "Аналитика видит ваши транзакции. Но она не может увидеть связь между вами и получателем.\nКогда активна Скрытая Маршрутизация (Stealth Routing):",
        subsections: [
          {
            title: "Эфемерные узлы (Ephemeral nodes)",
            items: [
              "Одноразовые транзитные адреса генерируются динамически. Они используются один раз и удаляются.",
            ],
          },
          {
            title: "Фрагментация ликвидности",
            items: [
              "Первоначальная сумма распределяется по независимым транзитным узлам. Ни один узел не передает полную сумму.",
            ],
          },
          {
            title: "Маскировка времени (Timing obfuscation)",
            items: [
              "Микрозадержки между переводами предотвращают временной анализ в обозревателях блоков (block explorers).",
              "Фаза II: Arcium TEE — суммы и балансы скрыты от валидаторов Solana. В разработке.",
            ],
          },
        ],
      },
      {
        num: "05",
        title: "ДВА СПОСОБА ТОРГОВЛИ",
        subtitle: "ИНТЕРФЕЙСЫ",
        desc: "Графический интерфейс (GUI) для трейдеров, предпочитающих визуал. Командная строка (CLI) для тех, кто мыслит командами.",
        subsections: [
          {
            title: "5.1. Терминал в Telegram (Mini App)",
            items: [
              "Полноценный графический интерфейс внутри Telegram WebView.",
              "Графики в реальном времени и книги ордеров.",
              "Просмотр портфеля. Настройки проскальзывания. Исполнение в один клик.",
            ],
          },
          {
            title: "5.2. Ядро Veil — Командная строка",
            items: [
              "Ввод текста и голоса.",
              "Парсинг естественного языка — напишите, что вы хотите сделать, и получите подписанную транзакцию.",
              '→ "Поменять 50 SOL на USDC с проскальзыванием 0.5% через Jito" — бандл собирается и подписывается автоматически.',
            ],
          },
        ],
      },
      {
        num: "06",
        title: "ПОЛНОЕ УНИЧТОЖЕНИЕ",
        subtitle: 'ПРОТОКОЛ "PURGE" (Очистка)',
        desc: "Одна кнопка. Необратимо.",
        subsections: [
          {
            title: "Что уничтожается:",
            items: [
              "Master Wallet (основной кошелек) — уничтожен.",
              "STELS-кошельки — уничтожены.",
              "Адресная книга — очищена.",
              "PIN-код и сессионные ключи — удалены.",
              "RAM — очищена с помощью Zeroize.",
            ],
          },
          {
            title: "Почему это важно:",
            items: [
              "В большинстве кошельков нет выхода. Данные накапливаются и остаются.",
              "PURGE — это жесткая гарантия. После активации — нечего красть. Нечего извлекать. Нечего требовать.",
            ],
          },
        ],
      },
    ],
  },
};

export default function Documentation({ lang: propLang }: DocumentationProps = {}) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const content = docsContent[lang];

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
                    <span className="text-[#E5D9C4] font-mono text-xs tracking-[0.25em] font-light">
                      {section.num}
                    </span>
                    <h3 className="font-sans text-white text-lg sm:text-xl font-light tracking-[0.08em] uppercase transition-colors group-hover:text-[#E5D9C4]">
                      {section.subtitle}
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
                      <div className="pl-12 pt-6 flex flex-col gap-6 sm:gap-8">
                        {/* Main Description */}
                        {section.desc && (
                          <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                            {section.desc}
                          </p>
                        )}

                        {/* Bullet Replacement */}
                        {section.bullets && (
                          <ul className="flex flex-col gap-4">
                            {section.bullets.map((bullet, i) => (
                              <li
                                key={i}
                                className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed flex gap-3"
                              >
                                <span className="text-stone-500 font-light">
                                  —
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Subsections */}
                        {section.subsections && (
                          <div className="flex flex-col gap-6 sm:gap-8 mt-2">
                            {section.subsections.map((sub, i) => (
                              <div key={i} className="flex flex-col gap-3">
                                <h4 className="font-sans text-stone-200 font-normal tracking-wide text-xs uppercase mb-1">
                                  {sub.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {sub.items.map((item, j) => (
                                    <li
                                      key={j}
                                      className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed flex gap-3"
                                    >
                                      <span className="text-stone-500 font-light">
                                        —
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: item.replace(
                                            /(".*?")/g,
                                            '<span class="text-stone-300 font-normal">$1</span>',
                                          ),
                                        }}
                                      />
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
