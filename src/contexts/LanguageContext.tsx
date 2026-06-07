import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { translations, TranslationSchema } from "../locales/i18n";

type Language = "EN" | "RU";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LanguageActionContext = createContext<{ setLang: (lang: Language) => void; toggleLanguage: () => void } | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("veil-lang");
    if (saved === "EN" || saved === "RU") return saved;
    return "EN";
  });

  const setLang = useCallback((nextLang: Language) => {
    setLangState(nextLang);
    localStorage.setItem("veil-lang", nextLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "EN" ? "RU" : "EN";
      localStorage.setItem("veil-lang", next);
      return next;
    });
  }, []);

  const t = useMemo(() => translations[lang], [lang]);

  // Shield static layout nodes using stable state and action bundles
  const stateValue = useMemo(() => ({ lang, setLang, toggleLanguage, t }), [lang, setLang, toggleLanguage, t]);
  const actionValue = useMemo(() => ({ setLang, toggleLanguage }), [setLang, toggleLanguage]);

  return (
    <LanguageActionContext.Provider value={actionValue}>
      <LanguageContext.Provider value={stateValue}>
        {children}
      </LanguageContext.Provider>
    </LanguageActionContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const useLanguageActions = () => {
  const context = useContext(LanguageActionContext);
  if (context === undefined) {
    throw new Error("useLanguageActions must be used within a LanguageProvider");
  }
  return context;
};
