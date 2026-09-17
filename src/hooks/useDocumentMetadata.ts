import { useEffect, useMemo } from "react";
import { PageRoute } from "../types";
import { CASINO_REVIEWS, EDUCATIONAL_GUIDES } from "../data/mockData";
import { useLanguage } from "../context/LanguageContext";

export interface RouteMetaConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultPath: string;
  keywords?: string[];
}

export const ROUTE_METADATA_MAP: Record<PageRoute, RouteMetaConfig> = {
  home: {
    defaultTitle: "ApexLaunch - Crypto Gaming Intelligence & SEO Platform",
    defaultDescription:
      "Global crypto gaming intelligence hub with verified 1win review, authentic +500% bonus with promo code winpro17, provably fair hash audit, and multilingual SEO architecture.",
    defaultPath: "/",
    keywords: ["crypto casino", "1win promo code", "provably fair", "winpro17", "crypto gambling audit"],
  },
  reviews: {
    defaultTitle: "Reviews - ApexLaunch",
    defaultDescription:
      "Independent cryptographic reviews and provably fair audits of global crypto casinos including 1win, BC.Game, Stake, and Rollbit.",
    defaultPath: "/reviews",
    keywords: ["casino reviews", "1win review", "bc game review", "stake review", "instant crypto withdrawal"],
  },
  guides: {
    defaultTitle: "Guides - ApexLaunch",
    defaultDescription:
      "Expert Web3 security guides, cryptographic HMAC-SHA256 verification tutorials, and VIP rakeback strategy articles.",
    defaultPath: "/guides",
    keywords: ["provably fair guide", "lucky jet strategy", "crypto casino security", "sha256 calculator"],
  },
  launchpad: {
    defaultTitle: "Launchpad Radar - ApexLaunch",
    defaultDescription:
      "Real-time security radar monitoring upcoming crypto gaming token launches, locked liquidity audits, and smart contract safety ratings.",
    defaultPath: "/launchpad",
    keywords: ["gaming token launchpad", "web3 gaming radar", "liquidity lock audit", "presale crypto"],
  },
  "anti-scam": {
    defaultTitle: "Anti-Scam Trust Hub - ApexLaunch",
    defaultDescription:
      "Official anti-scam intelligence protecting against fake task scam clones (primelaunch.vip, prime-launch) with real-time SHA-256 verifier.",
    defaultPath: "/anti-scam",
    keywords: ["anti scam crypto", "primelaunch vip scam alert", "fake task scam", "domain verification"],
  },
  about: {
    defaultTitle: "About - ApexLaunch",
    defaultDescription:
      "Learn about ApexLaunch's research team, real deposit testing methodology, CAMS compliance, and independent editorial ethics.",
    defaultPath: "/about",
    keywords: ["about apexlaunch", "eeat editorial guidelines", "crypto audit methodology"],
  },
  "seo-inspector": {
    defaultTitle: "SEO Inspector - ApexLaunch",
    defaultDescription:
      "Inspect live Schema.org JSON-LD structured data, Google Rich Snippets, and XML sitemaps for all indexed deep links.",
    defaultPath: "/seo-inspector",
    keywords: ["seo inspector", "json-ld schema tester", "google rich results audit", "sitemap generator"],
  },
};

export interface UseDocumentMetadataOptions {
  /**
   * The active page route (e.g. 'home' | 'reviews' | 'guides' | 'launchpad' | 'anti-scam' | 'about' | 'seo-inspector')
   */
  route?: PageRoute;
  /**
   * Optional sub-resource id when inside reviews (e.g. '1win', 'bc-game', 'stake')
   */
  reviewId?: string;
  /**
   * Optional sub-resource id when inside guides (e.g. '1win-lucky-jet-strategy', 'provably-fair-math')
   */
  guideId?: string;
  /**
   * Custom title override. If provided, will be used directly (or appended with brand suffix).
   */
  title?: string;
  /**
   * Custom meta description override.
   */
  description?: string;
  /**
   * Custom canonical path override (e.g. '/reviews/1win').
   */
  canonicalPath?: string;
  /**
   * Optional SEO keywords array.
   */
  keywords?: string[];
  /**
   * Brand suffix to append to titles (default: " - ApexLaunch"). Set to empty string if title is already fully qualified.
   */
  suffix?: string;
  /**
   * When true, updates the browser URL bar via history.replaceState for deep-link indexing without reloading.
   */
  syncHistory?: boolean;
}

export interface DocumentMetadataResult {
  title: string;
  description: string;
  canonicalPath: string;
  canonicalUrl: string;
  keywords: string[];
  route: PageRoute;
}

/**
 * Custom React hook that dynamically updates document.title, meta description,
 * canonical link, OpenGraph tags, Twitter cards, and browser history for optimal
 * search engine indexing of deep-linked pages.
 *
 * Example:
 *   useDocumentMetadata({ route: 'reviews', reviewId: '1win' })
 *   // Updates title to "1win Review - ApexLaunch" and meta description accordingly
 */
export function useDocumentMetadata(options: UseDocumentMetadataOptions = {}): DocumentMetadataResult {
  const {
    route = "home",
    reviewId,
    guideId,
    title: explicitTitle,
    description: explicitDescription,
    canonicalPath: explicitCanonicalPath,
    keywords: explicitKeywords,
    suffix = " - ApexLaunch",
    syncHistory = true,
  } = options;

  const { lang, langConfig } = useLanguage();

  // Compute resolved metadata
  const resolvedMeta = useMemo(() => {
    const routeConfig = ROUTE_METADATA_MAP[route] || ROUTE_METADATA_MAP.home;
    let computedTitle = routeConfig.defaultTitle;
    let computedDescription = routeConfig.defaultDescription;
    let computedPath = routeConfig.defaultPath;
    const computedKeywords = explicitKeywords || routeConfig.keywords || [];

    // Handle deep-linked sub-resources
    if (route === "reviews") {
      if (reviewId) {
        const foundReview = CASINO_REVIEWS.find((r) => r.id === reviewId || r.slug === reviewId);
        if (foundReview) {
          computedTitle = `${foundReview.name} Review${suffix}`;
          computedDescription = `Detailed audit of ${foundReview.name}: ${foundReview.rating}/5 rating, ${foundReview.payoutSpeed} payout speed, and Provably Fair verification.`;
          computedPath = `/reviews/${foundReview.slug}`;
        } else {
          computedTitle = `Reviews${suffix}`;
          computedPath = "/reviews";
        }
      } else {
        computedTitle = `Reviews${suffix}`;
        computedPath = "/reviews";
      }
    } else if (route === "guides") {
      if (guideId) {
        const foundGuide = EDUCATIONAL_GUIDES.find((g) => g.id === guideId || g.slug === guideId);
        if (foundGuide) {
          computedTitle = `${foundGuide.title}${suffix}`;
          computedDescription = foundGuide.excerpt;
          computedPath = `/guides/${foundGuide.slug}`;
        } else {
          computedTitle = `Guides${suffix}`;
          computedPath = "/guides";
        }
      } else {
        computedTitle = `Guides${suffix}`;
        computedPath = "/guides";
      }
    }

    // Apply explicit overrides if provided
    const finalTitle = explicitTitle
      ? explicitTitle.includes("ApexLaunch")
        ? explicitTitle
        : `${explicitTitle}${suffix}`
      : computedTitle;

    const finalDescription = explicitDescription || computedDescription;
    const finalPath = explicitCanonicalPath || computedPath;
    const cleanPath = finalPath.startsWith("/") ? finalPath : `/${finalPath}`;
    const baseUrl = "https://apexlaunch.io";
    const localizedCanonical = `${baseUrl}${cleanPath}${lang && lang !== "en" ? `?lang=${lang}` : ""}`;

    return {
      title: finalTitle,
      description: finalDescription,
      canonicalPath: cleanPath,
      canonicalUrl: localizedCanonical,
      keywords: computedKeywords,
      route,
    };
  }, [
    route,
    reviewId,
    guideId,
    explicitTitle,
    explicitDescription,
    explicitCanonicalPath,
    explicitKeywords,
    suffix,
    lang,
  ]);

  // Apply metadata to DOM and document head
  useEffect(() => {
    if (typeof document === "undefined") return;

    // 1. Update document.title
    document.title = resolvedMeta.title;

    // 2. Update <html> lang
    if (lang) {
      document.documentElement.lang = lang;
    }

    // 3. Helper to update/create meta tag by name
    const updateMetaByName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 4. Helper to update/create meta tag by property (OpenGraph)
    const updateMetaByProperty = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 5. Update standard meta tags
    updateMetaByName("description", resolvedMeta.description);
    if (resolvedMeta.keywords.length > 0) {
      updateMetaByName("keywords", resolvedMeta.keywords.join(", "));
    }

    // 6. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", resolvedMeta.canonicalUrl);

    // 7. Update OpenGraph tags
    updateMetaByProperty("og:title", resolvedMeta.title);
    updateMetaByProperty("og:description", resolvedMeta.description);
    updateMetaByProperty("og:url", resolvedMeta.canonicalUrl);
    if (langConfig?.ogLocale) {
      updateMetaByProperty("og:locale", langConfig.ogLocale);
    }

    // 8. Update Twitter Card tags
    updateMetaByName("twitter:title", resolvedMeta.title);
    updateMetaByName("twitter:description", resolvedMeta.description);

    // 9. Sync browser history URL for deep-linking (without triggering full-page reload)
    if (syncHistory && typeof window !== "undefined") {
      try {
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const targetSearch = lang && lang !== "en" ? `?lang=${lang}` : "";
        const targetUrl = `${resolvedMeta.canonicalPath}${targetSearch}`;

        if (currentPath !== resolvedMeta.canonicalPath || (targetSearch && !currentSearch.includes(`lang=${lang}`))) {
          window.history.replaceState({ route, path: resolvedMeta.canonicalPath }, resolvedMeta.title, targetUrl);
        }
      } catch {
        // Safe fallback in restricted iframes
      }
    }
  }, [resolvedMeta, lang, langConfig, syncHistory, route]);

  return resolvedMeta;
}

// Alias for semantic clarity
export const useRouteSeo = useDocumentMetadata;
