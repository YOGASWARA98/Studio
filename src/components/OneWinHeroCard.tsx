import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { OptimizedImage } from "./OptimizedImage";
import { ONEWIN_HERO_IMAGE } from "../lib/imageOptimization";
import {
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  Flame,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Gamepad2,
  Smartphone,
  ImageIcon,
} from "lucide-react";

interface OneWinHeroCardProps {
  variant?: "full" | "compact";
  onViewReview?: () => void;
}

export const OneWinHeroCard: React.FC<OneWinHeroCardProps> = ({
  variant = "full",
  onViewReview,
}) => {
  const { langConfig, promoCode, t, handleClaim1Win, oneWinAffiliateUrl } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      id="onewin-vip-hero-card"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-950/80 via-slate-900 to-slate-950 border-2 border-blue-500/40 p-6 sm:p-8 shadow-2xl shadow-blue-500/10 mb-10"
    >
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t("vip_offer_badge")}</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {t("rating_verified")} (8,420+ Votes)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-400">{t("live_traffic")}</span>
          <span className="font-bold text-emerald-400">148,320+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Main Offer Content */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-xl shadow-blue-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl font-mono text-white tracking-tighter">
                1<span className="text-blue-400">W</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  1win Global Official
                </h2>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-mono font-bold">
                  #1 CHOICE
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Curacao Gaming Lic. #8048/JAZ2018-040 • 1win N.V. Verified
              </p>
            </div>
          </div>

          {/* Localized Huge Bonus Headline */}
          <div className="bg-slate-950/70 border border-blue-500/30 rounded-2xl p-4 sm:p-5">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block mb-1">
              EXCLUSIVE PARTNER TIER (2026 AUDITED)
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
              {langConfig.oneWinBonusText}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{langConfig.oneWinBonusSubtext}</span>
            </div>

            {/* 4-Tier Deposit Progress Bars */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-800">
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Dep. 1</span>
                <span className="text-xs sm:text-sm font-black text-blue-400 font-mono">+200%</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Dep. 2</span>
                <span className="text-xs sm:text-sm font-black text-cyan-400 font-mono">+150%</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Dep. 3</span>
                <span className="text-xs sm:text-sm font-black text-indigo-400 font-mono">+100%</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Dep. 4</span>
                <span className="text-xs sm:text-sm font-black text-purple-400 font-mono">+50%</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
              <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Withdrawals</span>
              <span className="text-xs font-bold text-slate-200">{t("withdrawal_speed")}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
              <Gamepad2 className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Catalog</span>
              <span className="text-xs font-bold text-slate-200">12,000+ Games</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Lucky Jet</span>
              <span className="text-xs font-bold text-emerald-300">Provably Fair</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
              <Smartphone className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Mobile App</span>
              <span className="text-xs font-bold text-purple-300">iOS &amp; Android</span>
            </div>
          </div>
        </div>

        {/* Right Col: High-Conversion CTA & Voucher Box */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-blue-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
              {t("promo_code_label")}
            </span>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-950/80 border-2 border-dashed border-blue-400 text-blue-300 font-mono font-black text-xl sm:text-2xl tracking-widest my-1 w-full">
              <span>{promoCode}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium block mt-1">
              ✓ Guaranteed +500% Boost Activated
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            <button
              id="hero-copy-claim-btn"
              onClick={(e) => {
                handleCopyCode(e);
                handleClaim1Win("hero_card");
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{t("code_copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t("copy_code_btn")}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </>
              )}
            </button>

            {onViewReview && (
              <button
                id="hero-view-review-btn"
                onClick={onViewReview}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors cursor-pointer border border-slate-800"
              >
                <span>{t("official_review_1win")}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Steps Note */}
          <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
            <p className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>1. Kode voucher disalin otomatis saat tombol diklik.</span>
            </p>
            <p className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>2. Tempel di kolom promo pendaftaran 1win untuk membuka paket 500%.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
