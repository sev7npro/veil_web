import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface RoadmapProps {
  lang?: "EN" | "RU";
}

const roadmapContent = {
  EN: {
    hero: "ROADMAP",
    subhero: "DEVELOPMENT VECTOR (2026 — 2027)",
    desc: "Each quarter ships a concrete primitive. No empty promises. Current time — June 2026 (Q2) // ACTIVE.",
    phases: [
      {
        num: "PHASE 1",
        quarter: "Q2 2026",
        status: "ACTIVE",
        title: "GENESIS",
        subtitle: "Execution Architecture & Terminal Interface",
        features: [
          {
            name: "Mini App (Terminal)",
            desc: "Full-featured GUI inside Telegram WebView (React/Vite + Axum API). Live charts, order books, and real-time asset profiles.",
          },
          {
            name: "STELS ROUTING ENGINE",
            desc: "Proprietary multi-DEX liquidity aggregator. Precise price impact calculation. Slippage is analyzed and minimized automatically.",
          },
          {
            name: "Jito MEV Shield",
            desc: "Direct channel to Jito Block Engine. Terminal transactions bypass the Solana public mempool entirely, eliminating sandwich attacks.",
          },
          {
            name: "Security Enclave",
            desc: "AES-256-GCM + Argon2id + HKDF + Zeroize. Your PIN is never stored. After setup — we are mathematically unable to access your funds.",
          },
        ],
        target: "Phase target: $10,000,000 in volume through the terminal.",
      },
      {
        num: "PHASE 2",
        quarter: "Q3 2026",
        status: "NEXT",
        title: "OBFUSCATION",
        subtitle: "Stealth Routing & NLP",
        features: [
          {
            name: "Veil Flow (Beta)",
            desc: "Introducing controlled entropy into Solana transaction chains. Flows fragment on-the-fly and pass through ephemeral cryptographic circuits, eliminating any possibility of end-to-end balance monitoring by third parties.",
          },
          {
            name: "Veil Core (NLP)",
            desc: 'Local intent parser. Type: "Swap 50k USDC to SOL slippage 0.1%" — Core compiles a V0 transaction and presents a secure sign button.',
          },
          {
            name: "RugCheck",
            desc: "Smart contract scoring. Automatic, instant block on trading tokens with active Freeze Authority.",
          },
        ],
      },
      {
        num: "PHASE 3",
        quarter: "Q4 2026",
        status: "PLANNED",
        title: "CAPITALIZATION",
        subtitle: "Token Launch (TGE) & Fee Mechanics",
        features: [
          {
            name: "Real-Yield Utility Token",
            desc: "Not a memecoin. A protocol utility token backed by real yield from terminal transaction fees.",
          },
          {
            name: "Token Generation Event (TGE)",
            desc: "Token launch. No retail presale. Distribution: liquidity pool, treasury, and early participants.",
          },
          {
            name: "Tiered Fee System",
            desc: "Base fee: 0.8% per swap. Hold 10,000 tokens → 0.4% fee. Hold 50,000 tokens → 0% fee + priority Jito bundle access.",
          },
          {
            name: "Buyback & Burn",
            desc: "50% of terminal fee revenue is automatically routed to buyback and burn via smart contract. Deflationary model built into the architecture.",
          },
        ],
      },
      {
        num: "PHASE 4",
        quarter: "Q1 2027",
        status: "PLANNED",
        title: "THE SYNDICATE",
        subtitle: "DAO, Decentralization & Liquidity Provision",
        features: [
          {
            name: "Syndicate Governance (DAO)",
            desc: "Control passes to token holders. Votes on new DEX integrations, Jito tip size, and treasury allocation.",
          },
          {
            name: "Veil Flow Liquidity Provision",
            desc: "Large participants provide USDC/SOL directly into the protocol for P2P exchanges between terminal users. Zero slippage. No Raydium or Orca.",
          },
          {
            name: "Arcium TEE Mainnet",
            desc: "Veil Flow computations move into protected smart contract enclaves. Amounts and balances are hidden from Solana validators.",
          },
          {
            name: "Multi-Sig Vaults",
            desc: "Multi-signature wallets (Squads Protocol) for managing treasury directly from Telegram.",
          },
        ],
      },
    ],
  },
  RU: {
    hero: "ROADMAP",
    subhero: "ВЕКТОР РАЗВИТИЯ (2026 — 2027)",
    desc: "Каждый квартал выпускается конкретный примитив. Никаких пустых обещаний. Текущее время — Июнь 2026 (Q2) // АКТИВНО.",
    phases: [
      {
        num: "ФАЗА 1",
        quarter: "Q2 2026",
        status: "АКТИВНО",
        title: "GENESIS",
        subtitle: "Архитектура исполнения и интерфейс терминала",
        features: [
          {
            name: "Mini App (Терминал)",
            desc: "Полнофункциональный GUI внутри Telegram WebView (React/Vite + Axum API). Живые графики, стаканы ордеров и профили активов в реальном времени.",
          },
          {
            name: "STELS ROUTING ENGINE",
            desc: "Собственный агрегатор ликвидности multi-DEX. Точный расчет Price Impact. Проскальзывание анализируется и минимизируется автоматически.",
          },
          {
            name: "Jito MEV Shield",
            desc: "Прямой канал до Jito Block Engine. Транзакции терминала полностью обходят публичный mempool Solana, устраняя сэндвич-атаки.",
          },
          {
            name: "Security Enclave",
            desc: "AES-256-GCM + Argon2id + HKDF + Zeroize. Ваш PIN-код никогда не сохраняется. После настройки — мы математически не имеем доступа к вашим средствам.",
          },
        ],
        target: "Цель фазы: объем $10,000,000 через терминал.",
      },
      {
        num: "ФАЗА 2",
        quarter: "Q3 2026",
        status: "СЛЕДУЮЩИЙ",
        title: "ОБФУСКАЦИЯ",
        subtitle: "Скрытая маршрутизация и NLP",
        features: [
          {
            name: "Veil Flow (Beta)",
            desc: "Внедрение контролируемой энтропии в транзакционные цепочки Solana. Потоки фрагментируются на лету и проходят через эфемерные криптографические контуры, исключая возможность сквозного мониторинга балансов со стороны третьих лиц.",
          },
          {
            name: "Veil Core (NLP)",
            desc: 'Локальный парсер намерений. Введите: "Swap 50k USDC to SOL slippage 0.1%" — Core компилирует транзакцию V0 и представляет безопасную кнопку подписи.',
          },
          {
            name: "RugCheck",
            desc: "Скоринг смарт-контрактов. Автоматическая, мгновенная блокировка торговых токенов с активной функцией Freeze Authority.",
          },
        ],
      },
      {
        num: "ФАЗА 3",
        quarter: "Q4 2026",
        status: "В ПЛАНЕ",
        title: "КАПИТАЛИЗАЦИЯ",
        subtitle: "Запуск токена (TGE) и механика комиссий",
        features: [
          {
            name: "Реально-Доходный Токен (Utility Token)",
            desc: "Не мемкоин. Утилитный токен протокола, обеспеченный реальной доходностью от комиссий транзакций терминала.",
          },
          {
            name: "Token Generation Event (TGE)",
            desc: "Запуск токена. Без публичного пресейла. Распределение: пул ликвидности, трежери и ранние участники.",
          },
          {
            name: "Многоуровневая система комиссий",
            desc: "Базовая комиссия: 0.8% за свал. Хранение 10,000 токенов → комиссия 0.4%. Хранение 50,000 токенов → комиссия 0% + приоритетный доступ к бандлам Jito.",
          },
          {
            name: "Buyback & Burn",
            desc: "50% от дохода с комиссий терминала автоматически направляется на выкуп и сжигание через смарт-контракт. Дефляционная модель встроена в архитектуру.",
          },
        ],
      },
      {
        num: "ФАЗА 4",
        quarter: "Q1 2027",
        status: "В ПЛАНЕ",
        title: "СИНДИКАТ",
        subtitle: "DAO, децентрализация и предоставление ликвидности",
        features: [
          {
            name: "Управление Синдикатом (DAO)",
            desc: "Контроль переходит к держателям токенов. Голосование за новые интеграции DEX, размер чаевых Jito и распределение трежери.",
          },
          {
            name: "Предоставление ликвидности Veil Flow",
            desc: "Крупные участники предоставляют USDC/SOL напрямую в протокол для P2P-обменов между пользователями терминала. Нулевое проскальзывание. Без Raydium или Orca.",
          },
          {
            name: "Arcium TEE Mainnet",
            desc: "Вычисления Veil Flow переносятся в защищенные анклавы смарт-контрактов. Суммы и балансы скрыты от валидаторов Solana.",
          },
          {
            name: "Multi-Sig Vaults",
            desc: "Кошельки со множественной подписью (Squads Protocol) для управления трежери прямо из Telegram.",
          },
        ],
      },
    ],
  },
};

export default function Roadmap({ lang: propLang }: RoadmapProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const content = roadmapContent[lang];

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] pt-32 pb-24 px-6 font-sans relative">
      <div className="max-w-4xl mx-auto py-16 relative z-10">
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
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E5D9C4] mb-6">
            {content.subhero}
          </p>
          <p className="font-sans text-[12px] sm:text-[14px] text-stone-400 font-light max-w-2xl mx-auto tracking-wide">
            {content.desc}
          </p>
          <div className="mt-12 w-px h-16 bg-[#121212] mx-auto" />
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="flex flex-col relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[15px] sm:before:left-[23px] before:w-px before:bg-[#121212] sm:ml-4">
          {content.phases.map((phase, idx) => {
            const isActive =
              phase.status === "ACTIVE" || phase.status === "АКТИВНО";
            const isNext =
              phase.status === "NEXT" || phase.status === "СЛЕДУЮЩИЙ";

            let statusColor = "text-[#65635F] border-[#121212]";
            let dotColor = "bg-[#121212]";
            if (isActive) {
              statusColor = "text-[#050505] bg-[#E5D9C4] border-[#E5D9C4]";
              dotColor = "bg-[#E5D9C4] shadow-[0_0_12px_rgba(229,217,196,0.5)]";
            } else if (isNext) {
              statusColor = "text-[#E5D9C4] border-[#E5D9C4]/30";
              dotColor = "bg-[#E5D9C4]/50";
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-12 sm:pl-20 py-10"
              >
                {/* Timeline Dot */}
                {isActive ? (
                  <svg
                    className="absolute left-[3px] sm:left-[11px] top-[38px] w-[25px] h-[25px] z-10 pointer-events-none"
                    viewBox="0 0 25 25"
                  >
                    <defs>
                      <filter
                        id={`gold-glow-${idx}`}
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%"
                      >
                        <feGaussianBlur
                          in="SourceGraphic"
                          stdDeviation="2.5"
                          result="blur"
                        />
                        <feComponentTransfer in="blur" result="glow">
                          <feFuncA type="linear" slope="0.8" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <circle
                      cx="12.5"
                      cy="12.5"
                      r="4.5"
                      fill="#E5D9C4"
                      filter={`url(#gold-glow-${idx})`}
                    />
                  </svg>
                ) : (
                  <div
                    className={`absolute left-[11px] sm:left-[19px] top-[46px] w-[9px] h-[9px] rounded-full z-10 ${dotColor}`}
                  />
                )}

                {/* Phase Header */}
                <div className="mb-6 flex flex-col items-start gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.25em] font-light text-[#E5D9C4]">
                      {phase.quarter}
                    </span>
                    <span
                      className={`font-mono text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] border uppercase ${statusColor}`}
                    >
                      {phase.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-6">
                      <span className="text-[#E5D9C4] font-mono text-xs tracking-[0.25em] font-light">
                        {phase.num}
                      </span>
                      <h2 className="font-sans text-white text-lg sm:text-xl font-light tracking-[0.08em] uppercase">
                        {phase.title}
                      </h2>
                    </div>
                    <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed mt-2 uppercase">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="flex flex-col gap-2 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 relative">
                    {phase.features.map((feature, fIdx) => {
                      const isLastInMobile = fIdx === phase.features.length - 1;
                      const isLeftCol = fIdx % 2 === 0;
                      const isBottomRow =
                        fIdx >= Math.floor((phase.features.length - 1) / 2) * 2;

                      return (
                        <div
                          key={fIdx}
                          className={`p-6 flex flex-col border-[#121212] transition-colors
                            ${isLastInMobile ? "" : "border-b"}
                            ${isLeftCol ? "md:border-r" : "md:border-r-0"}
                            ${isBottomRow ? "md:border-b-0" : "md:border-b"}
                          `}
                        >
                          <h3 className="font-sans text-stone-200 font-normal tracking-wide text-xs uppercase mb-1">
                            {feature.name}
                          </h3>
                          <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                            {feature.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {phase.target && (
                    <div className="mt-12 text-center w-full">
                      <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#E5D9C4] uppercase">
                        {phase.target}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
