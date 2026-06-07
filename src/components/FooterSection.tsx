import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import VeilLinesLogo from "./VeilLinesLogo";

interface FooterSectionProps {
  lang?: "EN" | "RU";
  onNavigate?: (
    page: "HOME" | "DOCS" | "FAQ" | "ROADMAP" | "TERMS" | "PRIVACY" | "RISKS",
  ) => void;
}

export default function FooterSection({
  lang: propLang,
  onNavigate,
}: FooterSectionProps) {
  const { lang: contextLang, t: translationsDict } = useLanguage();
  const lang = propLang || contextLang;
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const t = translationsDict.footer;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] flex flex-col justify-end overflow-hidden select-none"
    >
      {/* LOWER PART — BOTTOM FOOTER STRIP */}
      <div className="relative w-full flex flex-col justify-end bg-[#050505]">
        {/* Giant Logo "VEIL" */}
        <div
          ref={logoRef}
          className={`relative w-full overflow-hidden select-none pointer-events-none transition-all duration-[1800ms] ease-out-quint ${
            isInView
              ? "opacity-100 translate-y-0 filter blur-0"
              : "opacity-0 translate-y-[50px] filter blur-[4px]"
          }`}
          style={{
            lineHeight: "0.85",
            marginBottom: "-0.02em", // Pulls bottom of letters under the footer strip
          }}
        >
          {/* Giant serif display style mirroring the Hyperliquid example but beautifully customized to VEIL */}
          <div
            className="font-serif italic font-light text-[28vw] md:text-[22vw] text-left text-white/[0.03] py-0 tracking-[-0.04em] flex items-center gap-[5vw] md:gap-[4vw]"
            style={{
              paddingLeft: "4vw",
              animation: isInView
                ? "veilLetterBreathe 10s ease-in-out infinite"
                : "none",
              willChange: "transform, letter-spacing",
            }}
          >
            <span>VEIL</span>
            <div
              className="w-[28vw] h-[28vw] md:w-[22vw] md:h-[22vw] flex items-center justify-center shrink-0"
              id="footer-logo-wrapper"
            >
              <VeilLinesLogo
                className="w-full h-full"
                lineColor="currentColor"
                bgMode="transparent"
                strokeWidth={11}
              />
            </div>
          </div>
        </div>

        {/* FOOTER STRIP CONTAINER (Deep dark premium background, elegant spacing exactly matching mockup) */}
        <div className="relative z-10 w-full bg-[#050505] pt-14 pb-12 px-6 md:px-14 lg:px-20 flex flex-col gap-8">
          {/* Row 1: Social Icons (compact, perfectly aligned on the right) */}
          <div className="flex justify-end items-center gap-7 pb-2">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-[#EDEAE2] transition-all duration-300"
              title="X"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-[#EDEAE2] transition-all duration-300"
              title="Discord"
            >
              <svg
                viewBox="0 0 127.14 96.36"
                className="w-[20px] h-[16px] fill-current"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.71-1.32,2.5-2a75.52,75.52,0,0,0,73,0c.79.68,1.63,1.36,2.5,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.92,50.12,123.83,27.27,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-[#EDEAE2] transition-all duration-300"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-current"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://t.me/veilstels_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-[#EDEAE2] transition-all duration-300"
              title="Telegram"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-current"
              >
                <path d="M21.82 2.2a1 1 0 0 0-1.07-.16l-18.5 7a1 1 0 0 0-.1 1.8l4.8 1.5 11-7.2c.1-.06.2.05.14.14l-8.9 8.1v4c0 .6.8.9 1.2.4l2.4-2.4 4.7 3.5a1 1 0 0 0 1.6-.6l3.5-17.5a1 1 0 0 0-.34-.94z" />
              </svg>
            </a>
          </div>

          {/* Row 2: Links row formatted in centered items */}
          <div className="flex flex-col items-center justify-center w-full text-[10.5px] font-sans font-medium text-stone-500 tracking-[0.12em] transition-all duration-300 gap-y-5">
            {/* Desktop-Only Links Row */}
            <div className="hidden md:flex items-center justify-center gap-x-10">
              <button
                onClick={() => (onNavigate ? onNavigate("TERMS") : navigate("/terms"))}
                className="hover:text-[#EDEAE2] transition-colors duration-300 uppercase focus:outline-none cursor-pointer"
              >
                {t.terms}
              </button>
              <button
                onClick={() => (onNavigate ? onNavigate("PRIVACY") : navigate("/privacy"))}
                className="hover:text-[#EDEAE2] transition-colors duration-300 uppercase focus:outline-none cursor-pointer"
              >
                {t.privacy}
              </button>
              <button
                onClick={() => (onNavigate ? onNavigate("RISKS") : navigate("/risks"))}
                className="hover:text-[#EDEAE2] transition-colors duration-300 uppercase focus:outline-none cursor-pointer"
              >
                {t.risks}
              </button>
            </div>

            {/* Desktop-Only Copyright */}
            <div className="hidden md:block font-mono font-bold text-stone-500 text-[10.5px] select-all tracking-[0.2em] uppercase">
              2026 // PROTOCOL CONTENT
            </div>

            {/* Mobile-Only Structured Layout */}
            <div className="flex md:hidden flex-col items-center gap-5 text-center w-full">
              <div className="flex flex-col gap-4 text-[10px] text-stone-400 font-semibold tracking-[0.16em]">
                <button
                  onClick={() => (onNavigate ? onNavigate("TERMS") : navigate("/terms"))}
                  className="hover:text-[#EDEAE2] active:text-[#EDEAE2] transition-colors duration-200 uppercase outline-none"
                >
                  {t.terms}
                </button>
                <button
                  onClick={() => (onNavigate ? onNavigate("PRIVACY") : navigate("/privacy"))}
                  className="hover:text-[#EDEAE2] active:text-[#EDEAE2] transition-colors duration-200 uppercase outline-none"
                >
                  {t.privacy}
                </button>
                <button
                  onClick={() => (onNavigate ? onNavigate("RISKS") : navigate("/risks"))}
                  className="hover:text-[#EDEAE2] active:text-[#EDEAE2] transition-colors duration-200 uppercase outline-none"
                >
                  {t.risks}
                </button>
              </div>

              <div className="font-mono font-bold text-stone-500 text-[10.5px] mt-2 select-all tracking-[0.2em] uppercase">
                2026 // PROTOCOL CONTENT
              </div>
            </div>
          </div>

          {/* Disclaimer Row */}
          <div className="w-full text-center mt-2 border-t border-white/[0.03] pt-6 pb-2">
            <p className="font-sans text-[7px] md:text-[10px] text-stone-600 font-light leading-relaxed max-w-4xl mx-auto uppercase tracking-wider">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
