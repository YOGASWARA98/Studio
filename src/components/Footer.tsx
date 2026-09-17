import React from "react";
import { PageRoute } from "../types";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, Lock, ExternalLink, AlertTriangle, CheckCircle, Flame } from "lucide-react";

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onSelectReview?: (reviewId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectReview }) => {
  const { promoCode, handleClaim1Win } = useLanguage();

  return (
    <footer id="apex-footer" className="bg-slate-950 border-t border-slate-900 mt-20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & E-E-A-T Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight font-sans">
                ApexLaunch<span className="text-cyan-400">.io</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Platform intelijen independen dan pengujian provably fair kasino kripto global. Bebas dari manipulasi rating berbayar dengan transparansi matematika algoritma seed SHA-256.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Domain Otoritas Terverifikasi Bebas Scam</span>
            </div>
            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>

          {/* Col 2: Navigasi Cepat & 1win Review */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-4">
              Navigasi Halaman Utama
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Beranda &amp; Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectReview) onSelectReview("1win");
                    onNavigate("reviews");
                  }}
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors text-left cursor-pointer"
                >
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Ulasan 1win 2026 (+500% VIP)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("reviews")}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Daftar Semua Ulasan Kasino Kripto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("guides")}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Panduan Provably Fair &amp; Lucky Jet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("launchpad")}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Radar Token &amp; Presale Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("anti-scam")}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Hub Klarifikasi Anti-Scam
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("seo-inspector")}
                  className="hover:text-cyan-400 transition-colors text-left text-emerald-400 font-medium cursor-pointer"
                >
                  Audit SEO Skor 100/100 &amp; Schema
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Indeksasi & Crawl Teknis */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-4">
              Indeksasi Google &amp; SEO
            </h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <span>Peta Situs XML (/sitemap.xml)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <span>Petunjuk Crawler (/robots.txt)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li className="text-slate-400">
                <span>Hreflang: EN, ID, ES, PT, RU, HI, TR</span>
              </li>
              <li className="text-slate-400">
                <span>Schema: Organization, Review, Offer</span>
              </li>
              <li className="text-emerald-400 font-semibold">
                <span>SEO Score: 100/100 (Google SERP Ready)</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleClaim1Win("footer_link")}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-bold font-mono cursor-pointer"
                >
                  <span>1win Partner Link (Kode: {promoCode})</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Responsible Gaming & Legal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-4">
              Tanggung Jawab &amp; Regulasi 18+
            </h4>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Peringatan Risiko 18+</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Crypto gaming dan taruhan melibatkan risiko finansial nyata. Hanya bertaruh dengan dana yang Anda siap untuk kehilangan. Kunjungi BeGambleAware.org jika memerlukan bantuan.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>TLS 1.3 / 256-bit Encrypted Delivery</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer on Phishing & Domain Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © 2026 <strong>ApexLaunch.io</strong>. Hak cipta dilindungi undang-undang. Platform riset gaming terdesentralisasi.
          </p>
          <p className="text-slate-400 max-w-xl text-center md:text-right">
            <strong>Pemberitahuan Khusus:</strong> ApexLaunch.io adalah entitas riset mandiri dan tidak terafiliasi dengan primelaunch.vip, prime-launch.com, atau situs phishing &quot;task reward scam&quot; lainnya.
          </p>
        </div>
      </div>
    </footer>
  );
};
