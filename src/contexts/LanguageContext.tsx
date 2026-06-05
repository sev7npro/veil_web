import React, { createContext, useContext, useState } from "react";

type Language = "EN" | "RU";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("veil-lang");
    if (saved === "EN" || saved === "RU") return saved;
    const browserLang = navigator.language.split("-")[0].toUpperCase();
    return browserLang === "RU" ? "RU" : "EN";
  });

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    localStorage.setItem("veil-lang", nextLang);
  };

  const toggleLanguage = () => {
    setLang(lang === "EN" ? "RU" : "EN");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
