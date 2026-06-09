import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import HeroSection from "../components/HeroSection";
import AdvantagesSection from "../components/AdvantagesSection";
import VeilStackSection from "../components/VeilStackSection";
import VeilStatsSection from "../components/VeilStatsSection";
import PrivacyFirstSection from "../components/PrivacyFirstSection";
import VeilManifesto from "../components/VeilManifesto";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

interface HomeProps {
  isPreloaded: boolean;
}

export default function Home({ isPreloaded }: HomeProps) {
  const { lang } = useLanguage();

  const metadata = React.useMemo(() => {
    if (lang === "RU") {
      return {
        title: "VEIL — Бесшумное исполнение. Мгновенный контроль.",
        description: "Некастодиальный, приватный, высокопроизводительный торговый терминал с защитой от MEV на Solana."
      };
    }
    return {
      title: "VEIL — Infinite Silence. Instant Control.",
      description: "A non-custodial, private, high-performance MEV-protected trading terminal built on Solana."
    };
  }, [lang]);

  useDocumentMetadata(metadata);

  return (
    <div className="relative w-full bg-[#050505] overflow-x-hidden">
      {/* Module 1: Hero Section with cryptographic cyber lines & ticker logos */}
      <HeroSection isPreloaded={isPreloaded} />

      {/* Module 2: High-Fidelity Private Terminal Mockup section on scroll */}
      <AdvantagesSection lang={lang} />

      {/* Module 3: The VEIL Stack Isometric Architecture Section */}
      <VeilStackSection lang={lang} />

      {/* Dynamic Quiet Luxury Stats Block */}
      <VeilStatsSection lang={lang} />

      {/* Module 4: Privacy First Interactive Contour Flow Section */}
      <PrivacyFirstSection lang={lang} />

      {/* Module 5: CTA Manifesto Section */}
      <VeilManifesto lang={lang} />
    </div>
  );
}
