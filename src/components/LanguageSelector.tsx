import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SUPPORTED_LANGUAGES, SupportedLang } from "../lib/i18n";
import { Check, ChevronDown, Sparkles } from "lucide-react";

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const {
    lang,
    setLang,
    langConfig,
    isAutoDetected,
    detectedBrowserLang,
    resetToBrowserLanguage,
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLang) => {
    setLang(code);
    setIsOpen(false);
  };

  const handleAutoDetect = () => {
    resetToBrowserLanguage();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="language-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-sm">{langConfig.flag}</span>
        {!compact && <span className="font-medium">{langConfig.nativeName}</span>}
        {compact && <span className="font-bold uppercase">{langConfig.code}</span>}
        {isAutoDetected && (
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
            AUTO
          </span>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl shadow-cyan-950/40 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-800/80 mb-1.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                Region &amp; Language
              </span>
              <span className="text-[11px] text-slate-400 block">Browser auto-detection enabled</span>
            </div>
            {isAutoDetected && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Browser Auto
              </span>
            )}
          </div>

          {/* Quick Browser Auto-Detect Reset Button */}
          <button
            type="button"
            onClick={handleAutoDetect}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left mb-1.5 border ${
              isAutoDetected
                ? "bg-slate-900/90 text-cyan-300 border-cyan-500/30 font-medium"
                : "bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800/80"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className={`w-3.5 h-3.5 ${isAutoDetected ? "text-cyan-400" : "text-slate-500"}`} />
              <div>
                <span className="block font-mono text-[11px]">
                  Deteksi Browser ({detectedBrowserLang.toUpperCase()})
                </span>
                <span className="block text-[10px] text-slate-500">
                  {SUPPORTED_LANGUAGES[detectedBrowserLang]?.nativeName || "Auto-detect"}
                </span>
              </div>
            </div>
            {isAutoDetected && <span className="text-[10px] font-mono text-emerald-400 font-bold">Aktif</span>}
          </button>

          <div className="space-y-0.5 max-h-64 overflow-y-auto pr-0.5">
            {Object.values(SUPPORTED_LANGUAGES).map((item) => {
              const isSelected = item.code === lang && !isAutoDetected;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/20"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <span className="block font-sans text-xs">{item.nativeName}</span>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        {item.name} ({item.currencyCode})
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
