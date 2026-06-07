import React from "react";

export function LoaderSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col justify-center items-center font-sans relative overflow-hidden" id="loader-skeleton">
      {/* Background neon visual glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(0,232,250,0.04)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      
      {/* Animated subtle breathing circle */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-12 h-12 rounded-full border border-white/[0.04] border-t-cyan-400 animate-spin" style={{ animationDuration: '0.8s' }} />
        <div className="absolute w-8 h-8 rounded-full border border-white/[0.02] bg-white/[0.01] animate-pulse" />
      </div>

      {/* Shimmer layout lines */}
      <div className="w-full max-w-md px-6 flex flex-col gap-4 items-center">
        <div className="h-6 w-48 bg-white/[0.03] rounded-md animate-pulse" />
        <div className="h-3 w-32 bg-white/[0.02] rounded-md animate-pulse" style={{ animationDelay: '0.15s' }} />
        
        <div className="w-full h-px bg-white/[0.04] my-4" />
        
        <div className="w-full flex flex-col gap-2">
          <div className="h-4 w-full bg-white/[0.015] rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="h-4 w-[90%] bg-white/[0.015] rounded-sm animate-pulse" style={{ animationDelay: '0.45s' }} />
          <div className="h-4 w-[95%] bg-white/[0.015] rounded-sm animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="h-4 w-[80%] bg-white/[0.015] rounded-sm animate-pulse" style={{ animationDelay: '0.75s' }} />
        </div>
      </div>
    </div>
  );
}

export function ImageSkeleton() {
  return (
    <div className="w-full aspect-[9/16] max-h-[490px] rounded-2xl bg-[#090b0a] border border-white/[0.03] flex items-center justify-center animate-pulse relative overflow-hidden" id="image-skeleton">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.015] to-transparent animate-[shimmer_1.8s_infinite] -translate-x-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.02) 50%, transparent)' }} />
      <div className="flex flex-col items-center gap-3 opacity-30">
        <div className="w-10 h-10 rounded-full border border-white/[0.1] border-b-cyan-500 animate-spin" />
        <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-stone-400">LOADING SHADER SPEC</div>
      </div>
    </div>
  );
}
