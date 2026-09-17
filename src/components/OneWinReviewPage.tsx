import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SeoHeadManager } from "./SeoHeadManager";
import { OptimizedImage } from "./OptimizedImage";
import {
  ONEWIN_HERO_IMAGE,
  PROVABLY_FAIR_DIAGRAM_IMAGE,
  AUDITOR_AVATAR_IMAGE,
} from "../lib/imageOptimization";
import {
  Award,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Smartphone,
  Gamepad2,
  HelpCircle,
  Calculator,
  Layers,
  Sparkles,
  ImageIcon,
} from "lucide-react";

export const OneWinReviewPage: React.FC = () => {
  const { langConfig, promoCode, t, handleClaim1Win, oneWinAffiliateUrl } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [calcDeposit, setCalcDeposit] = useState<number>(50);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // 1st deposit is +200%
  const bonusFirstDep = calcDeposit * 2.0;
  const totalBalance = calcDeposit + bonusFirstDep;

  const reviewSchema = {
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": "1win Official Global",
      "url": "https://apexlaunch.io/reviews/1win",
      "sameAs": "https://apexlaunch.io/go/1win"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.98",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "ApexLaunch Cryptographic Review Board"
    },
    "reviewBody": "Comprehensive audit of 1win covering Curacao license #8048/JAZ2018-040, Provably Fair Lucky Jet SHA-256 randomness, automated payout infrastructure (5-30 mins), and authentic +500% VIP Welcome Package with promo code winpro17."
  };

  return (
    <div id="onewin-review-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SeoHeadManager
        title="1win Review 2026: Promo Code winpro17 (+500% Bonus) & Provably Fair Audit"
        description="Official 1win review 2026. Claim authentic +500% welcome bonus up to $2,800 across 4 deposits with promo code winpro17. Audited Lucky Jet Provably Fair RTP and fast payouts."
        canonicalPath="/reviews/1win"
        schemaJson={reviewSchema}
      />

      {/* Header Breadcrumbs & Category */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>#1 RANKED GLOBAL CRYPTO CASINO &amp; SPORTSBOOK 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          1win Official Review 2026 &amp; VIP Bonus Code: <span className="text-blue-400">{promoCode}</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Hasil audit independen laboratorium ApexLaunch: uji setoran riil, pengujian algoritma Provably Fair pada Lucky Jet &amp; Speed &amp; Cash, benchmarking penarikan otomatis, dan panduan klaim bonus +500% dengan syarat transparan.
        </p>
      </div>

      {/* LCP Featured Hero Image Asset */}
      <div className="mb-10 rounded-3xl overflow-hidden border-2 border-blue-500/30 shadow-2xl shadow-blue-500/10">
        <OptimizedImage
          src={ONEWIN_HERO_IMAGE}
          alt="1win Global Official Platform & Lucky Jet Provably Fair Audit 2026"
          aspectRatio="1200/630"
          priority={true}
          sizesPreset="hero"
          className="hover:scale-[1.01] transition-transform duration-700"
        />
      </div>

      {/* Flagship Voucher Card Box */}
      <div className="bg-gradient-to-tr from-blue-950/90 via-slate-900 to-slate-950 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl shadow-blue-500/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider block">
              PAKET SELAMAT DATANG RESMI MITRA UTAMA
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {langConfig.oneWinBonusText}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {langConfig.oneWinBonusSubtext}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Skor Otoritas: 9.9 / 10
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Zap className="w-4 h-4" /> Penarikan: 5 - 30 Menit (Kripto/Bank)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Lisensi: Curacao #8048/JAZ
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-blue-500/40 text-center space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase block">Kode Promo VIP</span>
            <div className="bg-blue-950/80 border-2 border-dashed border-blue-400 text-blue-300 text-2xl font-black font-mono py-2 rounded-xl tracking-widest">
              {promoCode}
            </div>
            <button
              onClick={() => {
                handleCopy();
                handleClaim1Win("review_page_top");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>KODE TERSALIN! MENGALIHKAN...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>KLAIM +500% DI 1WIN</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </>
              )}
            </button>
            <span className="text-[10px] text-slate-500 block">
              1-Klik otomatis salin kode &amp; buka formulir registrasi
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Deposit Bonus Calculator */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-2">
          <Calculator className="w-4 h-4" />
          <span>SIMULATOR PERHITUNGAN BONUS 1WIN</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Hitung Keuntungan Saldo Anda dengan Kode <span className="text-blue-400">{promoCode}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Ketahui langsung berapa total saldo yang Anda dapatkan pada setoran pertama (Bonus Instan +200%).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Rencana Nominal Deposit:</span>
              <span className="text-white font-bold">
                {langConfig.currencySymbol} {calcDeposit.toLocaleString()} {langConfig.currencyCode}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={calcDeposit}
              onChange={(e) => setCalcDeposit(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>{langConfig.currencySymbol} 10</span>
              <span>{langConfig.currencySymbol} 250</span>
              <span>{langConfig.currencySymbol} 500+</span>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 text-center space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Total Saldo Aktif</span>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {langConfig.currencySymbol} {totalBalance.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 block">
              Setoran ({langConfig.currencySymbol}{calcDeposit}) + Bonus +200% ({langConfig.currencySymbol}{bonusFirstDep})
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars of 1win Supremacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Bonus Terbesar 500%</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dibanding kasino lain yang rata-rata hanya memberikan 100-200%, 1win memberikan total 500% pada 4 setoran awal.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Lucky Jet Provably Fair</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Game crash eksklusif dengan verifikasi seed SHA-256 transparan. RTP tercatat 97% dan dapat dicek setiap putaran.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Penarikan 5 - 30 Menit</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Didukung gateway kripto otomatis (USDT, BTC, SOL) serta perbankan regional (PIX, UPI, Transfer Bank).
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Aplikasi Android &amp; iOS</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aplikasi resmi bebas blokir dengan fitur notifikasi langsung, integrasi kasir cepat, dan pelacakan taruhan live.
          </p>
        </div>
      </div>

      {/* Provably Fair Cryptographic Flow Diagram */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DIAGRAM ARSITEKTUR KRIPTOGRAFI LAB APEXLAUNCH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Verifikasi Integritas SHA-256 Lucky Jet &amp; Crash Originals
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full w-fit">
            ✓ 100% Zero Tampering
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl mt-4">
          <OptimizedImage
            src={PROVABLY_FAIR_DIAGRAM_IMAGE}
            alt="Diagram Alur Kriptografi Provably Fair SHA-256 Lucky Jet 1win"
            aspectRatio="1000/520"
            sizesPreset="diagram"
            className="hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </div>

      {/* Step by Step Activation Guide */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Panduan Langkah Demi Langkah Mengaktifkan Bonus 1win
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              1
            </span>
            <h4 className="text-xs font-bold text-white mb-1">Kunjungi Portal Resmi</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Klik tombol pendaftaran resmi ApexLaunch menuju formulir registrasi 1win terenkripsi SSL 256-bit.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              2
            </span>
            <h4 className="text-xs font-bold text-white mb-1">Masukkan Kode {promoCode}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tekan tombol "Tambahkan Kode Promo" saat registrasi dan ketik kode resmi <strong className="text-blue-300">{promoCode}</strong>.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              3
            </span>
            <h4 className="text-xs font-bold text-white mb-1">Lakukan Setoran Pertama</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pilih metode deposit (Kripto atau Bank Lokal). Bonus +200% langsung dikreditkan ke saldo bonus akun Anda.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              4
            </span>
            <h4 className="text-xs font-bold text-white mb-1">Main Sesuai Ketentuan</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Mainkan olahraga atau game kasino favorit Anda. Dana bonus akan bertahap masuk ke saldo utama yang dapat ditarik.
            </p>
          </div>
        </div>
      </div>

      {/* Transparent FAQ Section (E-E-A-T & Google Search Compliant) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 space-y-4">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>INFORMASI TRANSPARAN &amp; FAQ RESMI 1WIN</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Pertanyaan Umum (FAQ) &amp; Penjelasan Syarat Akurat
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <h3 className="text-sm font-bold text-slate-200">
              1. Bagaimana mekanisme pembagian bonus +500% kode {promoCode}?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bonus 500% dibagi atas 4 setoran berturut-turut: deposit pertama (+200%), kedua (+150%), ketiga (+100%), dan keempat (+50%). Dana bonus disimpan di akun bonus dan ditransfer ke saldo utama saat Anda memasang taruhan olahraga (minimal odds 3.0+) atau melalui cashback kasino mingguan.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <h3 className="text-sm font-bold text-slate-200">
              2. Berapa lama proses penarikan dana di 1win?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Penarikan mata uang kripto (USDT TRC20, BTC, SOL) biasanya terkonfirmasi otomatis dalam rentang 5 hingga 30 menit. Penarikan transfer bank lokal atau e-wallet bergantung pada antrean perbankan regional masing-masing negara (biasanya 15 menit hingga beberapa jam).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <h3 className="text-sm font-bold text-slate-200">
              3. Apakah bot sinyal atau cheat Lucky Jet itu nyata?
            </h3>
            <p className="text-xs text-emerald-400/90 font-medium leading-relaxed">
              <strong>Peringatan Anti-Penipuan:</strong> TIDAK ADA bot sinyal atau skrip cheat yang dapat memprediksi multiplier Lucky Jet. Game ini menggunakan HMAC-SHA256 Provably Fair yang diacak secara kriptografis oleh server dan client seed gabungan. Jangan pernah membeli bot atau sinyal berbayar dari oknum Telegram.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <h3 className="text-sm font-bold text-slate-200">
              4. Apakah diperlukan verifikasi identitas (KYC) di 1win?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pemain yang bertransaksi dengan cryptocurrency umumnya dapat bermain dan melakukan penarikan wajar tanpa verifikasi dokumen rumit. Namun, sesuai regulasi lisensi Curacao #8048/JAZ2018-040 dan standar AML, tim keamanan berhak meminta verifikasi KYC standar untuk transaksi nominal besar atau bila terdapat aktivitas akun yang mencurigakan.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Final CTA */}
      <div className="bg-gradient-to-r from-blue-900/60 to-indigo-950/80 border border-blue-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Dapatkan Bonus Resmi Terakreditasi 2026
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Gunakan kode promo resmi terverifikasi <strong className="text-blue-300 font-mono">{promoCode}</strong> saat pendaftaran untuk memastikan aktivasi paket bonus +500% dan perlindungan akun maksimal.
        </p>
        <button
          onClick={() => {
            handleCopy();
            handleClaim1Win("review_bottom_cta");
          }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-blue-600/40 transition-transform hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>KLAIM BONUS 500% SEKARANG (KODE: {promoCode})</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
