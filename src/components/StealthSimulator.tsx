import React, { useState } from "react";
import { motion } from "motion/react";
import { HelpCircle, GitCommit, Play, RefreshCw } from "lucide-react";

export default function StealthSimulator() {
  const [solAmount, setSolAmount] = useState<number>(50);
  const [isSimulating, setIsSimulating] = useState(false);
  const [nodes, setNodes] = useState<{ id: string; val: number; delay: number; status: string }[]>([]);

  const runSimulation = () => {
    setIsSimulating(true);
    // Fragment the initial Sol amount into 3 random parts
    const split1 = Number((solAmount * 0.35 + Math.random() * 2).toFixed(2));
    const split2 = Number((solAmount * 0.40 - Math.random() * 1).toFixed(2));
    const split3 = Number((solAmount - split1 - split2).toFixed(2));

    const initialNodes = [
      { id: "Transit_A (Ephemeral)", val: split1, delay: 150, status: "pending" },
      { id: "Transit_B (Ephemeral)", val: split2, delay: 350, status: "pending" },
      { id: "Transit_C (Ephemeral)", val: split3, delay: 600, status: "pending" },
    ];
    setNodes(initialNodes);

    initialNodes.forEach((node, idx) => {
      setTimeout(() => {
        setNodes((prev) =>
          prev.map((n, i) => (i === idx ? { ...n, status: "completed" } : n))
        );
        if (idx === initialNodes.length - 1) {
          setIsSimulating(false);
        }
      }, node.delay);
    });
  };

  return (
    <div className="border border-[#121212] bg-[#0A0A0C] p-5 sm:p-6 rounded-xl font-sans text-stone-300 w-full max-w-lg my-6 mx-auto">
      <div className="flex items-center gap-3 border-b border-[#121212] pb-3 mb-4">
        <GitCommit className="w-5 h-5 text-[#E5D9C4]" />
        <div>
          <span className="text-[10px] tracking-[0.2em] font-mono text-stone-500 block">STEALTH FLOW LOGIC</span>
          <span className="text-xs font-light uppercase tracking-widest text-[#EDEAE2]">Active Liquidity Fragmentation</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 font-light">Input Amount:</span>
            <span className="font-mono text-white text-sm font-semibold">{solAmount} SOL</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={solAmount}
            onChange={(e) => setSolAmount(Number(e.target.value))}
            disabled={isSimulating}
            className="w-full accent-[#E5D9C4] h-1 bg-[#121212] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Start Button */}
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="w-full flex items-center justify-center gap-2 h-9 rounded bg-[#EDEAE2]/10 border border-[#EDEAE2]/20 text-white hover:bg-[#EDEAE2]/20 transition-all text-xs uppercase tracking-wider font-light cursor-pointer disabled:opacity-40"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              FRAGMENTING ROUTE...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              RUN ROUTE OBFUSCATION
            </>
          )}
        </button>

        {/* Node Visualizers */}
        <div className="flex flex-col gap-3 mt-4 border-t border-[#121212] pt-4">
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-stone-500">
            <span>TRANSIT HUB</span>
            <span>TRANSFER STATUS</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {nodes.length === 0 ? (
              <p className="text-xs text-stone-600 italic py-2 text-center">Click run to trigger the fragmentation engine.</p>
            ) : (
              nodes.map((node, i) => (
                <div key={i} className="flex items-center justify-between bg-[#050505] p-2.5 border border-[#121212] rounded">
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-mono text-[11px] text-[#EDEAE2] tracking-wide">{node.id}</span>
                    <span className="text-[10px] font-mono text-stone-500">Delay: +{node.delay}ms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#E5D9C4] font-medium">{node.val} SOL</span>
                    <motion.div
                      animate={{
                        scale: node.status === "completed" ? [1, 1.2, 1] : 1,
                      }}
                      className={`w-2 h-2 rounded-full ${node.status === "completed" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-orange-500 animate-pulse"}`}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Explain Card */}
        <p className="text-[11px] text-stone-500 font-light leading-relaxed">
          <strong>How on-chain software gets fooled:</strong> Instead of sending a single traceable {solAmount} SOL transaction, Veil splits it across independent disposable addresses and introduces timing offsets, making standard graph analysis link tracking completely impossible.
        </p>
      </div>
    </div>
  );
}
