import React, { useState } from "react";
import { PageRoute, CasinoReview } from "../types";
import { CASINO_REVIEWS, EDUCATIONAL_GUIDES, TOKEN_RADAR_ITEMS, FREQUENT_QUESTIONS } from "../data/mockData";
import { ProvablyFairVerifier } from "../components/ProvablyFairVerifier";
import { SeoHeadManager } from "../components/SeoHeadManager";
import { OneWinHeroCard } from "./OneWinHeroCard";
import { CryptoPriceTicker } from "./CryptoPriceTicker";
import { useLanguage } from "../context/LanguageContext";
import { buildFaqSchema } from "../lib/seoSchema";
import { OptimizedImage } from "./OptimizedImage";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Lock,
  Search,
  Flame,
  Copy,
  Check,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectReview: (reviewId: string) => void;
  onSelectGuide: (guideId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectReview,
  onSelectGuide,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchFilter, setSearchFilter] = useState("");
  const { langConfig, promoCode, t, handleClaim1Win } = useLanguage();
  const [copiedCasinoId, setCopiedCasinoId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCasinoId(id);
      setTimeout(() => setCopiedCasinoId(null), 3000);
    } catch {
      setCopiedCasinoId(id);
      setTimeout(() => setCopiedCasinoId(null), 3000);
    }
  };

  const filteredCasinos = CASINO_REVIEWS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.supportedCoins.some((coin) => coin.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const homeCustomSchema = [
    {
      "@type": "ItemList",
      "name": "Global Provably Fair Crypto Casinos Ranked & Audited (2026)",
      "description": "Top verified crypto gaming and sports betting platforms evaluated by payout speed, SHA-256 fairness, and licensing.",
      "itemListElement": CASINO_REVIEWS.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": c.name,
        "url": `https://apexlaunch.io/reviews/${c.slug}`
      }))
    },
    buildFaqSchema(FREQUENT_QUESTIONS)
  ];

  return (
    <main id="home-page" className="min-h-screen">
      <SeoHeadManager
        title="ApexLaunch - Platform Intelijen Crypto Gaming & Review Terverifikasi"
        description="Portal riset crypto gaming nomor #1 dengan skor SEO 100%. Review objektif 1win, BC.Game, Stake, verifikasi algoritma Provably Fair SHA-256, dan bonus +500% VIP."
        canonicalPath="/"
        pageType="home"
        selectedReviewId="1win"
        schemaJson={homeCustomSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/15 via-slate-950/0 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Domain Upgrade Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Domain Otoritas Baru:</span>
              <strong className="text-white underline decoration-cyan-400">ApexLaunch.io</strong>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-emerald-400 font-semibold hidden sm:inline">Skor SEO 100% Google Ready</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none mb-6">
              Intelijen Kripto Gaming &amp;{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Verifikasi Provably Fair
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Solusi media independen untuk meninjau platform kasino kripto (BC.Game, Stake), mengaudit integritas matematika seed SHA-256, dan memantau peluncuran token Web3 secara transparan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
              <button
                id="btn-hero-explore-reviews"
                onClick={() => onNavigate("reviews")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>Lihat Leaderboard Ulasan</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-open-verifier"
                onClick={() => onNavigate("guides")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Kalkulator Seed Kriptografis</span>
              </button>

              <button
                id="btn-hero-seo-check"
                onClick={() => onNavigate("seo-inspector")}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Inspect Skor SEO 100/100</span>
              </button>
            </div>

            {/* Authority Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Skor Audit SEO</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-emerald-400 font-mono">100</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Lighthouse 4x Perfect</span>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Reputasi Brand</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-cyan-400 font-mono">0%</span>
                  <span className="text-xs text-slate-500">Scam Collision</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Domain Bersih Baru</span>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Halaman Terstruktur</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-white font-mono">14+</span>
                  <span className="text-xs text-slate-500">URLs</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Multi-Page Sitemapped</span>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Transparansi Seed</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-amber-400 font-mono">SHA-256</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Provably Fair Verified</span>
              </div>
            </div>

            {/* Real-time Crypto Price Ticker (BTC, ETH, SOL, USDT) */}
            <div className="max-w-5xl mx-auto">
              <CryptoPriceTicker onClaimPromo={handleClaim1Win} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Casino Leaderboard & Verified Audits */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flagship Featured Partner Marketing Unit */}
        <OneWinHeroCard
          onViewReview={() => {
            onSelectReview("1win");
            onNavigate("reviews");
          }}
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase font-semibold mb-2">
              <Award className="w-4 h-4" />
              <span>Leaderboard 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ulasan Kasino Kripto Paling Terpercaya
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Diuji secara independen dengan setoran kripto riil, benchmarking kecepatan penarikan node, dan verifikasi keterbukaan algoritma seed.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-casino-home"
              type="text"
              placeholder="Cari kasino atau koin (BTC, SOL)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Casino Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCasinos.map((casino) => {
            const is1Win = casino.id === "1win";
            return (
              <article
                key={casino.id}
                id={`card-casino-${casino.id}`}
                className={`rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between ${
                  is1Win
                    ? "bg-gradient-to-b from-blue-950/40 via-slate-900/90 to-slate-900 border-2 border-blue-500/50 shadow-blue-500/10"
                    : "bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-lg shadow-inner ${
                          is1Win
                            ? "bg-blue-600 text-white shadow-blue-500/30"
                            : "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-cyan-400"
                        }`}
                      >
                        {casino.logoUrl}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">{casino.name}</h3>
                          {is1Win && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold">
                              ★ #1 PILIHAN
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {casino.kycRequirement}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{casino.tagline}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-300 font-mono">{casino.rating}</span>
                        <span className="text-[10px] text-slate-400">/5</span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 font-mono">{casino.reviewCount} ulasan</span>
                    </div>
                  </div>

                  {/* 1win Exclusive Banner on Card */}
                  {is1Win && (
                    <div className="bg-slate-950/80 border border-blue-500/30 rounded-xl p-3 mb-3 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block">
                          Voucher Resmi Aktif
                        </span>
                        <span className="text-xs font-bold text-white">
                          Kode: <strong className="text-blue-300 font-mono">{promoCode}</strong> (+500% Bonus)
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy("1win", promoCode)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors border border-blue-500/30"
                      >
                        {copiedCasinoId === "1win" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-300" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Key Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 my-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Kecepatan WD Diuji:</span>
                      <strong className="text-cyan-300 font-mono">{casino.testedWithdrawalTime}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Provably Fair:</span>
                      <strong className="text-emerald-400 font-mono">✓ 100% Algoritma Terbuka</strong>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] text-slate-400 block font-mono">VIP Rakeback / Bonus:</span>
                      <span className="text-slate-300 text-[11px] font-medium">{casino.vipRakeback}</span>
                    </div>
                  </div>

                  {/* Pros List */}
                  <ul className="space-y-1.5 mb-4">
                    {casino.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {casino.supportedCoins.slice(0, 4).map((coin) => (
                      <span key={coin} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                        {coin}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {is1Win && (
                      <button
                        id="btn-claim-1win-card"
                        onClick={() => handleClaim1Win("home_casino_card")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold font-mono transition-transform hover:scale-105 cursor-pointer shadow-md shadow-blue-600/30"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-300" />
                        <span>Klaim 500%</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      id={`btn-view-review-${casino.id}`}
                      onClick={() => {
                        onSelectReview(casino.id);
                        onNavigate("reviews");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <span>Ulasan Lengkap</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: Interactive Provably Fair Seed Calculator */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Alat Audit Kriptografis Langsung
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Jangan hanya percaya perkataan kasino. Uji sendiri matematika hash SHA-256 secara independen langsung dari peramban Anda.
            </p>
          </div>

          <ProvablyFairVerifier />
        </div>
      </section>

      {/* Section 3: Educational Guides & Technical Articles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase font-semibold mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Panduan &amp; Riset</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Edukasi Kripto Gaming &amp; Keamanan Web3
            </h2>
          </div>

          <button
            id="btn-see-all-guides"
            onClick={() => onNavigate("guides")}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>Semua Panduan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATIONAL_GUIDES.map((guide) => (
            <article
              key={guide.id}
              id={`card-guide-${guide.id}`}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {guide.thumbnailUrl && (
                  <div className="mb-3.5 rounded-xl overflow-hidden border border-slate-800/80">
                    <OptimizedImage
                      src={guide.thumbnailUrl}
                      alt={guide.title}
                      aspectRatio="16/9"
                      priority={false}
                      sizesPreset="card"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-3">
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                    {guide.category}
                  </span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-300">
                    {guide.author.avatar}
                  </div>
                  <span className="text-[11px] text-slate-400 truncate max-w-[130px]">
                    {guide.author.name}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelectGuide(guide.id);
                    onNavigate("guides");
                  }}
                  className="text-xs text-cyan-400 font-semibold hover:underline cursor-pointer"
                >
                  Baca →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Live Token Presale Radar */}
      <section className="py-12 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase font-semibold mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Radar Keamanan Token</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Peluncuran Token &amp; Presale Gaming Terbaru
              </h2>
            </div>

            <button
              onClick={() => onNavigate("launchpad")}
              className="text-xs text-cyan-400 font-semibold hover:underline cursor-pointer"
            >
              Buka Radar Lengkap →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOKEN_RADAR_ITEMS.map((token) => (
              <div
                key={token.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{token.name}</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-cyan-300">
                      ${token.symbol}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">{token.useCase}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">Safety Score:</span>
                  <span
                    className={`font-mono font-bold ${
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
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Rich FAQ Accordion with Schema.org & Google PAA Optimization */}
      <section
        id="faq-section"
        aria-label="Frequently Asked Questions"
        className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Google 'People Also Ask' &amp; Schema.org FAQPage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pertanyaan Umum Seputar Kasino Kripto &amp; 1win
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
            Jawaban terverifikasi pakar mengenai kode promo <strong className="text-cyan-300 font-mono">winpro17</strong>, kecepatan pencairan dana kripto, audit Provably Fair SHA-256, dan lisensi resmi.
          </p>
        </div>

        <div className="space-y-3">
          {FREQUENT_QUESTIONS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  isOpen
                    ? "bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/20"
                    : "bg-slate-900/50 hover:bg-slate-900/80 border-slate-800"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {(faq as any).category && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-slate-950 text-cyan-300 border border-slate-800 shrink-0">
                        {(faq as any).category}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/30">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rich Snippet Verification Footer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Diindeks ke dalam <strong className="text-slate-200">Schema.org FAQPage JSON-LD</strong> untuk Google Search Rich Snippets.
            </span>
          </div>
          <button
            onClick={() => onNavigate("seo-inspector")}
            className="text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold transition-colors cursor-pointer"
          >
            Validasi Schema di SEO Inspector →
          </button>
        </div>
      </section>
    </main>
  );
};
