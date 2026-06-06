import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import VeilLinesLogo from "./VeilLinesLogo";

interface NavbarProps {
  lang?: "EN" | "RU";
  onChangeLang?: () => void;
  currentPage?: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS" | "MANIFESTO";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS" | "MANIFESTO",
  ) => void;
  isPreloaded?: boolean;
}

export default function Navbar({
  lang: propLang,
  onChangeLang,
  currentPage: propCurrentPage,
  onNavigate,
  isPreloaded = false,
}: NavbarProps) {
  const { lang: contextLang, toggleLanguage } = useLanguage();
  const lang = propLang || contextLang;
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const currentPageCode = 
    currentPath === "/" ? "HOME" :
    currentPath === "/docs" ? "DOCS" :
    currentPath === "/faq" ? "FAQ" :
    currentPath === "/roadmap" ? "ROADMAP" :
    currentPath === "/terms" ? "TERMS" :
    currentPath === "/privacy" ? "PRIVACY" :
    currentPath === "/risks" ? "RISKS" :
    currentPath === "/manifesto" ? "MANIFESTO" : "HOME";

  const currentPage = propCurrentPage || currentPageCode;
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={isPreloaded ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 0, y: -20, x: "-50%" }}
      transition={{
        delay: 0.4,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="fixed top-[12px] sm:top-[20px] left-1/2 z-100 flex items-center justify-between h-11 sm:h-12 px-2 sm:px-3 pl-4 sm:pl-6 rounded-full transition-all duration-400 font-sans w-[calc(100%-16px)] sm:w-[calc(100%-32px)]"
      style={{
        maxWidth: "1140px",
        minWidth: "280px",
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.94)"
          : "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: scrolled
          ? "1px solid rgba(0, 0, 0, 0.12)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow:
          "0 10px 30px -10px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
      id="veil-floating-navbar"
    >
      {/* Centering on widescreen sizes, so we ensure minimum 680px for layout width logic on md devices */}
      <div className="absolute inset-0 rounded-full pointer-events-none md:min-w-[680px]" />

      {/* Left Side: Wordmark + Logo */}
      <div
        className="flex items-center gap-2 sm:gap-3 relative z-10 cursor-pointer"
        onClick={() => (onNavigate ? onNavigate("HOME") : navigate("/"))}
      >
        <span
          className="font-serif text-sm sm:text-base md:text-lg font-normal tracking-[0.35em] text-[#0A0A0C] select-none"
          style={{ marginRight: "-0.35em" }} // offsets trailing tracking margin
        >
          VEIL
        </span>
        <div
          className="w-6 h-6 sm:w-9 sm:h-9 flex items-center justify-center shrink-0"
          id="navbar-logo-wrapper"
        >
          <VeilLinesLogo
            className="w-full h-full"
            lineColor="#0A0A0C"
            bgMode="transparent"
            strokeWidth={18}
            isStatic={true}
          />
        </div>
      </div>

      {/* Right Side: Navigation links + Language Selector + Mini Call to Action */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 relative z-10">
        {/* Nav links (text only, hover coloring transition) - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-4 md:gap-5">
          <span
            onClick={() => (onNavigate ? onNavigate("FAQ") : navigate("/faq"))}
            className={`text-[11px] md:text-[13px] font-medium tracking-[0.12em] transition-colors duration-250 uppercase cursor-pointer ${
              currentPage === "FAQ"
                ? "text-[#0A0A0C]"
                : "text-[#65635F] hover:text-[#0A0A0C]"
            }`}
          >
            FAQ
          </span>
          <span
            onClick={() => (onNavigate ? onNavigate("ROADMAP") : navigate("/roadmap"))}
            className={`text-[11px] md:text-[13px] font-medium tracking-[0.12em] transition-colors duration-250 uppercase cursor-pointer ${
              currentPage === "ROADMAP"
                ? "text-[#0A0A0C]"
                : "text-[#65635F] hover:text-[#0A0A0C]"
            }`}
          >
            ROADMAP
          </span>
        </div>

        {/* Planet Language Toggler (Icon Only, No EN/RU label) - Hidden on mobile */}
        <button
          onClick={onChangeLang || toggleLanguage}
          className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[rgba(10,10,12,0.12)] hover:border-[rgba(10,10,12,0.25)] hover:bg-[rgba(10,10,12,0.04)] text-[#0A0A0C] transition-all duration-250 cursor-pointer"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-[#0A0A0C]" />
        </button>

        {/* Mobile menu trigger - Only on mobile */}
        <button
          ref={triggerRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full text-[#0A0A0C] transition-all duration-250 cursor-pointer -mr-1"
          title="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-[#0A0A0C]" />
          ) : (
            <Menu className="w-5 h-5 text-[#0A0A0C]" />
          )}
        </button>

        {/* "Launch App" Mini Action Button (inert for now as requested) - Hidden on mobile */}
        <button
          onClick={() => window.open("https://t.me/veilstels_bot", "_blank")}
          className="hidden sm:flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 md:px-5 rounded-full bg-[#0A0A0C] opacity-90 text-[#EDEAE2] font-semibold text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
          id="nav-btn-launch"
        >
          LAUNCH
        </button>
      </div>

      {/* Mobile navigation overlay menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[52px] left-[4px] right-[4px] z-50 flex flex-col gap-3 p-5 rounded-2xl bg-white/95 border border-[rgba(0,0,0,0.1)] shadow-[0_15px_35px_-5px_rgba(0,0,0,0.18)] backdrop-blur-lg text-left"
          >
            <div className="flex flex-col gap-1.5 font-sans font-medium text-[12px] tracking-[0.15em] text-[#65635F]">
              <span
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate ? onNavigate("FAQ") : navigate("/faq");
                }}
                className={`py-2 px-1 border-b border-stone-100 uppercase cursor-pointer ${
                  currentPage === "FAQ" ? "text-[#0A0A0C]" : ""
                }`}
              >
                FAQ
              </span>
              <span
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate ? onNavigate("ROADMAP") : navigate("/roadmap");
                }}
                className={`py-2 px-1 border-b border-stone-100 uppercase cursor-pointer ${
                  currentPage === "ROADMAP" ? "text-[#0A0A0C]" : ""
                }`}
              >
                ROADMAP
              </span>
              <span
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/docs");
                }}
                className={`py-2 px-1 border-b border-stone-100 uppercase cursor-pointer ${
                  currentPage === "DOCS" ? "text-[#0A0A0C]" : ""
                }`}
              >
                DOCUMENTATION
              </span>
            </div>

            {/* Language toggle row in mobile menu */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                {lang === "RU" ? "Язык" : "Language"}
              </span>
              <button
                onClick={() => {
                  onChangeLang ? onChangeLang() : toggleLanguage();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 text-[#0A0A0C] text-[10px] sm:text-[11px] font-bold"
              >
                <Globe className="w-3 h-3" />
                {lang === "RU" ? "РУССКИЙ" : "ENGLISH"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
