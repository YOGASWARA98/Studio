import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SupportedLang } from "../lib/i18n";
import { buildPageStructuredData, PageType } from "../lib/seoSchema";

interface SeoHeadManagerProps {
  title: string;
  description: string;
  canonicalPath?: string;
  pageType?: PageType;
  selectedReviewId?: string;
  selectedGuideId?: string;
  schemaJson?: Record<string, any> | Record<string, any>[];
}

declare global {
  interface Window {
    __APEX_CURRENT_SCHEMA__?: Record<string, any>;
  }
}

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  title,
  description,
  canonicalPath = "/",
  pageType = "home",
  selectedReviewId = "1win",
  selectedGuideId = "1win-lucky-jet-strategy",
  schemaJson,
}: SeoHeadManagerProps) => {
  const { lang, langConfig, promoCode } = useLanguage();

  useEffect(() => {
    // Format display title cleanly
    const displayTitle = title.includes("ApexLaunch") ? title : `${title} - ApexLaunch`;

    // 1. Update document.title
    document.title = displayTitle;

    // 2. Update <html> lang attribute
    document.documentElement.lang = lang;

    // 3. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 4. Update canonical link
    const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
    const baseUrl = "https://apexlaunch.io";
    const localizedCanonical = `${baseUrl}${cleanPath}${lang !== "en" ? `?lang=${lang}` : ""}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", localizedCanonical);

    // 5. Update / Inject Hreflang alternates for Google International SEO
    const supportedLangCodes: SupportedLang[] = ["en", "id", "es", "pt", "ru", "hi", "tr"];
    supportedLangCodes.forEach((lCode) => {
      const selector = `link[rel="alternate"][hreflang="${lCode}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "alternate");
        el.setAttribute("hreflang", lCode);
        document.head.appendChild(el);
      }
      el.setAttribute("href", `${baseUrl}${cleanPath}?lang=${lCode}`);
    });

    // x-default hreflang
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement("link");
      xDefault.setAttribute("rel", "alternate");
      xDefault.setAttribute("hreflang", "x-default");
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute("href", `${baseUrl}${cleanPath}`);

    // 6. Update OpenGraph tags
    const updateOg = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };

    updateOg("og:title", displayTitle);
    updateOg("og:description", description);
    updateOg("og:url", localizedCanonical);
    updateOg("og:locale", langConfig.ogLocale);

    // 7. Update Twitter cards
    const updateTwitter = (name: string, val: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };
    updateTwitter("twitter:title", displayTitle);
    updateTwitter("twitter:description", description);

    // 8. Inject Master Schema.org JSON-LD (Guarantees Organization, WebSite, and Review types)
    let scriptTag = document.getElementById("apex-dynamic-schema");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "apex-dynamic-schema";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }

    const fullStructuredData = buildPageStructuredData({
      pageType,
      title,
      description,
      canonicalPath,
      selectedReviewId,
      selectedGuideId,
      lang,
      promoCode,
      customSchema: schemaJson,
    });

    scriptTag.textContent = JSON.stringify(fullStructuredData, null, 2);

    // Store in window for live SEO Inspector testing & verification
    if (typeof window !== "undefined") {
      window.__APEX_CURRENT_SCHEMA__ = fullStructuredData;
      window.dispatchEvent(
        new CustomEvent("apex:schema-updated", { detail: fullStructuredData })
      );
    }
  }, [
    title,
    description,
    canonicalPath,
    pageType,
    selectedReviewId,
    selectedGuideId,
    schemaJson,
    lang,
    langConfig,
    promoCode,
  ]);

  return null;
};
