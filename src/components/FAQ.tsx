import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface FAQProps {
  lang?: "EN" | "RU";
}

const faqContent = {
  EN: {
    hero: "FAQ",
    subhero: "FREQUENTLY ASKED QUESTIONS",
    groups: [
      {
        title: "SECURITY & KEYS",
        items: [
          {
            num: "01",
            title: "DO YOU STORE MY PRIVATE KEYS?",
            desc: "No. Never. Your PIN derives your keys locally via Argon2id + HKDF. Only ciphertext and nonce are stored on the server. Without your PIN — it is just encrypted noise.",
          },
          {
            num: "02",
            title: "CAN YOU STEAL MY FUNDS?",
            desc: "After PIN setup — no. Mathematically. We do not have access to your keys. Not technically. Not legally. Not in any way.",
          },
          {
            num: "03",
            title: "WHAT HAPPENS TO KEYS AFTER A TRANSACTION?",
            desc: "Immediately after Ed25519 signing, the key is wiped from RAM via the Zeroize trait. A full memory dump of the server at that moment yields nothing.",
          },
          {
            num: "04",
            title: "WHAT IF YOU GET HACKED?",
            desc: "The attacker gets only encrypted bytes. Without the PIN, decryption is impossible. Your funds stay with you.",
          },
          {
            num: "05",
            title: "WHAT IS A STELS WALLET?",
            desc: "A second wallet inside the terminal. Used as a transit node in Veil Flow. Generated once, for a single operation. Destroyed afterwards. Your main wallet never appears in the final on-chain transaction.",
          },
        ],
      },
      {
        title: "IF SOMETHING GOES WRONG",
        items: [
          {
            num: "06",
            title: "I LOST MY PIN. WHAT DO I DO?",
            desc: "Nothing. Access to funds is lost permanently. No backdoor. No recovery. This is not a flaw — it is the guarantee that no one but you can access them.\n\nWrite your PIN down. Store it offline.",
          },
          {
            num: "07",
            title: "I ACCIDENTALLY RAN /PURGE. CAN THE DATA BE RECOVERED?",
            desc: "No. Purge is irreversible. All keys, operation history, and settings are destroyed. That is exactly how it is supposed to work.",
          },
          {
            num: "08",
            title: "MY TRANSACTION IS STUCK. WHAT SHOULD I DO?",
            desc: "Jito Block Engine operates atomically — either the bundle executes in full or it is cancelled. Stuck transactions do not exist. Funds are not lost. If you see a delay, it is a network issue on Solana's side. Retry the operation.",
          },
          {
            num: "09",
            title: "SOLANA WENT DOWN. ARE MY FUNDS SAFE?",
            desc: "Yes. Your funds are on the blockchain — not with us. A network outage means temporary terminal unavailability. Not asset loss.",
          },
        ],
      },
      {
        title: "HOW IT WORKS",
        items: [
          {
            num: "10",
            title: "WHAT IS MEV AND HOW DOES VEIL PROTECT AGAINST IT?",
            desc: "MEV (Maximal Extractable Value) — bots that see your transaction in the mempool and insert theirs before it. You get a worse price. The bot takes the difference.\n\nVeil routes all orders through Jito Block Engine directly to slot leaders. The public mempool is bypassed entirely. Sandwich attacks are structurally impossible.",
          },
          {
            num: "11",
            title: "WHAT IS VEIL FLOW?",
            desc: "Stealth routing — a mechanism for breaking the on-chain graph. Your amount is split and routed through a series of one-time ephemeral addresses inside a single Jito bundle. Analytics see the transactions. The link between you and the recipient — they do not.",
          },
          {
            num: "12",
            title: "IS THIS LEGAL?",
            desc: "Yes. Transaction privacy is a legitimate right. The protocol must not be used for money laundering, terrorist financing, or sanctions evasion. By using Veil, you confirm that the origin of your assets is lawful.",
          },
        ],
      },
      {
        title: "FEES & PRACTICAL",
        items: [
          {
            num: "13",
            title: "WHAT IS THE FEE?",
            desc: "0.8% of the volume of each operation. Solana network fees and Jito tips are on top, paid separately. No hidden fees.",
          },
          {
            num: "14",
            title: "IS THERE A SUBSCRIPTION FEE?",
            desc: "No. You pay only for operations.",
          },
          {
            num: "15",
            title: "HOW FAST ARE ORDERS EXECUTED?",
            desc: "Via Jito Block Engine — within a single slot. Solana produces a block every ~400 ms.",
          },
          {
            num: "16",
            title: "WHICH ASSETS ARE SUPPORTED?",
            desc: "All tokens on Solana available through Jupiter V6 — SOL, USDC, USDT, and the full long tail of SPL tokens including memecoins.",
          },
          {
            num: "17",
            title: "IS THERE SUPPORT?",
            desc: "Telegram. We respond there. Security questions are priority.",
          },
        ],
      },
    ],
  },
  RU: {
    hero: "FAQ",
    subhero: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
    groups: [
      {
        title: "БЕЗОПАСНОСТЬ И КЛЮЧИ",
        items: [
          {
            num: "01",
            title: "ВЫ ХРАНИТЕ МОИ ПРИВАТНЫЕ КЛЮЧИ?",
            desc: "Нет. Никогда. Ваш PIN-код локально генерирует ключи через Argon2id + HKDF. На сервере хранятся только зашифрованный текст и nonce. Без вашего PIN-кода это просто зашифрованный шум.",
          },
          {
            num: "02",
            title: "ВЫ МОЖЕТЕ УКРАСТЬ МОИ СРЕДСТВА?",
            desc: "После установки PIN-кода — нет. Математически. У нас нет доступа к вашим ключам. Ни технически. Ни юридически. Никаким образом.",
          },
          {
            num: "03",
            title: "ЧТО ПРОИСХОДИТ С КЛЮЧАМИ ПОСЛЕ ТРАНЗАКЦИИ?",
            desc: "Сразу после подписания Ed25519 ключ удаляется из оперативной памяти с помощью Zeroize. Полный дамп памяти сервера в этот момент ничего не даст.",
          },
          {
            num: "04",
            title: "ЧТО ЕСЛИ ВАС ВЗЛОМАЮТ?",
            desc: "Злоумышленник получит только зашифрованные байты. Без PIN-кода расшифровка невозможна. Ваши средства остаются у вас.",
          },
          {
            num: "05",
            title: "ЧТО ТАКОЕ STELS-КОШЕЛЕК?",
            desc: "Второй кошелек внутри терминала. Используется как транзитный узел в Veil Flow. Генерируется один раз для одной операции. Затем уничтожается. Ваш основной кошелек никогда не появляется в финальной ончейн-транзакции.",
          },
        ],
      },
      {
        title: "ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК",
        items: [
          {
            num: "06",
            title: "Я ПОТЕРЯЛ СВОЙ PIN. ЧТО ДЕЛАТЬ?",
            desc: "Ничего. Доступ к средствам утерян навсегда. Нет бэкдора. Нет восстановления. Это не недостаток — это гарантия того, что никто, кроме вас, не сможет получить к ним доступ.\n\nЗапишите свой PIN-код. Храните его офлайн.",
          },
          {
            num: "07",
            title: "Я СЛУЧАЙНО ЗАПУСТИЛ /PURGE. МОЖНО ЛИ ВОССТАНОВИТЬ ДАННЫЕ?",
            desc: "Нет. Purge необратим. Все ключи, история операций и настройки уничтожены. Именно так это и должно работать.",
          },
          {
            num: "08",
            title: "МОЯ ТРАНЗАКЦИЯ ЗАВИСЛА. ЧТО ДЕЛАТЬ?",
            desc: "Jito Block Engine работает атомарно — бандл либо выполняется полностью, либо отменяется. Зависших транзакций не существует. Средства не теряются. Если вы видите задержку, это проблема сети на стороне Solana. Повторите операцию.",
          },
          {
            num: "09",
            title: "СОЛАНА УПАЛА. МOИ СРЕДСТВА В БЕЗОПАСНОСТИ?",
            desc: "Да. Ваши средства в блокчейне — не у нас. Отключение сети означает лишь временную недоступность терминала. А не потерю активов.",
          },
        ],
      },
      {
        title: "КАК ЭТО РАБОТАЕТ",
        items: [
          {
            num: "10",
            title: "ЧТО ТАКОЕ MEV И КАК VEIL ЗАЩИЩАЕТ ОТ НЕГО?",
            desc: "MEV (Maximal Extractable Value) — боты видят вашу транзакцию в мемпуле и вставляют свою перед вашей. Вы получаете худшую цену. Бот забирает разницу.\n\nVeil направляет все ордера через Jito Block Engine напрямую лидерам слотов. Публичный мемпул полностью игноруриется. Сэндвич-атаки структурно невозможны.",
          },
          {
            num: "11",
            title: "ЧТО ТАКОЕ VEIL FLOW?",
            desc: "Скрытая маршрутизация — механизм разрыва ончейн-графа. Ваша сумма разбивается и направляется через серию одноразовых эфемерных адресов внутри одного бандла Jito. Аналитики видят транзакции. Но связи между вами и получателем — нет.",
          },
          {
            num: "12",
            title: "ЭТО ЛЕГАЛЬНО?",
            desc: "Да. Конфиденциальность транзакций — это законное право. Протокол не должен использоваться для отмывания денег, финансирования терроризма или обхода санкций. Используя Veil, вы подтверждаете, что происхождение ваших активов законно.",
          },
        ],
      },
      {
        title: "КОМИССИИ И ПРАКТИКА",
        items: [
          {
            num: "13",
            title: "КАКАЯ КОМИССИЯ?",
            desc: "0.8% от объема каждой операции. Комиссии сети Solana и чаевые Jito добавляются сверху и оплачиваются отдельно. Никаких скрытых комиссий.",
          },
          {
            num: "14",
            title: "ЕСТЬ ЛИ ПЛАТА ЗА ПОДПИСКУ?",
            desc: "Нет. Вы платите только за операции.",
          },
          {
            num: "15",
            title: "КАК БЫСТРО ИСПОЛНЯЮТСЯ ОРДЕРА?",
            desc: "Через Jito Block Engine — в пределах одного слота. Solana производит блок каждые ~400 мс.",
          },
          {
            num: "16",
            title: "КАКИЕ АКТИВЫ ПОДДЕРЖИВАЮТСЯ?",
            desc: "Все токены на Solana, доступные через Jupiter V6 — SOL, USDC, USDT и длинный хвост токенов SPL, включая мемкоины.",
          },
          {
            num: "17",
            title: "ЕСТЬ ЛИ ПОДДЕРЖКА?",
            desc: "Telegram. Мы отвечаем там. Вопросы безопасности в приоритете.",
          },
        ],
      },
    ],
  },
};

export default function FAQ({ lang: propLang }: FAQProps = {}) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang;
  const content = faqContent[lang];

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
