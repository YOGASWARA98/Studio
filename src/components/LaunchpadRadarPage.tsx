import React, { useState } from "react";
import { TOKEN_RADAR_ITEMS } from "../data/mockData";
import { SeoHeadManager } from "./SeoHeadManager";
import {
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ExternalLink,
  CheckCircle,
  Filter,
  Flame,
} from "lucide-react";

export const LaunchpadRadarPage: React.FC = () => {
  const [filterChain, setFilterChain] = useState<string>("all");

  const filteredTokens = TOKEN_RADAR_ITEMS.filter((t) => {
    if (filterChain === "all") return true;
    return t.chain.toLowerCase().includes(filterChain.toLowerCase());
  });

  const launchpadSchema = {
    "@type": "WebPage",
    "name": "Radar Token & Presale Gaming 2026 - ApexLaunch.io",
    "description": "Pantau peluncuran token kripto gaming, audit likuiditas terkunci, dan skor keamanan smart contract.",
    "url": "https://apexlaunch.io/launchpad-radar"
  };

  return (
    <div id="launchpad-radar-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SeoHeadManager
        title="Radar Token & Peluncuran Web3 Gaming 2026 - Audit Keamanan"
        description="Pantau presale dan token gaming Web3 dengan audit likuiditas terkunci, deteksi honeypot, dan evaluasi risiko smart contract di ApexLaunch."
        canonicalPath="/launchpad-radar"
        pageType="launchpad"
        schemaJson={launchpadSchema}
      />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Security Radar Web3 &amp; Gaming</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Radar Peluncuran Token &amp; Audit Smart Contract
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Verifikasi on-chain independen untuk menghindari token honeypot, rug pull likuiditas, dan presale fiktif di ekosistem crypto gaming.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-6 pb-2 overflow-x-auto">
        {["all", "arbitrum", "solana", "evm", "base"].map((chain) => (
          <button
            key={chain}
            onClick={() => setFilterChain(chain)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer uppercase ${
              filterChain === chain
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {chain === "all" ? "Semua Network" : chain}
          </button>
        ))}
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredTokens.map((token) => (
          <div
            key={token.id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{token.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      ${token.symbol}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                    Network: {token.chain} • Fase: {token.stage}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">
                    Safety Score:
                  </span>
                  <span
                    className={`text-xl font-mono font-black ${
                      token.safetyScore >= 90
                        ? "text-emerald-400"
                        : token.safetyScore >= 70
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {token.safetyScore}/100
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">{token.useCase}</p>

              {/* Safety Checklist Matrix */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 text-xs font-mono mb-4">
                <div>
                  <span className="text-[10px] text-slate-400 block">Kunci Likuiditas:</span>
                  <span className="text-cyan-300 font-semibold">{token.liquidityLockDays} Hari</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Status Honeypot:</span>
                  <span
                    className={`font-semibold ${
                      token.honeypotStatus.includes("Clean") ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {token.honeypotStatus}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Lembaga Audit:</span>
                  <span className="text-slate-300">{token.auditFirm}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Jadwal: {token.launchDate}</span>
              <span className="text-emerald-400 font-mono text-[11px]">✓ On-Chain Verified</span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Education Callout */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2 font-mono">
          <AlertTriangle className="w-4 h-4" />
          <span>Protokol Keamanan Presale Komunitas</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Jangan pernah menghubungkan dompet kripto utama Anda ke situs presale yang belum terverifikasi. Selalu gunakan disposable wallet (burn wallet) dan periksa apakah kontrak likuiditas terkunci minimal 180 hari di pemverifikasi publik seperti Team Finance atau Uncx Network.
        </p>
      </div>
    </div>
  );
};
