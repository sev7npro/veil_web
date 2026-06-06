import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Key, RefreshCw, Trash2 } from "lucide-react";

export default function VaultSimulator() {
  const [pin, setPin] = useState("");
  const [plainText, setPlainText] = useState("SOLANA_SECRET_KEY_SEED_PHRASE");
  const [cipherText, setCipherText] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [memoryDump, setMemoryDump] = useState<string>("0x7ff02bf412 // STELS_ADDR_KEY: A7D2...9E // MASTER_KEY: AD39...FF");

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 4));
  };

  const handleEncrypt = () => {
    if (!pin) {
      addLog("ERROR: PIN is empty. Failed derived key generation.");
      return;
    }
    // Simulate Argon2id -> HKDF -> GCM
    const simpleHash = pin.split("").reduce((acc, char) => acc + char.charCodeAt(0), 101);
    const mockCipher = btoa(plainText.split("").map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (simpleHash + i) % 256)).join(""));
    setCipherText(mockCipher);
    setIsEncrypted(true);
    setMemoryDump(`0x7ff02bf412 // ARGON2ID_HASH: $argon2id$v=19$m=65536,t=3,p=4$${btoa(pin)}...\n0x7ff02bf434 // HKDF_DERIVED_KEY: 0a9e7f...de39\n0x7ff02bf478 // RAM_RESERVED_PLAINTEXT: "${plainText}"`);
    addLog("SUCCESS: AES-256-GCM vault created locally.");
  };

  const handleWipe = () => {
    setPin("");
    setCipherText("");
    setIsEncrypted(false);
    setMemoryDump("0x0000000000 // NULL // NULL // NULL");
    addLog("PURGE: RAM zeroized using zeroize-trait.");
  };

  return (
    <div className="border border-[#121212] bg-[#0A0A0C] p-5 sm:p-6 rounded-xl font-sans text-stone-300 w-full max-w-lg my-6 mx-auto">
      <div className="flex items-center gap-3 border-b border-[#121212] pb-3 mb-4">
        <Shield className="w-5 h-5 text-[#E5D9C4]" />
        <div>
          <span className="text-[10px] tracking-[0.2em] font-mono text-stone-500 block">INTERACTIVE SIMULATION</span>
          <span className="text-xs font-light uppercase tracking-widest text-[#EDEAE2]">Vault & Memory Zeroization</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Memory Dump Display */}
        <div className="bg-[#050505] border border-[#161618] p-3 rounded font-mono text-[10px] leading-normal text-green-500 overflow-x-auto whitespace-pre-wrap">
          <span className="text-stone-600 block mb-1">// RAM MEMORY STATE:</span>
          {memoryDump}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-wider text-stone-500 uppercase font-mono">1. Set secure PIN</label>
            <input
              type="password"
              placeholder="e.g. 293910"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="bg-[#050505] border border-[#1b1b1d] rounded px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-[#E5D9C4] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-wider text-stone-500 uppercase font-mono">2. Secret Phrase</label>
            <input
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              className="bg-[#050505] border border-[#1b1b1d] rounded px-3 py-2 text-white focus:outline-none focus:border-[#E5D9C4] transition-colors"
            />
          </div>
        </div>

        {/* Encrypted Result */}
        {isEncrypted && (
          <div className="bg-[#050505] border border-[#1a1412] p-3 rounded flex flex-col gap-1.5">
            <span className="text-[10px] tracking-wider text-[#E5D9C4] uppercase font-mono">Ciphertext output (GCM AES-256)</span>
            <span className="font-mono text-[11px] text-[#A8A29E] break-all">{cipherText}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <button
            onClick={handleEncrypt}
            className="flex-1 flex items-center justify-center gap-2 h-9 rounded bg-[#E5D9C4] text-[#050505] hover:bg-[#F5F0E8] transition-all text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            ENCRYPT IN DEVICE
          </button>
          <button
            onClick={handleWipe}
            className="flex-1 flex items-center justify-center gap-2 h-9 rounded border border-red-950 text-red-400 hover:bg-red-950/20 transition-all text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            WIPE RAM (PURGE)
          </button>
        </div>

        {/* Micro Logs logs */}
        {logs.length > 0 && (
          <div className="flex flex-col border-t border-[#121212] pt-3 mt-1 gap-1">
            <span className="text-[9px] tracking-widest text-[#E5D9C4]/60 uppercase font-mono mb-1">Process output:</span>
            {logs.map((log, idx) => (
              <div key={idx} className="font-mono text-[10px] text-stone-500">
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
