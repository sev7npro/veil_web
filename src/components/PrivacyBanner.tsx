import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

interface PrivacyBannerProps {
  lang: "EN" | "RU";
  triggerShow: boolean;
}

export default function PrivacyBanner({ lang, triggerShow }: PrivacyBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = lang === "RU" ? ru.privacyBanner : en.privacyBanner;

  useEffect(() => {
    if (triggerShow) {
      // Show exactly 3 seconds after the Hero has appeared to respect the user's sequential visual flow.
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [triggerShow]);

  const handleAccept = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[100] w-[calc(100%-3rem)] md:w-full max-w-sm"
        >
          <div className="bg-[#0D0D10]/95 border border-[#EDEAE2]/10 rounded-2xl p-5 md:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl relative overflow-hidden flex flex-col gap-4">
            {/* Top sleek accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EAE2D0]/20 to-transparent" />
            
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAE2D0] animate-pulse" />
                <h3 className="text-[#EDEAE2] font-sans font-medium text-[10px] tracking-[0.16em] uppercase">
                  {t.title}
                </h3>
              </div>

              <p className="text-stone-400 font-sans font-light text-[11px] md:text-[12px] leading-relaxed select-none">
                {t.desc}
              </p>
            </div>

            <button
              onClick={handleAccept}
              className="w-full flex items-center justify-center h-[38px] md:h-[42px] rounded-full bg-[#EAE2D0] hover:bg-[#F5F1E6] text-[#0A0A0C] font-sans uppercase text-[10px] md:text-[11px] tracking-[0.16em] font-semibold transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(234,226,208,0.25)] active:scale-[0.98] outline-none focus:outline-none cursor-pointer text-center"
            >
              {t.button}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
