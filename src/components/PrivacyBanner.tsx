import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface PrivacyBannerProps {
  lang?: "EN" | "RU";
  triggerShow: boolean;
}

export default function PrivacyBanner({ lang, triggerShow }: PrivacyBannerProps = { triggerShow: false }) {
  const [isVisible, setIsVisible] = useState(false);
  const { t: translationsDict } = useLanguage();
  const t = translationsDict.privacyBanner;

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
           <div className="bg-[#050505]/98 border border-[#A89276]/30 rounded-xl p-5 md:p-6 shadow-[0_24px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl relative overflow-hidden flex flex-col gap-4">
             {/* Subtle bronze-gold top gradient strip */}
             <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#A89276]/40 to-transparent" />
             
             <div>
               <div className="flex items-center gap-2 mb-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#A89276] animate-pulse" />
                 <h3 className="text-[#EDEAE2] font-mono font-medium text-[10px] md:text-[11px] tracking-[0.18em] uppercase">
                   {t.title}
                 </h3>
               </div>

               <p className="text-[#EDEAE2]/70 font-sans font-light text-[11px] md:text-[12.5px] leading-relaxed select-none">
                 {t.desc}
               </p>
             </div>

             <button
               onClick={handleAccept}
               className="w-full flex items-center justify-center h-[38px] md:h-[42px] rounded-lg bg-[#EDEAE2] hover:bg-[#FFFFFF] text-[#050505] font-mono uppercase text-[10.5px] md:text-[11.5px] tracking-[0.2em] font-medium transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(168,146,118,0.25)] active:scale-[0.98] outline-none focus:outline-none cursor-pointer text-center"
             >
               {t.button}
             </button>
           </div>
         </motion.div>
       )}
    </AnimatePresence>
  );
}
