import React from "react";
import { useNavigate } from "react-router-dom";

interface VeilManifestoProps {
  lang: "EN" | "RU";
}

export default function VeilManifesto({ lang }: VeilManifestoProps) {
  const navigate = useNavigate();

  const t = {
    EN: {
      headline: (
        <>
          SOVEREIGNTY IS NOT GIVEN.
          <br className="hidden sm:block" /> IT IS TAKEN.
        </>
      ),
      core: "Protect, trade, and route your capital through VEIL — the only financial bastion on the Solana network built for total control over liquidity.",
      subhead:
        "Cut out intermediaries. Eliminate surveillance. Become the Operator of your destiny today.",
      btn1: "TERMINAL",
      btn2: "MANIFESTO",
    },
    RU: {
      headline: (
        <>
          СУВЕРЕНИТЕТ НЕ ДАЮТ.
          <br className="hidden sm:block" /> ЕГО БЕРУТ.
        </>
      ),
      core: "Защищай, торгуй и маршрутизируй свой капитал через VEIL — единственный финансовый бастион в сети Solana, созданный для тотального контроля над ликвидностью.",
      subhead:
        "Отрежь посредников. Исключи слежку. Стань Оператором своей судьбы сегодня.",
      btn1: "ТЕРМИНАЛ",
      btn2: "МАНИФЕСТ",
    },
  }[lang];

  return (
    <section className="relative min-h-0 md:min-h-[85vh] flex flex-col justify-between bg-[#050505] -mt-[46px] md:mt-0 pt-0 md:pt-32 pb-16 px-8 overflow-hidden">
      {/* CONTENT OVERLAY */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-6 flex-grow p-4">
        {/* MANIFESTO HEADLINE (H2) */}
        <h2 className="text-[#E5D9C4] font-sans font-extralight tracking-[0.12em] uppercase text-3xl sm:text-5xl md:text-6xl max-w-5xl leading-tight sm:leading-tight">
          {t.headline}
        </h2>

        {/* CORE EXPLANATION */}
        <p className="text-white font-sans font-light text-sm sm:text-lg md:text-xl max-w-3xl mt-8 leading-relaxed">
          {t.core}
        </p>

        {/* SUBHEADING */}
        <p className="text-stone-500 font-sans font-light text-xs sm:text-sm tracking-widest uppercase mt-6">
          {t.subhead}
        </p>

        {/* CTA PILL BUTTONS */}
        <div className="mt-12 grid grid-cols-2 gap-3 w-full max-w-[340px] px-2 md:flex md:flex-row md:justify-center md:items-center md:gap-6 md:max-w-none md:px-0">
          <button className="flex items-center justify-center h-[44px] md:h-auto rounded-full bg-[#EAE2D0] md:bg-[#E5D9C4] text-[#0A0A0C] md:text-[#050505] font-sans uppercase text-[10px] md:text-xs tracking-[0.12em] md:tracking-[0.2em] font-semibold md:font-medium px-4 md:px-10 py-0 md:py-4 transition-all duration-300 ease-out border border-transparent hover:bg-[#F5F0E8] md:hover:bg-transparent md:hover:border-white md:hover:text-white outline-none focus:outline-none focus:ring-0 cursor-pointer text-center whitespace-nowrap overflow-hidden">
            {t.btn1}
          </button>

          <button
            onClick={() => navigate("/manifesto")}
            className="flex items-center justify-center h-[44px] md:h-auto rounded-full bg-transparent border border-[#EDEAE2]/28 hover:border-[#EDEAE2]/55 md:border-[#221C1A] text-[#EDEAE2]/75 md:text-[#A8A29E] font-sans uppercase text-[10px] md:text-xs tracking-[0.12em] md:tracking-[0.2em] font-light px-4 md:px-10 py-0 md:py-4 transition-all duration-300 ease-out hover:bg-[#EDEAE2]/4 md:hover:bg-transparent md:hover:border-[#E5D9C4] hover:text-[#EDEAE2] md:hover:text-white outline-none focus:outline-none focus:ring-0 cursor-pointer text-center whitespace-nowrap overflow-hidden"
          >
            {t.btn2}
          </button>
        </div>
      </div>
    </section>
  );
}
