import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Flame, Copy, Check, ExternalLink, X, Sparkles } from "lucide-react";

export const VipStickyBanner: React.FC = () => {
  const { langConfig, promoCode, t, handleClaim1Win } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  if (dismissed) return null;

  const handleCopyPromoCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(promoCode);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = promoCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 3800);
  };

  return (
    <aside
      id="vip-sticky-bar"
      aria-label="1win Exclusive Promotion"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-xl z-50 bg-slate-950/95 backdrop-blur-md border border-blue-500/50 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-blue-500/20 text-white animate-in slide-in-from-bottom duration-300 relative"
    >
      {/* Toast Notification when Promo Code is copied */}
      {showToast && (
        <div
          id="toast-promo-copied"
          role="status"
          aria-live="polite"
          className="absolute -top-16 left-2 right-2 sm:left-auto sm:right-0 sm:min-w-[360px] bg-slate-950/98 border border-emerald-500/60 backdrop-blur-md text-white p-3 rounded-xl shadow-2xl shadow-emerald-500/25 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-bold text-white leading-tight flex items-center gap-1.5 flex-wrap">
                <span>Kode Promo Disalin!</span>
                <span className="font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-black">
                  {promoCode}
                </span>
              </p>
              <p className="text-[10px] text-slate-300 truncate mt-0.5">
                Gunakan saat pendaftaran 1win untuk bonus +500%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                setShowToast(false);
                handleClaim1Win("toast_claim_cta");
              }}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Buka</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowToast(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-mono font-black text-white shrink-0 shadow-md shadow-blue-600/30">
            1W
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>+500% VIP BONUS</span>
              </span>
              <button
                onClick={handleCopyPromoCode}
                title="Klik untuk menyalin kode promo"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Promo:</span>
                <strong className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 font-black">
                  {promoCode}
                </strong>
              </button>
            </div>
            <p className="text-xs font-bold text-slate-100 truncate mt-0.5">
              {langConfig.oneWinBonusText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Explicit 'Copy Promo Code' button */}
          <button
            id="btn-sticky-copy-promo"
            onClick={handleCopyPromoCode}
            title={`Salin kode promo ${promoCode}`}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap border ${
              copied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                : "bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border-slate-700 hover:border-cyan-500/50"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Salin Kode</span>
                <span className="sm:hidden">Salin</span>
              </>
            )}
          </button>

          {/* Direct Claim Button */}
          <button
            id="btn-sticky-claim-promo"
            onClick={(e) => {
              handleCopyPromoCode(e);
              handleClaim1Win("sticky_banner");
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Klaim 500%</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Tutup banner penawaran"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
