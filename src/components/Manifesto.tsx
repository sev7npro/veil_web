import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface ManifestoProps {
  lang?: "EN" | "RU";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS" | "MANIFESTO",
  ) => void;
}

const manifestoContent = {
  EN: {
    hero: "THE SOVEREIGN TOOL",
    subhero: "VEIL MANIFESTO",
    sections: [
      {
        num: "01",
        title: "BORN OF PAIN",
        desc: "VEIL was not designed in marketing offices. It was born on my desk as a simple, personal solution — a couple of buttons for secure transactions on Solana, when I got tired of revealing my addresses and balances with every transfer.\n\nBut good architecture inherently seeks expansion. Solving my own daily problems, I added module after module: fast STELS wallets emerged, the double-wallet Master/Stels model, and, finally, the protocol for permanent, irreversible data erasure.\n\nThis project grew the way code grows — from local tasks to an autonomous ecosystem.",
      },
      {
        num: "02",
        title: "FREEDOM BY DEFAULT",
        desc: "In any conventional system — be it Phantom, Exodus, or a centralized exchange — you are forced to use the same public address for years. Your financial trail accumulates, is analyzed, and is put on public display. We are forced to undergo humiliating KYC checks, and they reserve the right to freeze our assets at any moment if the system dislikes something.\n\nWe declare: the \"Delete and Recreate\" function is not a sign of fear or paranoia. It is a fundamental baseline that should be embedded in any financial tool by default.\n\nThe world changes too fast to leave permanent tracks. There are no accounts in VEIL, no databases with personal information, and we store exactly zero of your assets on our servers. Mathematically, we have no access to your funds.",
      },
      {
        num: "03",
        title: "FRICTIONLESS INTERFACE",
        desc: "As the project grew, it became obvious: a trader needs a rapid-response tool. Browser extensions are sluggish, and mobile apps require loading and authentication time.\n\nWe created a Telegram Mini App that loads in 3 seconds directly in your messenger.\n\nThis is not a toy. It is a full-fledged trading terminal in your pocket: with live order books, interactive charts, limit orders, and, if you need pure hardcore, futures with leverage up to 250x. You no longer need to leave your communication environment to execute a trade. Your messenger is your sovereign trading gateway.",
      },
      {
        num: "04",
        title: "PRAGMATISM OVER DOGMA",
        desc: "VEIL does not pretend to be something else. We are not building a cult of absolute anonymity, nor are we lecturing about morality.\n\nPrivacy, in our view, is not a holy grail, but a standard utility. It is hygiene that should be accessible to everyone by default.\n\nBut we are against dogmas. If you do not need disguise, if at this very second there is a mad memecoin battle on the market and only pure, naked Solana speed matters to you — you can turn off Jito and STELS routes in two clicks. You strip all obfuscation from the transaction and get an ultra-fast, convenient terminal for direct trading in the network.\n\nWe give you the tool. How to operate it is up to you.",
      },
    ],
    closing: "THE ARCHITECT.",
    motto: "MATH OVER LUCK.",
  },
  RU: {
    hero: "СУВЕРЕННЫЙ ИНСТРУМЕНТ",
    subhero: "МАНИФЕСТ VEIL",
    sections: [
      {
        num: "01",
        title: "РОЖДЕНИЕ ИЗ БОЛИ",
        desc: "VEIL не проектировался в кабинетах маркетологов. Он зародился на моем рабочем столе как простое персональное решение — пара кнопок для безопасного исполнения транзакций на Solana, когда мне надоело светить свои адреса и балансы при каждом переводе.\n\nНо хорошая архитектура стремится к расширению. Решая собственные ежедневные проблемы, я добавлял модуль за модулем: появились быстрые STELS-кошельки, двухкошельковая модель Master/Stels и, наконец, протокол полного безвозвратного удаления данных.\n\nЭтот проект рос так, как растет код — от частных задач к созданию автономной экосистемы.",
      },
      {
        num: "02",
        title: "СВОБОДА КАК УМОЛЧАНИЕ",
        desc: "В любой привычной системе — будь то кошелек Phantom, Exodus или централизованная биржа — тебя заставляют годами использовать один и тот же публичный адрес. Твой финансовый след накапливается, анализируется и выставляется на всеобщее обозрение. Нас заставляют проходить унизительные проверки KYC и дают право блокировать наши активы в любой момент, если системе что-то не понравится.\n\nМы заявляем: функция «Удалить и создать заново» — это не признак страха или паранойи. Это базовое умолчание, которое должно быть вшито в любой финансовый инструмент по умолчанию.\n\nМир меняется слишком быстро, чтобы оставлять за собой постоянные следы. В VEIL нет аккаунтов, нет баз данных с личной информацией и на наших серверах хранится ровно ноль твоих активов. Мы математически не имеем доступа к твоим деньгам.",
      },
      {
        num: "03",
        title: "ИНТЕРФЕЙС БЕЗ ТРЕНИЯ",
        desc: "По мере роста проекта стало очевидно: трейдеру нужен инструмент быстрого реагирования. Браузерные расширения неповоротливы, а мобильные приложения требуют времени на загрузку и авторизацию.\n\nМы создали Telegram Mini App, который загружается за 3 секунды прямо в твоем мессенджере.\n\nЭто не игрушка. Это полноценный торговый терминал в твоем кармане: с живыми стаканами, интерактивными графиками, лимитными ордерами и, если тебе нужен чистый хардкор, — фьючерсами с кредитным плечом до х250. Тебе больше не нужно выходить из коммуникационной среды, чтобы совершить сделку. Твой мессенджер — твой суверенный торговый шлюз.",
      },
      {
        num: "04",
        title: "ПРАГМАТИЗМ ВМЕСТО ДОГМЫ",
        desc: "VEIL не пытается казаться кем-то другим. Мы не строим секту свидетелей абсолютной анонимности и не читаем лекций о морали.\n\nПриватность в нашем понимании — это не священный грааль, а стандартная утилита. Это гигиена, которая должна быть доступна каждому по умолчанию.\n\nНо мы против догм. Если тебе не нужна маскировка, если в данную секунду на рынке идет бешеная битва за мемкоин и тебе важна только чистая, naked-скорость Solana — ты отключаешь Jito и STELS-маршруты в два клика. Ты снимаешь с транзакции всю обфускацию и получаешь сверхскоростной, удобный терминал для прямой торговли в сети.\n\nМы даем тебе инструмент. Как им управлять — решаешь только ты.",
      },
    ],
    closing: "THE ARCHITECT.",
    motto: "MATH OVER LUCK.",
  },
};

export default function Manifesto({ lang: propLang }: ManifestoProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const content = manifestoContent[lang];

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20 text-center"
        >
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-4 text-[#FFFFFF] uppercase">
            {content.hero}
          </h1>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E5D9C4]">
            {content.subhero}
          </p>
          <div className="mt-8 w-px h-16 bg-[#121212] mx-auto" />
        </motion.div>

        {/* Sections Sequence */}
        <div className="flex flex-col gap-16 md:gap-24">
          {content.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 pb-16 border-b border-[#121212] last:border-0 last:pb-0"
            >
              <div className="md:w-1/3 flex items-start gap-4">
                <span className="text-[#E5D9C4] font-mono text-xs tracking-[0.25em] uppercase">
                  {section.num}
                </span>
                <span className="text-[#E5D9C4]/40 font-mono text-xs tracking-[0.25em] uppercase">
                  ——
                </span>
                <h3 className="font-sans text-[#FFFFFF] text-lg sm:text-xl font-light tracking-[0.08em] uppercase">
                  {section.title}
                </h3>
              </div>
              <div className="md:w-2/3">
                <p className="font-sans text-[#A8A29E] font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {section.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sovereign Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-24 pt-16 border-t border-[#121212] flex flex-col items-center justify-center text-center gap-3"
        >
          <span className="font-mono text-stone-500 text-[10px] tracking-[0.3em] uppercase">
            {content.closing}
          </span>
          <span className="font-sans font-extralight text-[#E5D9C4] text-xs sm:text-sm tracking-[0.4em] uppercase">
            {content.motto}
          </span>
        </motion.div>

      </div>
    </div>
  );
}
