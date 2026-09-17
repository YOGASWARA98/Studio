import React, { useState } from "react";
import { CasinoReview } from "../types";
import { CASINO_REVIEWS } from "../data/mockData";
import { SeoHeadManager } from "./SeoHeadManager";
import { useLanguage } from "../context/LanguageContext";
import { OptimizedImage } from "./OptimizedImage";
import { AUDITOR_AVATAR_IMAGE, ONEWIN_HERO_IMAGE } from "../lib/imageOptimization";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Award,
  ExternalLink,
  Flame,
  Copy,
  Check,
  Zap,
  Gamepad2,
  Smartphone,
  Gift,
  ImageIcon,
} from "lucide-react";

interface ReviewsPageProps {
  selectedReviewId?: string;
  onSelectReview: (reviewId: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  selectedReviewId = "1win",
  onSelectReview,
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "no-kyc" | "instant">("all");
  const { langConfig, promoCode, t, handleClaim1Win } = useLanguage();
  const [copied, setCopied] = useState(false);

  const currentCasino = CASINO_REVIEWS.find((c) => c.id === selectedReviewId) || CASINO_REVIEWS[0];

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const filteredCasinos = CASINO_REVIEWS.filter((c) => {
    if (activeFilter === "no-kyc") return c.kycRequirement === "No KYC for Crypto";
    if (activeFilter === "instant") return c.payoutSpeed.toLowerCase().includes("instant") || c.testedWithdrawalTime.includes("m");
    return true;
  });

  const reviewSchema = {
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": currentCasino.name,
      "url": `https://apexlaunch.io/reviews/${currentCasino.slug}`,
      "sameAs": currentCasino.id === "1win" ? "https://apexlaunch.io/go/1win" : `https://${currentCasino.slug}.com`
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": currentCasino.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "ApexLaunch Independent Crypto Audits",
      "url": "https://apexlaunch.io"
    },
    "reviewBody": currentCasino.verdictSummary
  };

  return (
    <div id="reviews-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SeoHeadManager
        title={`Ulasan ${currentCasino.name} 2026 - Audit Provably Fair & Kecepatan WD`}
        description={`Audit independen ${currentCasino.name}: Skor ${currentCasino.rating}/5, tes penarikan ${currentCasino.testedWithdrawalTime}, verifikasi algoritma SHA-256, dan panduan klaim bonus resmi.`}
        canonicalPath={`/reviews/${currentCasino.slug}`}
        pageType="reviews"
        selectedReviewId={currentCasino.id}
        schemaJson={reviewSchema}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Audit &amp; Benchmark Kasino Kripto Global 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Ulasan Kasino Kripto Terverifikasi &amp; Provably Fair
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Setiap platform diuji menggunakan setoran cryptocurrency nyata (USDT/BTC/SOL), audit log HMAC-SHA256, dan benchmarking kecepatan penarikan instan.
        </p>
      </div>

      {/* Platform Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-800">
        {CASINO_REVIEWS.map((c) => {
          const isSelected = c.id === currentCasino.id;
          return (
            <button
              key={c.id}
              id={`tab-select-${c.id}`}
              onClick={() => onSelectReview(c.id)}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
              }`}
            >
              {c.isFeaturedPrimary && (
                <Flame className={`w-3.5 h-3.5 ${isSelected ? "text-amber-950" : "text-amber-400"}`} />
              )}
              <span className="font-mono">{c.name}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded font-mono ${
                  isSelected ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-slate-400"
                }`}
              >
                ★ {c.rating}
              </span>
              {c.isFeaturedPrimary && (
                <span className="px-1 py-0.2 rounded bg-amber-500/30 text-amber-200 text-[9px] font-mono uppercase font-black">
                  #1 VIP
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Review Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* If 1win, show special VIP Partner banner */}
          {currentCasino.id === "1win" && (
            <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950 border-2 border-blue-500/40 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold">
                    ★ REKOMENDASI UTAMA 2026
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    Audit Keamanan: 99/100
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Kode VIP: <strong className="text-blue-300 font-bold">{promoCode}</strong>
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {langConfig.oneWinBonusText}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {langConfig.oneWinBonusSubtext}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleCopyCode();
                    handleClaim1Win("review_tab_banner");
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer transition-all hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>KODE TERSALIN! MENGALIHKAN...</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>KLAIM BONUS +500% SEKARANG</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-cyan-400 font-mono font-black text-2xl shadow-inner">
                  {currentCasino.logoUrl}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white">{currentCasino.name}</h2>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                      Terverifikasi
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{currentCasino.tagline}</p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between bg-slate-950/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-800">
                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-base font-black text-amber-300 font-mono">
                    {currentCasino.rating}
                  </span>
                  <span className="text-xs text-slate-500">/ 5.0</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1">
                  Berdasarkan {currentCasino.reviewCount} audit pembaca
                </span>
              </div>
            </div>

            {/* Verdict Paragraph */}
            <div className="py-6 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-bold">
                Ringkasan Vonis Redaksi ApexLaunch:
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentCasino.verdictSummary}
              </p>
            </div>

            {/* Benchmarking Metrics */}
            <div className="py-6 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Waktu Penarikan Riil</span>
                </div>
                <span className="text-lg font-bold font-mono text-cyan-300">
                  {currentCasino.testedWithdrawalTime}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Otomatis on-chain</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Provably Fair</span>
                </div>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  100% SHA-256
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Seed audit terbuka</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Security Index</span>
                </div>
                <span className="text-lg font-bold font-mono text-amber-300">
                  {currentCasino.securityScore}/100
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Audited by iTechLabs</span>
              </div>
            </div>

            {/* Visual Platform Audit Showcase (Optimized for LCP) */}
            {currentCasino.heroImageUrl && (
              <div className="pt-6 border-b border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Visual Audit &amp; Platform Benchmark (LCP Optimized)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Responsive srcSet (320w - 1920w)
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl">
                  <OptimizedImage
                    src={currentCasino.heroImageUrl}
                    alt={`${currentCasino.name} Platform Audit Benchmark 2026`}
                    aspectRatio="1200/630"
                    priority={currentCasino.id === "1win"}
                    sizesPreset="hero"
                    className="hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            )}

            {/* Pros & Cons */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kelebihan Utama (Pros)</span>
                </h4>
                <ul className="space-y-2">
                  {currentCasino.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-rose-400 font-bold mb-3 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Catatan Perhatian (Cons)</span>
                </h4>
                <ul className="space-y-2">
                  {currentCasino.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Specs & SERP Rich Snippet */}
        <div className="space-y-6">
          {/* Promo Card if 1win */}
          {currentCasino.id === "1win" && (
            <div className="bg-slate-950 border-2 border-blue-500/40 rounded-2xl p-5 text-center space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase font-bold block">
                VOUCHER PROMO VIP
              </span>
              <div className="bg-blue-950 border border-dashed border-blue-400 text-blue-300 font-mono text-2xl font-black py-2 rounded-xl">
                {promoCode}
              </div>
              <button
                onClick={() => {
                  handleCopyCode();
                  handleClaim1Win("sidebar_promo");
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
              >
                {copied ? "KODE TERSALIN!" : "SALIN KODE & KLAIM +500%"}
              </button>
              <span className="text-[10px] text-slate-500 block">
                Gunakan saat pendaftaran di 1win untuk membuka bonus deposit 500%
              </span>
            </div>
          )}

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">
              Data Spesifikasi Platform
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Tahun Berdiri:</span>
                <span className="text-white font-mono">{currentCasino.established}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Lisensi Resmi:</span>
                <span className="text-white text-right max-w-[170px] text-[11px] truncate">
                  {currentCasino.license}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Ketentuan KYC:</span>
                <span className="text-emerald-400 font-medium">{currentCasino.kycRequirement}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Min. Deposit:</span>
                <span className="text-white font-mono">{currentCasino.minDeposit}</span>
              </div>
              <div className="py-2">
                <span className="text-slate-400 block mb-1">Mata Uang Kripto Didukung:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentCasino.supportedCoins.map((coin) => (
                    <span
                      key={coin}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300"
                    >
                      {coin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Google SERP Rich Snippet Simulation */}
          <div className="bg-slate-950 border border-cyan-500/20 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-3">
              Google SERP Rich Snippet (Live Schema Preview)
            </span>

            <div className="font-sans space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="text-cyan-400 font-medium">https://apexlaunch.io</span>
                <span>› reviews › {currentCasino.slug}</span>
              </div>
              <h4 className="text-base text-blue-400 hover:underline font-medium cursor-pointer">
                Ulasan {currentCasino.name} 2026 - Rating {currentCasino.rating}/5 &amp; Provably Fair
              </h4>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono pt-0.5">
                <span>Rating: {currentCasino.rating} ★★★★★</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{currentCasino.reviewCount} ulasan</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug pt-1">
                Audit mendalam {currentCasino.name}. Penarikan diuji {currentCasino.testedWithdrawalTime}, program VIP Rakeback, dan transparansi algoritma seed SHA-256.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
