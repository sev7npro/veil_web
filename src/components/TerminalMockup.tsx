import React from "react";
import { motion } from "motion/react";
import VeilLinesLogo from "./VeilLinesLogo";
// @ts-ignore
import terminalScreenshot from "../public/terminal.png";
import { useLanguage } from "../contexts/LanguageContext";

interface TerminalMockupProps {
  lang?: "EN" | "RU";
}

export default function TerminalMockup({ lang: propLang }: TerminalMockupProps) {
  const { lang: contextLang, t: translationsDict } = useLanguage();
  const lang = propLang || contextLang;
  const t = translationsDict.terminal;
  const [imageFailed, setImageFailed] = React.useState(false);
  const screenshotUrl = terminalScreenshot;

  // Generate high fidelity candle series matching the user's screenshot range from $81.50 to $83.50
  const candles = React.useMemo(() => {
    // Dynamic dense sequence resembling the target screenshot ending at 82.67
    const shape = [
      82.45, 82.1, 82.3, 82.2, 82.4, 81.9, 81.85, 81.9, 81.7, 81.6, 81.8, 81.5,
      81.65, 81.4, 81.6, 81.85, 81.95, 82.2, 82.05, 82.25, 82.45, 82.55, 82.4,
      82.6, 82.85, 82.95, 82.75, 83.1, 83.3, 83.2, 83.45, 83.1, 82.7, 82.5,
      82.35, 82.2, 81.95, 81.7, 81.85, 82.2, 82.05, 82.35, 82.1, 82.5, 82.4,
      82.6, 82.85, 82.67,
    ];

    const data = [];
    for (let i = 0; i < shape.length; i++) {
      const open = i === 0 ? 82.65 : data[i - 1].close;
      const close = shape[i];
      const isUp = close >= open;

      // Deterministic pseudo-randomness for wicks and volumes based on index
      const seed1 = Math.abs(Math.sin(i * 1.5));
      const seed2 = Math.abs(Math.cos(i * 2.1));

      const fluctuation1 = 0.04 + seed1 * 0.1;
      const fluctuation2 = 0.04 + seed2 * 0.1;

      const high = Math.max(open, close) + fluctuation1;
      const low = Math.min(open, close) - fluctuation2;

      let volumeBase = 15;
      if (Math.abs(close - open) > 0.2) volumeBase += 35;
      if (i === 7 || i === 28 || i === 37) volumeBase += 45; // Spikes

      data.push({
        open,
        close,
        high,
        low,
        isUp,
        volume: volumeBase + seed1 * 25,
      });
    }

    return data;
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  if (!imageFailed) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-[#EDEAE2]/10 shadow-[0_32px_80px_rgba(0,0,0,0.9),_0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 min-h-[300px]">
        <picture>
          {/* Optimistic high-performance fallbacks for responsive asset loaders */}
          <source srcSet={screenshotUrl} type="image/png" />
          <img
            src={screenshotUrl}
            onError={() => setImageFailed(true)}
            className="w-full h-auto block select-none"
            alt="VEIL Terminal Mockup"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </picture>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0A0D0C] border border-[#2A1B4E]/30 shadow-[0_32px_80px_rgba(0,0,0,0.9),_0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
      <div className="relative w-full aspect-[9/16] max-h-[490px] overflow-hidden flex flex-col font-sans bg-[#0A0D0C]">
        {/* Top Header / Stats Bar */}
        <div className="flex-none h-12 border-b border-white/[0.06] flex items-center justify-between px-4">
          {/* Left Stats */}
          <motion.div
            className="flex items-center gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-[9px] text-stone-400 font-medium tracking-wider mb-0.5">
                {t.vol}
              </span>
              <span className="text-xs text-stone-100 font-mono font-medium">
                $24.5M
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-[9px] text-stone-400 font-medium tracking-wider mb-0.5">
                {t.high}
              </span>
              <span className="text-xs text-[#14F195] font-mono font-semibold">
                83.45
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-[9px] text-stone-400 font-medium tracking-wider mb-0.5">
                {t.low}
              </span>
              <span className="text-xs text-[#F43F5E] font-mono font-semibold">
                81.40
              </span>
            </motion.div>
          </motion.div>

          {/* Right Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 opacity-80 text-stone-200"
          >
            <div className="w-4 h-4 rounded text-stone-200 flex items-center justify-center">
              <VeilLinesLogo />
            </div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-stone-200">
              VEIL
            </span>
          </motion.div>
        </div>

        {/* Main Chart Area */}
        <div className="flex-1 relative w-full pt-4 pb-2 px-2">
          {/* Live Price Indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute right-0 bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] px-2 py-0.5 text-[10px] font-mono rounded-l-sm backdrop-blur-sm z-20 flex items-center gap-1.5"
            style={{ top: `calc(${(83.75 - 82.67) * 40}% - 7px)` }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A78BFA] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#A78BFA]"></span>
            </span>
            82.67
          </motion.div>

          <div className="absolute right-1 top-0 bottom-0 w-10 pointer-events-none z-10 text-[8px] font-mono text-stone-400 text-right">
            <span style={{ position: "absolute", top: "calc(10% - 6px)", right: 0 }}>83.50</span>
            <span style={{ position: "absolute", top: "calc(30% - 6px)", right: 0 }}>83.00</span>
            <span style={{ position: "absolute", top: "calc(50% - 6px)", right: 0 }}>82.50</span>
            <span style={{ position: "absolute", top: "calc(70% - 6px)", right: 0 }}>82.00</span>
            <span style={{ position: "absolute", top: "calc(90% - 6px)", right: 0 }}>81.50</span>
            {/* User's screenshot target marker */}
            <span
               style={{ position: "absolute", top: `calc(${(83.75 - 82.67) * 40}% - 7px)`, right: 0 }}
               className="bg-[#8B5CF6] text-white px-1 py-0.5 rounded-sm z-20 font-medium"
            >
              82.67
            </span>
          </div>

          <div className="absolute inset-y-1 left-2 right-12 z-0">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {(() => {
                const mapPriceToY = (val: number) => {
                  return (83.75 - val) * 40;
                };

                return (
                  <>
                    {/* Horizontal Grid lines aligned to prices */}
                    <line x1="0%" y1="10%" x2="100%" y2="10%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0%" y1="90%" x2="100%" y2="90%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    
                    {/* Dashed Indicator Line for Current Price 82.67 */}
                    <line x1="0%" y1={`${mapPriceToY(82.67)}%`} x2="100%" y2={`${mapPriceToY(82.67)}%`} stroke="#00A875" strokeWidth="1" strokeDasharray="3 3" opacity={0.6} />

                    {/* Z-Index 1: Volume Bars */}
                    {candles.map((candle, idx) => {
                      const candleWidthFactor = 100 / candles.length;
                      const left = `${idx * candleWidthFactor + candleWidthFactor * 0.1}%`;
                      const width = `${candleWidthFactor * 0.8}%`;
                      const volumeHeightStr = `${candle.volume * 0.15}%`;
                      const volumeYStr = `${100 - candle.volume * 0.15}%`;

                      const volumeFillColor = candle.isUp
                        ? "rgba(0, 168, 117, 0.3)"
                        : "rgba(224, 79, 79, 0.3)";

                      return (
                        <motion.rect
                          key={`vol-${idx}`}
                          x={left}
                          y={volumeYStr}
                          width={width}
                          height={volumeHeightStr}
                          fill={volumeFillColor}
                          rx="0.25"
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.15 + idx * 0.02,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{ originY: "100%" }}
                        />
                      );
                    })}

                    {/* Z-Index 2: Candlesticks */}
                    {candles.map((candle, idx) => {
                      const candleWidthFactor = 100 / candles.length;
                      const left = `${idx * candleWidthFactor + candleWidthFactor * 0.1}%`;
                      const width = `${candleWidthFactor * 0.8}%`;
                      const centerOfCandle = `${idx * candleWidthFactor + candleWidthFactor * 0.5}%`;

                      const openY = `${mapPriceToY(candle.open)}%`;
                      const closeY = `${mapPriceToY(candle.close)}%`;
                      const highY = `${mapPriceToY(candle.high)}%`;
                      const lowY = `${mapPriceToY(candle.low)}%`;
                      
                      const heightVal = Math.abs(mapPriceToY(candle.close) - mapPriceToY(candle.open));
                      const heightStr = `${Math.max(0.5, heightVal)}%`;
                      
                      // Prevent 0 height rects from breaking rendering or looking invisible
                      const rectY = candle.isUp ? closeY : openY;

                      const fillColor = candle.isUp ? "#00A875" : "#E04F4F";

                      return (
                        <motion.g
                          key={`candle-${idx}`}
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.15 + idx * 0.02,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{ originY: "100%" }}
                        >
                          {/* Candle Wick (High & Low line) */}
                          <line
                            x1={centerOfCandle}
                            y1={highY}
                            x2={centerOfCandle}
                            y2={lowY}
                            stroke={fillColor}
                            strokeWidth="1.0"
                            opacity={0.9}
                          />
                          {/* Candlestick Body */}
                          <rect
                            x={left}
                            y={rectY}
                            width={width}
                            height={heightStr}
                            fill={fillColor}
                            rx="0.5"
                            className="transition-colors duration-200"
                          />
                        </motion.g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
