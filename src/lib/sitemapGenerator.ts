import { CASINO_REVIEWS, EDUCATIONAL_GUIDES, TOKEN_RADAR_ITEMS } from "../data/mockData";
import { SupportedLang } from "./i18n";

export interface CrawledRoute {
  path: string;
  category: "core" | "review" | "guide" | "radar" | "landing";
  priority: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  lastmod: string;
  sourceFiles?: string[];
  fileSystemLastModifiedMs?: number;
  title: string;
  description: string;
  images?: {
    loc: string;
    title: string;
    caption?: string;
  }[];
  isIndexable: boolean;
}

export interface CrawledSitemapReport {
  generatedAt: string;
  baseUrl: string;
  totalRoutes: number;
  totalLocalizedUrls: number;
  supportedLanguages: SupportedLang[];
  routesByCategory: Record<string, number>;
  routes: CrawledRoute[];
  xml: string;
  sitemapIndexXml: string;
  latestSystemModTime: string;
}

export type FileModResolver = (
  filePaths: string[]
) => { lastmod: string; mtimeMs?: number } | string | null;

export const SUPPORTED_LANGUAGES: SupportedLang[] = ["en", "id", "es", "pt", "ru", "hi", "tr"];
export const DEFAULT_BASE_URL = "https://apexlaunch.io";

/**
 * Mapping of application routes to physical source files on the file system.
 * The sitemap generator inspects modification times of these files to determine exact lastmod.
 */
export const ROUTE_SOURCE_FILES_MAP: Record<string, string[]> = {
  "/": [
    "src/components/HomePage.tsx",
    "src/components/OneWinHeroCard.tsx",
    "src/components/CryptoPriceTicker.tsx",
    "src/data/mockData.ts",
    "src/App.tsx",
    "index.html",
  ],
  "/reviews": [
    "src/components/ReviewsPage.tsx",
    "src/data/mockData.ts",
    "src/lib/seoSchema.ts",
  ],
  "/guides": [
    "src/components/GuidesPage.tsx",
    "src/data/mockData.ts",
    "src/lib/seoSchema.ts",
  ],
  "/launchpad-radar": [
    "src/components/LaunchpadRadarPage.tsx",
    "src/data/mockData.ts",
  ],
  "/anti-scam-trust-hub": [
    "src/components/AntiScamTrustHubPage.tsx",
    "src/App.tsx",
  ],
  "/about-editorial-eeat": [
    "src/components/AboutPage.tsx",
    "src/App.tsx",
  ],
  "/1win-promo-code": [
    "src/components/OneWinHeroCard.tsx",
    "src/components/HomePage.tsx",
    "src/data/mockData.ts",
  ],
  "/seo-inspector": [
    "src/components/SeoInspectorPage.tsx",
    "src/components/SitemapGeneratorView.tsx",
    "src/lib/sitemapGenerator.ts",
    "src/lib/seoSchema.ts",
  ],
};

/**
 * Resolves all relevant source files for a given route path and category
 */
export function getRouteSourceFiles(routePath: string, category: string): string[] {
  if (ROUTE_SOURCE_FILES_MAP[routePath]) {
    return ROUTE_SOURCE_FILES_MAP[routePath];
  }

  if (category === "review") {
    if (routePath.includes("1win")) {
      return [
        "src/components/OneWinReviewPage.tsx",
        "src/components/OneWinHeroCard.tsx",
        "src/components/ProvablyFairVerifier.tsx",
        "src/data/mockData.ts",
      ];
    }
    return ["src/components/ReviewsPage.tsx", "src/data/mockData.ts"];
  }

  if (category === "guide") {
    if (routePath.includes("provably-fair") || routePath.includes("lucky-jet") || routePath.includes("hmac")) {
      return [
        "src/components/GuidesPage.tsx",
        "src/components/ProvablyFairVerifier.tsx",
        "src/data/mockData.ts",
      ];
    }
    return ["src/components/GuidesPage.tsx", "src/data/mockData.ts"];
  }

  if (category === "radar") {
    return ["src/components/LaunchpadRadarPage.tsx", "src/data/mockData.ts"];
  }

  if (category === "landing") {
    return ["src/components/OneWinHeroCard.tsx", "src/data/mockData.ts"];
  }

  return ["src/App.tsx", "src/data/mockData.ts"];
}

/**
 * Automatically crawls and discovers all active routes, review pages, guides,
 * and radar items across the application, resolving lastmod from the file system.
 */
export function crawlActiveRoutes(fileModResolver?: FileModResolver): CrawledRoute[] {
  const defaultIsoDate = new Date().toISOString().split("T")[0];

  const resolveLastMod = (files: string[], defaultDate = defaultIsoDate) => {
    if (fileModResolver) {
      try {
        const res = fileModResolver(files);
        if (res) {
          if (typeof res === "string") {
            return { lastmod: res, mtimeMs: undefined };
          }
          return { lastmod: res.lastmod || defaultDate, mtimeMs: res.mtimeMs };
        }
      } catch {
        // fallback
      }
    }
    return { lastmod: defaultDate, mtimeMs: undefined };
  };

  const rawRouteDefinitions: Array<{
    path: string;
    category: CrawledRoute["category"];
    priority: string;
    changefreq: CrawledRoute["changefreq"];
    title: string;
    description: string;
    images?: CrawledRoute["images"];
    isIndexable: boolean;
  }> = [
    // 1. Core Hub Routes
    {
      path: "/",
      category: "core",
      priority: "1.0",
      changefreq: "daily",
      title: "ApexLaunch - Crypto Gaming Intelligence & 1win VIP Review Platform",
      description: "Audited crypto gaming research portal, real deposit benchmarks, 1win promo code winpro17 +500% bonus, and Provably Fair hash verification.",
      images: [
        {
          loc: "https://apexlaunch.io/og-image.png",
          title: "ApexLaunch Intelligence Hub 2026",
          caption: "Crypto Gaming Research & Audited Bonuses",
        },
      ],
      isIndexable: true,
    },
    {
      path: "/reviews",
      category: "core",
      priority: "0.95",
      changefreq: "daily",
      title: "Audited Crypto Casino Reviews 2026 - Provably Fair & Liquidity Benchmarks",
      description: "Unbiased cryptographic audits of 1win, BC.Game, Stake, Bitstarz, and Rollbit. Real withdrawal speeds and bonus terms.",
      isIndexable: true,
    },
    {
      path: "/guides",
      category: "core",
      priority: "0.9",
      changefreq: "weekly",
      title: "Crypto Gaming & Technical Guides - Provably Fair Mathematics & Safety",
      description: "Educational deep dives into HMAC-SHA256 seed verification, crash algorithms, bankroll mathematics, and anti-scam protection.",
      isIndexable: true,
    },
    {
      path: "/launchpad-radar",
      category: "radar",
      priority: "0.85",
      changefreq: "daily",
      title: "Web3 Gaming Launchpad Radar - Presale Audits & Liquidity Lock Tracker",
      description: "Real-time security auditing for gaming tokens, smart contract vulnerability scans, and honeypot detection.",
      isIndexable: true,
    },
    {
      path: "/anti-scam-trust-hub",
      category: "core",
      priority: "0.9",
      changefreq: "monthly",
      title: "Anti-Scam Trust Hub & Official Transparency Statement - ApexLaunch.io",
      description: "Official clarification and user protection advisory regarding task scam impersonation and domain separation.",
      isIndexable: true,
    },
    {
      path: "/about-editorial-eeat",
      category: "core",
      priority: "0.8",
      changefreq: "monthly",
      title: "About Us & E-E-A-T Editorial Standards - ApexLaunch Intelligence Labs",
      description: "Meet our cryptographic research team, real deposit testing protocols, and commitment to objective reporting.",
      isIndexable: true,
    },
    {
      path: "/1win-promo-code",
      category: "landing",
      priority: "1.0",
      changefreq: "daily",
      title: "1win Promo Code 2026: winpro17 (+500% VIP Bonus up to $2,800)",
      description: "Official 1win bonus voucher winpro17. Unlock +500% deposit package across 4 tiers, 30% weekly cashback, and instant registration.",
      images: [
        {
          loc: "https://apexlaunch.io/1win-hero-voucher.png",
          title: "1win Official Promo Code winpro17",
          caption: "+500% Welcome Bonus Package Verified",
        },
      ],
      isIndexable: true,
    },
    {
      path: "/seo-inspector",
      category: "core",
      priority: "0.75",
      changefreq: "weekly",
      title: "Live SEO Inspector & Bot Indexing Validator - ApexLaunch.io",
      description: "Real-time verification tool for Schema.org JSON-LD, multi-lingual hreflang headers, and XML sitemaps.",
      isIndexable: true,
    },
  ];

  // 2. Dynamic Casino Review Routes (Crawled from CASINO_REVIEWS data)
  CASINO_REVIEWS.forEach((casino) => {
    const isPrimary1Win = casino.id === "1win";
    rawRouteDefinitions.push({
      path: `/reviews/${casino.slug}`,
      category: "review",
      priority: isPrimary1Win ? "1.0" : "0.85",
      changefreq: isPrimary1Win ? "daily" : "weekly",
      title: `${casino.name} Review 2026: Rating ${casino.rating}/5 & Cryptographic Audit`,
      description: `Comprehensive audit of ${casino.name}: License ${casino.license}, tested withdrawal time (${casino.testedWithdrawalTime}), Provably Fair status, and verified bonus terms.`,
      images: [
        {
          loc: `https://apexlaunch.io/logos/${casino.slug}-badge.png`,
          title: `${casino.name} Audited Seal 2026`,
          caption: `Security score: ${casino.securityScore}/100`,
        },
      ],
      isIndexable: true,
    });
  });

  // 3. Dynamic Educational Guide Routes (Crawled from EDUCATIONAL_GUIDES data)
  EDUCATIONAL_GUIDES.forEach((guide) => {
    const isLuckyJet = guide.id.includes("lucky-jet");
    rawRouteDefinitions.push({
      path: `/guides/${guide.slug || guide.id}`,
      category: "guide",
      priority: isLuckyJet ? "0.95" : "0.85",
      changefreq: "weekly",
      title: guide.title,
      description: guide.excerpt,
      images: [
        {
          loc: `https://apexlaunch.io/guides/${guide.id}-infographic.png`,
          title: guide.title,
          caption: `By ${guide.author.name} (${guide.readTime})`,
        },
      ],
      isIndexable: true,
    });
  });

  // 4. Dynamic Token Radar Item Deep-Link Routes (Crawled from TOKEN_RADAR_ITEMS)
  TOKEN_RADAR_ITEMS.forEach((token) => {
    rawRouteDefinitions.push({
      path: `/launchpad-radar?token=${token.symbol.toLowerCase()}`,
      category: "radar",
      priority: "0.7",
      changefreq: "weekly",
      title: `${token.name} (${token.symbol}) Presale Security Audit - ApexLaunch Radar`,
      description: `Smart contract safety score: ${token.safetyScore}/100, Chain: ${token.chain}, Liquidity lock: ${token.liquidityLockDays} days, Audit: ${token.auditFirm}.`,
      isIndexable: true,
    });
  });

  return rawRouteDefinitions.map((def) => {
    const sourceFiles = getRouteSourceFiles(def.path, def.category);
    const modResult = resolveLastMod(sourceFiles);

    return {
      ...def,
      lastmod: modResult.lastmod,
      sourceFiles,
      fileSystemLastModifiedMs: modResult.mtimeMs,
    };
  });
}

/**
 * Generates dynamic, compliant XML Sitemap with multi-language hreflang alternates,
 * Google Image Search extensions, and file system modification timestamps (lastmod).
 */
export function generateDynamicSitemapXml(
  baseUrl = DEFAULT_BASE_URL,
  fileModResolver?: FileModResolver
): string {
  const routes = crawlActiveRoutes(fileModResolver);

  const xmlEntries = routes
    .map((route) => {
      const fullUrl = `${baseUrl}${route.path}`;
      const queryJoin = route.path.includes("?") ? "&amp;" : "?";

      // Hreflang alternates for all supported languages
      const hreflangTags = SUPPORTED_LANGUAGES.map(
        (lang) =>
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${route.path}${queryJoin}lang=${lang}" />`
      ).join("\n");

      // x-default hreflang tag
      const xDefaultTag = `    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}" />`;

      // Google Image extension tags (if route contains images)
      const imageTags = (route.images || [])
        .map(
          (img) =>
            `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>${img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ""}
    </image:image>`
        )
        .join("\n");

      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${hreflangTags}
${xDefaultTag}${imageTags ? `\n${imageTags}` : ""}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-image/1.1
                            http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
<!-- ApexLaunch.io Dynamic Master Sitemap - File System Modification Times (lastmod) Active -->
${xmlEntries}
</urlset>`;
}

/**
 * Generates XML Sitemap Index for large search engine architectures
 */
export function generateSitemapIndexXml(
  baseUrl = DEFAULT_BASE_URL,
  fileModResolver?: FileModResolver
): string {
  const routes = crawlActiveRoutes(fileModResolver);
  // Find latest lastmod among all routes
  let latestDate = new Date().toISOString().split("T")[0];
  if (routes.length > 0) {
    const dates = routes.map((r) => r.lastmod).filter(Boolean);
    if (dates.length > 0) {
      latestDate = dates.sort().reverse()[0];
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Master index referencing live sitemap with latest workspace modification time -->
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${latestDate}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Generates an end-to-end audit report for the crawler
 */
export function generateSitemapReport(
  baseUrl = DEFAULT_BASE_URL,
  fileModResolver?: FileModResolver
): CrawledSitemapReport {
  const routes = crawlActiveRoutes(fileModResolver);
  const routesByCategory: Record<string, number> = {};

  routes.forEach((r) => {
    routesByCategory[r.category] = (routesByCategory[r.category] || 0) + 1;
  });

  // Each route has 1 default canonical + 7 language alternate versions
  const totalLocalizedUrls = routes.length * (SUPPORTED_LANGUAGES.length + 1);

  // Find latest system mod time
  let latestSystemModTime = new Date().toISOString();
  if (routes.length > 0) {
    const dates = routes.map((r) => r.lastmod).filter(Boolean);
    if (dates.length > 0) {
      latestSystemModTime = dates.sort().reverse()[0];
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    baseUrl,
    totalRoutes: routes.length,
    totalLocalizedUrls,
    supportedLanguages: SUPPORTED_LANGUAGES,
    routesByCategory,
    routes,
    xml: generateDynamicSitemapXml(baseUrl, fileModResolver),
    sitemapIndexXml: generateSitemapIndexXml(baseUrl, fileModResolver),
    latestSystemModTime,
  };
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
