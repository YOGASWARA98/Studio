import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SupportedLang,
  SUPPORTED_LANGUAGES,
  I18N_TRANSLATIONS,
  autoDetectBrowserLanguage,
  resolveInitialLanguage,
  LangConfig,
} from "../lib/i18n";

// Re-export the standalone utility for direct imports
export { autoDetectBrowserLanguage };

export interface LanguageContextType {
  lang: SupportedLang;
  langConfig: LangConfig;
  setLang: (lang: SupportedLang) => void;
  t: (key: string) => string;
  promoCode: string;
  oneWinAffiliateUrl: string;
  handleClaim1Win: (source?: string) => void;
  /**
   * Utility to re-trigger browser language auto-detection and update the context immediately.
   */
  autoDetectLanguage: () => SupportedLang;
  /**
   * Resets any manual override and reapplies the browser's detected language.
   */
  resetToBrowserLanguage: () => SupportedLang;
  /**
   * The pure auto-detected browser language code without manual overrides.
   */
  detectedBrowserLang: SupportedLang;
  /**
   * Whether the active language was automatically set via browser auto-detection.
   */
  isAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State: Run detection immediately on initial render
  const initialResolved = resolveInitialLanguage();
  const [lang, setLangState] = useState<SupportedLang>(() => initialResolved.lang);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => initialResolved.isAutoDetected);
  const [detectedBrowserLang, setDetectedBrowserLang] = useState<SupportedLang>(() => autoDetectBrowserLanguage());

  const promoCode = "winpro17";
  const oneWinAffiliateUrl = `/go/1win?promo=${promoCode}&lang=${lang}`;

  /**
   * Core utility to auto-detect browser language and update the i18n context automatically
   * without requiring user manual intervention.
   */
  const autoDetectLanguage = useCallback((): SupportedLang => {
    const detected = autoDetectBrowserLanguage();
    setDetectedBrowserLang(detected);
    setLangState(detected);
    setIsAutoDetected(true);

    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
    }

    try {
      localStorage.setItem("apex_user_lang", detected);
      localStorage.removeItem("apex_lang_manual_override");
    } catch {
      // ignore
    }

    return detected;
  }, []);

  /**
   * Utility to clear manual override and auto-detect fresh from browser
   */
  const resetToBrowserLanguage = useCallback((): SupportedLang => {
    try {
      localStorage.removeItem("apex_lang_manual_override");
      localStorage.removeItem("apex_user_lang");
    } catch {
      // ignore
    }
    return autoDetectLanguage();
  }, [autoDetectLanguage]);

  // Initial page load effect: executes auto-detection utility and synchronizes DOM
  useEffect(() => {
    const resolved = resolveInitialLanguage();
    setLangState(resolved.lang);
    setIsAutoDetected(resolved.isAutoDetected);
    setDetectedBrowserLang(autoDetectBrowserLanguage());

    // Synchronize <html lang="..."> attribute in document root
    if (typeof document !== "undefined") {
      document.documentElement.lang = resolved.lang;
    }
  }, []);

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    setIsAutoDetected(false);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
    try {
      localStorage.setItem("apex_user_lang", newLang);
      localStorage.setItem("apex_lang_manual_override", "true");
      // Update URL query param without full reload
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLang);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const dict = I18N_TRANSLATIONS[lang] || I18N_TRANSLATIONS["en"];
    return dict[key] || I18N_TRANSLATIONS["en"][key] || key;
  };

  const handleClaim1Win = (source = "banner") => {
    try {
      navigator.clipboard.writeText(promoCode);
    } catch {
      // ignore
    }
    window.open(
      `/go/1win?promo=${promoCode}&lang=${lang}&sub1=apex&sub2=${encodeURIComponent(source)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const langConfig = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES["en"];

  return (
    <LanguageContext.Provider
      value={{
        lang,
        langConfig,
        setLang,
        t,
        promoCode,
        oneWinAffiliateUrl,
        handleClaim1Win,
        autoDetectLanguage,
        resetToBrowserLanguage,
        detectedBrowserLang,
        isAutoDetected,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

