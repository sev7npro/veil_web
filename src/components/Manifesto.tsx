import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface ManifestoProps {
  lang?: "EN" | "RU";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS" | "MANIFESTO",
  ) => void;
}

const manifestoContent = {
  EN: {
    hero: "VEIL MANIFESTO",
    subhero: "SOVEREIGN PROTOCOL",
    closing: "THE ARCHITECT.",
    motto: "MATH OVER LUCK.",
    sections: [
      {
        num: "01",
        title: "SUBVERSION OF VALUES",
        desc: "We live in an era of total subversion of values. An industry born as a manifesto of financial independence has turned into a controlled digital paddock of KYC barriers, centralized exchanges, and total on-chain analysis, where your every step is logged and put up for sale.\n\nMost market participants have completely forgotten why cryptocurrency was created in the first place. It was not created as a speculative playground for market makers, nor as a tool for collecting virtual points under the supervision of regulators. Cryptocurrency is a mathematical weapon of personal freedom. It is boundless, peer-to-peer exchange that requires nobody's permission or trust.\n\nVEIL does not attempt to rewrite the rules of the game. We are simply returning the original meaning of this technology to you. Without censorship. Without intermediaries."
      },
      {
        num: "02",
        title: "BORN OF PAIN",
        desc: "VEIL was not designed in marketing offices. It was born on my desk as a simple, personal solution — a couple of buttons for secure transactions on Solana, when I got tired of revealing my addresses and balances with every transfer.\n\nBut good architecture inherently seeks expansion. Solving my own daily problems, I added module after module: fast STELS wallets emerged, the double-wallet Master/Stels model, and, finally, the protocol for permanent, irreversible data erasure.\n\nThis project grew the way code grows — from local tasks to an autonomous ecosystem."
      },
      {
        num: "03",
        title: "FREEDOM BY DEFAULT",
        desc: "In any conventional system — be it Phantom, Exodus, or a centralized exchange — you are forced to use the same public address for years. Your financial trail accumulates, is analyzed, and is put on public display. We are forced to undergo humiliating KYC checks, and they reserve the right to freeze our assets at any moment if the system dislikes something.\n\nWe declare: the \"Delete and Recreate\" function is not a sign of fear or paranoia. It is a fundamental baseline that should be embedded in any financial tool by default.\n\nThe world changes too fast to leave permanent tracks. There are no accounts in VEIL, no databases with personal information, and we store exactly zero of your assets on our servers. Mathematically, we have no access to your funds."
      },
      {
        num: "04",
        title: "FRICTIONLESS INTERFACE",
        desc: "As the project grew, it became obvious: a trader needs a rapid-response tool. Browser extensions are sluggish, and mobile apps require loading and authentication time.\n\nWe created a Telegram Mini App that loads in 3 seconds directly in your messenger.\n\nThis is not a toy. It is a full-fledged trading terminal in your pocket: with live order books, interactive charts, limit orders, and, if you need pure hardcore, futures with leverage up to 250x. You no longer need to leave your communication environment to execute a trade. Your messenger is your sovereign trading gateway."
      },
      {
        num: "05",
        title: "PRAGMATISM OVER DOGMA",
        desc: "Privacy, in our view, is not a holy grail, but a standard utility. It is hygiene that should be accessible to everyone by default.\n\nBut we are against dogmas. If you do not need disguise, if at this very second there is a mad memecoin battle on the market and only pure, naked Solana speed matters to you — you can turn off Jito and STELS routes in two clicks. You strip all obfuscation from the transaction and get an ultra-fast, convenient terminal for direct trading in the network.\n\nWe give you the tool. How to operate it is up to you."
      }
    ]
  },
  RU: {
    hero: "МАНИФЕСТ VEIL",
    subhero: "СУВЕРЕННЫЙ ПРОТОКОЛ",
    closing: "THE ARCHITECT.",
    motto: "MATH OVER LUCK.",
    sections: [
      {
        num: "01",
        title: "ПОДМЕНА ПОНЯТИЙ",
        desc: "Мы живем в эпоху тотальной подмены понятий. Индустрия, зародившаяся как манифест финансовой независимости, превратилась в контролируемый цифровой загон с KYC-барьерами, централизованными биржами и тотальным ончейн-анализом, где каждый твой шаг протоколируется и выставляется на продажу.\n\nБольшинство участников рынка полностью забыли, для чего была создана криптовалюта. Она создавалась не как спекулятивный полигон для маркет-мейкеров и не как инструмент накопления виртуальных баллов под надзором регуляторов. Криптовалюта — это математическое оружие личной свободы. Это безграничный peer-to-peer обмен, не требующий чьего-либо одобрения или доверия.\n\nVEIL не пытается переписать правила игры. Мы просто возвращаем тебе первоначальный смысл технологии. Без цензуры. Без посредников."
      },
      {
        num: "02",
        title: "РОЖДЕНИЕ ИЗ БОЛИ",
        desc: "VEIL не проектировался в кабинетах маркетологов. Он зародился на моем рабочем столе как простое персональное решение — пара кнопок для безопасного исполнения транзакций на Solana, когда мне надоело светить свои адреса и балансы при каждом переводе.\n\nНо хорошая архитектура стремится к расширению. Решая собственные ежедневные проблемы, я добавлял модуль за модулем: появились быстрые STELS-кошельки, двухкошельковая модель Master/Stels и, наконец, протокол полного безвозвратного удаления данных.\n\nЭтот проект рос так, как растет код — от частных задач к созданию автономной экосистемы."
      },
      {
        num: "03",
        title: "СВОБОДА КАК УМОЛЧАНИЕ",
        desc: "В любой привычной системе — будь то кошелек Phantom, Exodus или централизованная биржа — тебя заставляют годами использовать один и тот же публичный адрес. Твой финансовый след накапливается, анализируется и выставляется на всеобщее обозрение. Нас заставляют проходить унизительные проверки KYC и дают право блокировать наши активы в любой момент, если системе что-то не понравится.\n\nМы заявляем: функция «Удалить и создать заново» — это не признак страха или паранойи. Это базовое умолчание, которое должно быть вшито в любой финансовый инструмент по умолчанию.\n\nМир меняется слишком быстро, чтобы оставлять за собой постоянные следы. В VEIL нет аккаунтов, нет баз данных с личной информацией и на наших серверах хранится ровно ноль твоих активов. Мы математически не имеем доступа к твоим деньгам."
      },
      {
        num: "04",
        title: "ИНТЕРФЕЙС БЕЗ ТРЕНИЯ",
        desc: "По мере роста проекта стало очевидно: трейдеру нужен инструмент быстрого реагирования. Браузерные расширения неповоротливы, а мобильные приложения требуют времени на загрузку и авторизацию.\n\nМы создали Telegram Mini App, который загружается за 3 секунды прямо в твоем мессенджере.\n\nЭто не игрушка. Это полноценный торговый терминал в твоем кармане: с живыми стаканами, интерактивными графиками, лимитными ордерами и, если тебе нужен чистый хардкор, — фьючерсами с кредитным плечом до х250. Тебе больше не нужно выходить из коммуникационной среды, чтобы совершить сделку. Твой мессенджер — твой суверенный торговый шлюз."
      },
      {
        num: "05",
        title: "ПРАГМАТИЗМ ВМЕСТО ДОГМЫ",
        desc: "Приватность в нашем понимании — это не священный грааль, а стандартная утилита. Это гигиена, которая должна быть доступна каждому по умолчанию.\n\nНо мы против догм. Если тебе не нужна маскировка, если в данную секунду на рынке идет бешеная битва за мемкоин и тебе важна только чистая, naked-скорость Solana — ты отключаешь Jito и STELS-маршруты в два клика. Ты снимаешь с транзакции всю обфускацию и получаешь сверхскоростной, удобный терминал для прямой торговли в сети.\n\nМы даем тебе инструмент. Как им управлять — решаешь только ты."
      }
    ]
  }
};

export default function Manifesto({ lang: propLang }: ManifestoProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const content = manifestoContent[lang];

  const [activeSection, setActiveSection] = React.useState("01");

  React.useEffect(() => {
    const handleScroll = () => {
      let currentSection = "01";
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of content.sections) {
        const el = document.getElementById(`sect-${section.num}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = section.num;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content.sections]);

  const scrollToSection = (num: string) => {
    const el = document.getElementById(`sect-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] pt-32 pb-24 px-6 font-sans relative overflow-hidden">
      {/* Decorative dot grid background for the vertical right navigation */}
      <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-48 h-80 pointer-events-none opacity-20 -z-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Vertical Interactive Navigation */}
      <div className="hidden xl:flex fixed right-12 top-1/2 -translate-y-1/2 flex-col items-end gap-7 z-40">
        {content.sections.map((sect) => {
          const isActive = activeSection === sect.num;
          return (
            <button
              key={sect.num}
              onClick={() => scrollToSection(sect.num)}
              className="group flex items-center gap-4 focus:outline-none cursor-pointer"
            >
              {/* Text Label on the left - visible when active, or on hover */}
              <span
                className={`font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                  isActive
                    ? "opacity-100 translate-x-0 text-[#E5D9C4]"
                    : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-stone-400"
                }`}
              >
                {sect.title}
              </span>

              {/* Dot on the right */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {isActive ? (
                  <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_3px_rgba(255,255,255,0.5)] z-10" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-stone-700 group-hover:bg-stone-400 group-hover:scale-125 transition-all duration-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Flat Rows of Manifesto */}
        <div className="flex flex-col border-t border-[#121212]">
          {content.sections.map((section, idx) => (
            <motion.div
              key={idx}
              id={`sect-${section.num}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-[#121212] py-8 md:py-10 scroll-mt-24"
            >
              {/* Header block with 01 // TITLE */}
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[#E5D9C4] font-mono text-xs tracking-[0.25em] font-light min-w-[2rem] sm:min-w-[2.5rem]">
                  {section.num}
                </span>
                <span className="text-[#E5D9C4]/40 font-mono text-xs tracking-[0.25em] font-light mx-1">
                  //
                </span>
                <h3 className="font-sans text-white text-lg sm:text-xl font-light tracking-[0.08em] uppercase">
                  {section.title}
                </h3>
              </div>

              {/* Text Description */}
              <div className="pl-0 sm:pl-[4.5rem] pt-6">
                <p className="font-sans text-stone-400 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {section.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote Signature Back */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-32 pt-16 flex flex-col items-center justify-center text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-[#52525B] uppercase font-light mb-3">
              {content.closing}
            </span>
            <span className="font-sans text-xs sm:text-base tracking-[0.45em] text-[#E5D9C4] uppercase font-light">
              {content.motto}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
