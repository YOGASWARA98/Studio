import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Coins,
  Activity,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";

export interface CryptoTokenPrice {
  symbol: string;
  name: string;
  pair: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  gamingUtility: string;
  iconColor: string;
  minDepositCrypto: string;
  settlementSpeed: string;
}

interface CryptoPriceTickerProps {
  onClaimPromo?: () => void;
}

export const CryptoPriceTicker: React.FC<CryptoPriceTickerProps> = ({ onClaimPromo }) => {
  const [tokens, setTokens] = useState<CryptoTokenPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(15);
  const [activeTokenSymbol, setActiveTokenSymbol] = useState<string>("BTC");
  const [calculatorUsd, setCalculatorUsd] = useState<number>(100);
  const [priceFlash, setPriceFlash] = useState<Record<string, "up" | "down" | null>>({});
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const previousPrices = useRef<Record<string, number>>({});

  const fetchPrices = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/crypto-prices");
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const json = await res.json();
      const newTokens: CryptoTokenPrice[] = json.data || [];

      // Check for price changes to trigger flash visual effect
      const newFlash: Record<string, "up" | "down" | null> = {};
      newTokens.forEach((t) => {
        const prev = previousPrices.current[t.symbol];
        if (prev !== undefined && prev !== t.price) {
          newFlash[t.symbol] = t.price > prev ? "up" : "down";
        }
        previousPrices.current[t.symbol] = t.price;
      });

      setTokens(newTokens);
      setPriceFlash(newFlash);
      setLastUpdated(new Date());
      setSecondsUntilRefresh(15);

      // Clear flash after 1.5s
      setTimeout(() => {
        setPriceFlash({});
      }, 1500);
    } catch {
      // Fallback if network issue
      if (tokens.length === 0) {
        setTokens([
          {
            symbol: "BTC",
            name: "Bitcoin",
            pair: "BTC/USDT",
            price: 76520.0,
            change24h: 1.25,
            high24h: 76800.0,
            low24h: 75200.0,
            volume24h: 1250000000,
            gamingUtility: "Aset Utama Kasino & VIP Bets",
            iconColor: "#F7931A",
            minDepositCrypto: "0.0001 BTC",
            settlementSpeed: "10-20 mnt (1 konfirmasi)",
          },
          {
            symbol: "ETH",
            name: "Ethereum",
            pair: "ETH/USDT",
            price: 2442.5,
            change24h: 1.6,
            high24h: 2470.0,
            low24h: 2380.0,
            volume24h: 850000000,
            gamingUtility: "Smart Contract & High Roller",
            iconColor: "#627EEA",
            minDepositCrypto: "0.002 ETH",
            settlementSpeed: "2-5 mnt (12 konfirmasi)",
          },
          {
            symbol: "SOL",
            name: "Solana",
            pair: "SOL/USDT",
            price: 99.8,
            change24h: 2.55,
            high24h: 101.5,
            low24h: 96.2,
            volume24h: 320000000,
            gamingUtility: "Gas < $0.01 & Transaksi < 2 dtk",
            iconColor: "#14F195",
            minDepositCrypto: "0.02 SOL",
            settlementSpeed: "< 1 mnt (Konfirmasi Instan)",
          },
          {
            symbol: "USDT",
            name: "Tether USD",
            pair: "USDT/USD",
            price: 1.0,
            change24h: 0.01,
            high24h: 1.0008,
            low24h: 0.9994,
            volume24h: 42000000000,
            gamingUtility: "Saldo Stabil Bebas Volatilitas",
            iconColor: "#26A17B",
            minDepositCrypto: "1 USDT",
            settlementSpeed: "1-5 mnt (TRC20 / BEP20)",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          fetchPrices();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeToken = tokens.find((t) => t.symbol === activeTokenSymbol) || tokens[0];

  const formatUsd = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (num >= 1) {
      return num.toFixed(2);
    }
    return num.toFixed(4);
  };

  const calculateTokensFromUsd = (usdAmount: number, tokenPrice: number) => {
    if (!tokenPrice || tokenPrice === 0) return "0";
    const val = usdAmount / tokenPrice;
    if (val >= 100) return val.toFixed(2);
    if (val >= 1) return val.toFixed(4);
    return val.toFixed(6);
  };

  // 1win Bonus +500% computation
  const bonusMultiplier = 5;
  const calculatedBonusUsd = calculatorUsd * bonusMultiplier;
  const totalPlayBalance = calculatorUsd + calculatedBonusUsd;

  return (
    <div
      id="crypto-price-ticker-hero"
      className="w-full bg-slate-900/90 border border-slate-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden text-left my-8"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Ticker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                Pasar Kripto Gaming Real-Time
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-semibold">
                Live Public Feed
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Kurs likuiditas setoran &amp; penarikan (BTC, ETH, SOL, USDT) diperbarui otomatis
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Seconds countdown chip */}
          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            Sync: <strong className="text-cyan-400">{secondsUntilRefresh}s</strong>
          </span>

          <button
            id="btn-refresh-crypto-prices"
            onClick={fetchPrices}
            disabled={isLoading}
            title="Refresh harga manual"
            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
          </button>

          <button
            id="btn-toggle-deposit-calc"
            onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              isCalculatorOpen
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isCalculatorOpen ? "Tutup Kalkulator" : "Kalkulator Bonus"}</span>
          </button>
        </div>
      </div>

      {/* Main 4-Token Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
        {tokens.slice(0, 4).map((token) => {
          const isPositive = token.change24h >= 0;
          const flash = priceFlash[token.symbol];
          const isSelected = activeTokenSymbol === token.symbol;

          return (
            <div
              key={token.symbol}
              onClick={() => setActiveTokenSymbol(token.symbol)}
              className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer relative group ${
                isSelected
                  ? "bg-slate-950 border-cyan-500/50 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30"
                  : "bg-slate-950/60 hover:bg-slate-950/90 border-slate-800 hover:border-slate-700"
              } ${
                flash === "up"
                  ? "ring-2 ring-emerald-500 bg-emerald-950/20"
                  : flash === "down"
                  ? "ring-2 ring-rose-500 bg-rose-950/20"
                  : ""
              }`}
            >
              {/* Card Top: Symbol & 24h Change */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-slate-950 font-mono shadow-sm"
                    style={{ backgroundColor: token.iconColor }}
                  >
                    {token.symbol.slice(0, 1)}
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block leading-tight">
                      {token.symbol}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block max-w-[80px]">
                      {token.name}
                    </span>
                  </div>
                </div>

                {/* 24h Pill */}
                <div
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isPositive
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="mt-1">
                <div className="text-lg sm:text-xl font-mono font-black text-white tracking-tight">
                  ${formatUsd(token.price)}
                </div>
              </div>

              {/* Gaming Settlement Badge */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate pr-1">{token.gamingUtility}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Token Detail & Gaming Settlement Specs */}
      {activeToken && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs bg-slate-950/40 rounded-xl p-3 border border-slate-800/50">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-300">
            <span className="font-mono text-cyan-300 font-bold flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeToken.name} ({activeToken.pair})</span>
            </span>

            <span className="text-slate-400">
              Min Deposit Kasino: <strong className="text-white font-mono">{activeToken.minDepositCrypto}</strong>
            </span>

            <span className="text-slate-400">
              Kecepatan Node: <strong className="text-emerald-400 font-mono">{activeToken.settlementSpeed}</strong>
            </span>

            <span className="text-slate-400">
              24h Range:{" "}
              <strong className="text-slate-200 font-mono">
                ${formatUsd(activeToken.low24h)} - ${formatUsd(activeToken.high24h)}
              </strong>
            </span>
          </div>

          <div className="shrink-0">
            <button
              onClick={onClaimPromo}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>Mainkan dengan {activeToken.symbol} (+500% Bonus)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Interactive Deposit & Bonus Estimator Drawer */}
      {isCalculatorOpen && (
        <div
          id="crypto-deposit-calculator-drawer"
          className="mt-4 pt-4 border-t border-cyan-500/20 bg-slate-950/90 rounded-2xl p-4 sm:p-5 border border-slate-800 animate-in fade-in duration-200"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase">
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulasi Konversi &amp; Paket Bonus +500% (Kode: winpro17)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ketahui estimasi saldo bermain jika Anda melakukan setoran dengan kurs kripto saat ini di 1win.
              </p>

              {/* Amount Presets */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400">Preset:</span>
                {[20, 50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCalculatorUsd(amt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      calculatorUsd === amt
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input and Result Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              {/* Input Box */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Nominal Setoran (USD)
                </span>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={calculatorUsd}
                    onChange={(e) => setCalculatorUsd(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 block mt-1.5">
                  ≈ {calculateTokensFromUsd(calculatorUsd, activeToken?.price || 1)} {activeToken?.symbol}
                </span>
              </div>

              {/* Bonus Unlock Box */}
              <div className="bg-slate-900 p-3 rounded-xl border border-blue-500/30">
                <span className="text-[10px] font-mono text-blue-400 uppercase block mb-1 font-bold">
                  Bonus +500% VIP (winpro17)
                </span>
                <div className="text-lg font-black font-mono text-cyan-300 pt-0.5">
                  +${formatUsd(calculatedBonusUsd)}
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Bertahap 4 deposit (200%, 150%, 100%, 50%)
                </span>
              </div>

              {/* Total Play Power Box */}
              <div className="bg-gradient-to-br from-cyan-950/70 to-blue-950/70 p-3 rounded-xl border border-cyan-500/40">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1 font-bold">
                  Total Saldo Bertaruh
                </span>
                <div className="text-lg font-black font-mono text-white pt-0.5">
                  ${formatUsd(totalPlayBalance)}
                </div>
                <span className="text-[10px] font-mono text-cyan-300 block mt-1">
                  ≈ {calculateTokensFromUsd(totalPlayBalance, activeToken?.price || 1)} {activeToken?.symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
