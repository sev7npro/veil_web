import React from "react";
import { motion } from "motion/react";
import TerminalMockup from "./TerminalMockup";

interface AdvantagesSectionProps {
  lang?: "EN" | "RU";
}

export default function AdvantagesSection({
  lang = "EN",
}: AdvantagesSectionProps) {
  const t = {
    EN: {
      adv1_title: "Zero MEV",
      adv1_desc:
        "Your orders are fully protected from front-running and sandwich attacks. Execute with confidence.",
      adv2_title: "Non-Custodial",
      adv2_desc:
        "Your keys, your assets. VEIL is a fully self-custodial terminal. Your secure wallets are generated and encrypted locally on your device. We never hold your funds",
      adv3_title: "Silent Routing",
      adv3_desc:
        "Intelligent order routing across Solana liquidity. Maximum fill, minimum slippage, zero noise.",
      adv4_title: "Instant Execution",
      adv4_desc:
        "Sub-400ms execution on Solana. No waiting, no delays. Your edge is preserved every trade.",
    },
    RU: {
      adv1_title: "Нулевой MEV",
      adv1_desc:
        "Ваши ордера полностью защищены от опережающих сделок (front-running) и сэндвич-атак. Торгуйте уверенно.",
      adv2_title: "Некастодиальный",
      adv2_desc:
        "Ваши ключи — ваши активы. VEIL — это полностью некастодиальный терминал. Ваши защищенные кошельки генерируются и шифруются локально на вашем устройстве. Мы никогда не храним ваши средства.",
      adv3_title: "Бесшумный роутинг",
      adv3_desc:
        "Умная маршрутизация ордеров по всей ликвидности Solana. Максимальное исполнение, минимальное проскальзывание, ноль шума.",
      adv4_title: "Мгновенное исполнение",
      adv4_desc:
        "Исполнение менее 400 мс на Solana. Никакого ожидания, никаких задержек. Преимущество сохраняется в каждой сделке.",
    },
  }[lang];

  return (
    <section
      className="relative w-full bg-[#FFFFFF] border-t border-stone-200 select-none text-left z-20 py-16 md:py-[120px]"
      id="advantages-module"
    >
      <div className="w-full flex flex-col justify-center items-center overflow-hidden">
        {/* 1. Header Area with fade-in motion trigger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full text-center px-6 mb-8 md:mb-[64px]"
          id="advantages-header"
        >
          {lang === "RU" ? (
            <h2
              className="font-sans font-light text-[#4A4F4C]"
              style={{
                fontSize: "clamp(20px, 2.5vw, 34px)",
                letterSpacing: "0.02em",
              }}
            >
              Приватный терминал: абсолютное{" "}
              <span className="text-[#0E523D] font-medium tracking-wide mx-1">
                бесшумное исполнение
              </span>{" "}
              на дексах
            </h2>
          ) : (
            <h2
              className="font-sans font-light text-[#4A4F4C]"
              style={{
                fontSize: "clamp(20px, 2.5vw, 34px)",
                letterSpacing: "0.02em",
              }}
            >
              The private terminal: absolute{" "}
              <span className="text-[#0E523D] font-medium tracking-wide mx-1">
                silent execution
              </span>{" "}
              exchange
            </h2>
          )}
        </motion.div>

        {/* 2. Responsive advantages grid stack (Static and visible) */}
        <div
          className="grid w-full max-w-[1320px] px-6 lg:px-12 items-center grid-cols-1 md:grid-cols-[1fr_2.2fr_1fr] gap-0 md:gap-12"
          id="advantages-bento-grid"
        >
          {/* Left Column: Advantages 1 & 2 (Right-aligned text) */}
          <div className="flex flex-col gap-0 md:gap-12 text-center md:text-right order-2 md:order-1 items-center md:items-end w-full">
            <div className="max-w-[300px] w-full flex flex-col gap-0 md:gap-12 items-center md:items-end">
              {/* Advantage 1: Zero MEV */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-start md:items-end w-full text-left md:text-right border-t border-b border-[#0E523D]/15 md:border-none py-[14px] px-4 md:px-0 md:py-0 bg-[#8B5CF6]/[0.05] md:bg-transparent"
              >
                {/* SVG Shield icon */}
                <div className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] mt-0.5 md:mt-0 flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 text-[#8B5CF6] md:text-[#0E523D]">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <path
                      d="M20 6L32 10V18C32 25 27 29.5 20 34C13 29.5 8 25 8 18V10L20 6Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#2D1F47] md:text-[#0F1412] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv1_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-[#4A3E5D] md:text-[#424C48] leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv1_desc}
                  </p>
                </div>
              </motion.div>

              {/* Advantage 2: Non-Custodial */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-start md:items-end w-full text-left md:text-right border-b border-[#0E523D]/15 md:border-none py-[14px] px-4 md:px-0 md:py-0 bg-[#8B5CF6]/[0.05] md:bg-transparent"
              >
                {/* SVG Key-like / Lock icon */}
                <div className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] mt-0.5 md:mt-0 flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 text-[#8B5CF6] md:text-[#0E523D]">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <rect
                      x="11"
                      y="18"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 18V13C15 10.24 17.24 8 20 8C22.76 8 25 10.24 25 13V18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="24" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#2D1F47] md:text-[#0F1412] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv2_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-[#4A3E5D] md:text-[#424C48] leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv2_desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Center Column: Interactive Trading mock browser window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 flex justify-center w-full min-w-0 mt-0 mb-8 md:mt-0 md:mb-0"
          >
            <div className="w-full max-w-[155px] md:max-w-[310px]">
              <TerminalMockup lang={lang} />
            </div>
          </motion.div>

          {/* Right Column: Advantages 3 & 4 (Left-aligned text) */}
          <div className="flex flex-col gap-0 md:gap-12 text-center md:text-left order-3 items-center md:items-start w-full">
            <div className="max-w-[300px] w-full flex flex-col gap-0 md:gap-12 items-center md:items-start">
              {/* Advantage 3: Silent Routing */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-start md:items-start w-full text-left border-t border-b border-[#0E523D]/15 md:border-none py-[14px] px-4 md:px-0 md:py-0 bg-[#8B5CF6]/[0.05] md:bg-transparent"
              >
                {/* SVG Flowing Path Lines */}
                <div className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] mt-0.5 md:mt-0 flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 text-[#8B5CF6] md:text-[#0E523D]">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <path
                      d="M10 32C10 26 14 20 20 20C26 20 30 14 30 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 24C10 20 12 16 16 16C22 16 24 10 30 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                    <circle cx="30" cy="8" r="1.5" fill="currentColor" />
                    <circle cx="10" cy="32" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#2D1F47] md:text-[#0F1412] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv3_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-[#4A3E5D] md:text-[#424C48] leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv3_desc}
                  </p>
                </div>
              </motion.div>

              {/* Advantage 4: Instant Execution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="flex flex-row md:flex-col gap-4 items-start md:items-start w-full text-left border-b border-[#0E523D]/15 md:border-none py-[14px] px-4 md:px-0 md:py-0 bg-[#8B5CF6]/[0.05] md:bg-transparent"
              >
                {/* SVG Lightning Bolt icon */}
                <div className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] mt-0.5 md:mt-0 flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 text-[#8B5CF6] md:text-[#0E523D]">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <path
                      d="M23 6L11 22H21L17 34L29 18H19L23 6Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5 md:space-y-2">
                  <h3
                    className="font-serif text-[#2D1F47] md:text-[#0F1412] text-[17px] md:text-[clamp(22px,2.2vw,30px)]"
                    style={{
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.adv4_title}
                  </h3>
                  <p
                    className="font-sans text-[11px] md:text-[13px] text-[#4A3E5D] md:text-[#424C48] leading-[1.5] md:leading-[1.75] tracking-[0.01em] max-w-[280px]"
                    style={{ fontWeight: 300 }}
                  >
                    {t.adv4_desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
