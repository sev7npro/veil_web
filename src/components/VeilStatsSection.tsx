import React from "react";
import { motion } from "motion/react";

interface VeilStatsSectionProps {
  lang?: "EN" | "RU";
}

export default function VeilStatsSection({ lang = "EN" }: VeilStatsSectionProps) {
  const t = {
    EN: [
      {
        value: "< 400 ms",
        subtext: "EXECUTION SPEED // JITO PRIVATE ROUTE",
      },
      {
        value: "0.00%",
        subtext: "MEMPOOL EXPOSURE // SANDWICH PROTECTION",
      },
      {
        value: "0 bytes",
        subtext: "IP & METADATA LOGS // ZERO-TRACE STATUS",
      },
      {
        value: "None",
        subtext: "BACKDOORS // ARGON2ID STORAGE",
      },
    ],
    RU: [
      {
        value: "< 400 мс",
        subtext: "СКОРОСТЬ ИСПОЛНЕНИЯ // ПРИВАТНЫЙ МАРШРУТ JITO",
      },
      {
        value: "0.00%",
        subtext: "ЭКСПОЗИЦИЯ МЕМПУЛА // ЗАЩИТА ОТ СЭНДВИЧЕЙ",
      },
      {
        value: "0 байт",
        subtext: "ЛОГИ IP И МЕТАДАННЫХ // СТАТУС НУЛЕВОГО СЛЕДА",
      },
      {
        value: "Нет",
        subtext: "БЭКДОРЫ // ХРАНЕНИЕ ARGON2ID",
      },
    ],
  }[lang] || { EN: [] };

  const stats = Array.isArray(t) ? t : [];

  return (
    <section 
      id="veil-stats-section"
      className="relative w-full bg-[#050505] py-8 md:py-24 select-none text-center z-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-7 md:gap-0">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col-reverse md:flex-col items-center justify-center px-4 md:px-6 relative group ${
                idx > 0 ? "md:border-l md:border-white/[0.08]" : ""
              }`}
            >
              {/* Subtle accent hover glow behind the main metric */}
              <div className="absolute inset-0 bg-radial from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />

              {/* Stat Value */}
              <div 
                className="font-sans font-extralight text-[#EDEAE2] tracking-normal mt-1 md:mt-0 md:mb-3 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(192,132,252,0.3)] text-2xl sm:text-3xl md:text-[clamp(34px,_4vw,_56px)]"
                style={{
                  lineHeight: "1.1",
                }}
              >
                {stat.value}
              </div>

              {/* Subtext description */}
              <div 
                className="font-mono text-[9px] md:text-[10px] text-white/40 md:text-[#9088B0]/60 tracking-[0.12em] uppercase text-center leading-relaxed transition-colors duration-300 group-hover:text-[#C084FC]/80 max-w-[260px]"
              >
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
