import { CASINO_REVIEWS, EDUCATIONAL_GUIDES } from "../data/mockData";
import { CasinoReview } from "../types";

/**
 * Standard Schema.org Organization for ApexLaunch.io
 * Meets Google Search E-E-A-T and Knowledge Graph requirements.
 */
export const APEX_ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": "https://apexlaunch.io/#organization",
  "name": "ApexLaunch.io",
  "legalName": "ApexLaunch Global Labs Ltd.",
  "alternateName": ["ApexLaunch", "ApexLaunch Intelligence", "ApexLaunch Crypto Audits"],
  "url": "https://apexlaunch.io/",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://apexlaunch.io/#logo",
    "url": "https://apexlaunch.io/assets/logo.png",
    "caption": "ApexLaunch.io Independent Crypto Gaming & Sportsbook Audit Portal",
    "width": "512",
    "height": "512"
  },
  "image": "https://apexlaunch.io/assets/logo.png",
  "description": "Independent cryptographic audit board, provably fair hash verification platform, and crypto gaming benchmark laboratory.",
  "foundingDate": "2024-03-01",
  "founder": {
    "@type": "Person",
    "name": "Dr. Aris Thorne",
    "jobTitle": "Lead Cryptographic Auditor"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "editorial and verification team",
    "email": "audit@apexlaunch.io",
    "url": "https://apexlaunch.io/anti-scam-trust-hub",
    "availableLanguage": ["English", "Indonesian", "Spanish", "Portuguese", "Russian", "Hindi", "Turkish"]
  },
  "sameAs": [
    "https://twitter.com/ApexLaunch_HQ",
    "https://t.me/ApexLaunchOfficial",
    "https://github.com/apexlaunch",
    "https://www.trustpilot.com/review/apexlaunch.io"
  ],
  "knowsAbout": [
    "Cryptographic Seed Verification",
    "HMAC-SHA256 Provably Fair Protocols",
    "Smart Contract Audit",
    "Online Sportsbook Compliance",
    "Crypto Casino Instant Withdrawals",
    "1win Official VIP Bonus Systems"
  ],
  "areaServed": "Worldwide"
};

/**
 * Standard Schema.org WebSite for ApexLaunch.io
 * Enables Google Sitelinks Search Box.
 */
export const APEX_WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": "https://apexlaunch.io/#website",
  "url": "https://apexlaunch.io/",
  "name": "ApexLaunch.io",
  "alternateName": "ApexLaunch Crypto Intelligence & Reviews",
  "description": "Global authority on provably fair crypto casinos, verified payout speeds, and exclusive VIP welcome packages.",
  "publisher": {
    "@id": "https://apexlaunch.io/#organization"
  },
  "inLanguage": ["en", "id", "es", "pt", "ru", "hi", "tr"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://apexlaunch.io/reviews?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

/**
 * Builds a Google Rich Snippet-compliant Review schema for any reviewed casino.
 */
export function buildCasinoReviewSchema(
  casino: CasinoReview,
  options?: { lang?: string; promoCode?: string }
) {
  const activePromoCode = options?.promoCode || casino.promoCode || "winpro17";
  const is1Win = casino.id === "1win";

  const reviewSchema: Record<string, any> = {
    "@type": "Review",
    "@id": `https://apexlaunch.io/reviews/${casino.slug}#review`,
    "url": `https://apexlaunch.io/reviews/${casino.slug}`,
    "name": `${casino.name} Review (2026 Audit) - Rating ${casino.rating}/5 & Provably Fair`,
    "headline": `Expert Independent Cryptographic Audit of ${casino.name}`,
    "datePublished": "2026-01-15T08:00:00+00:00",
    "dateModified": "2026-09-16T12:00:00+00:00",
    "itemReviewed": {
      "@type": "Organization",
      "@id": `https://apexlaunch.io/reviews/${casino.slug}#organization`,
      "name": casino.name,
      "url": is1Win ? "https://apexlaunch.io/go/1win" : `https://${casino.slug}.com`,
      "sameAs": is1Win ? "https://apexlaunch.io/go/1win" : undefined,
      "description": casino.tagline,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": casino.rating.toString(),
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": casino.reviewCount.toString(),
        "reviewCount": casino.reviewCount.toString()
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": casino.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "ApexLaunch Cryptographic Review Board",
      "url": "https://apexlaunch.io/about-editorial-eeat"
    },
    "publisher": {
      "@id": "https://apexlaunch.io/#organization"
    },
    "reviewBody": casino.verdictSummary,
    "positiveNotes": {
      "@type": "ItemList",
      "name": `Key Advantages of ${casino.name}`,
      "itemListElement": casino.pros.map((pro, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": pro
      }))
    },
    "negativeNotes": {
      "@type": "ItemList",
      "name": `Caution Points of ${casino.name}`,
      "itemListElement": casino.cons.map((con, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": con
      }))
    }
  };

  // If 1win, enrich with VIP Offer details for Rich Snippet offer expansion
  if (is1Win) {
    reviewSchema.offers = {
      "@type": "Offer",
      "name": "1win Official VIP Welcome Bonus Package (+500%)",
      "description": `Unlock a 500% deposit bonus across 4 deposits with verified promo code ${activePromoCode}`,
      "price": "0",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://apexlaunch.io/go/1win",
      "category": "iGaming VIP Promotion",
      "seller": {
        "@type": "Organization",
        "name": "1win Official Global Partner"
      }
    };
  }

  return reviewSchema;
}

/**
 * Builds BreadcrumbList schema for navigation hierarchy.
 */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path.startsWith("http") ? item.path : `https://apexlaunch.io${item.path}`
    }))
  };
}

/**
 * Builds Google Rich Snippet & 'People Also Ask' (PAA) compliant FAQPage schema.
 */
export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": "https://apexlaunch.io/#faq",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export type PageType = "home" | "reviews" | "guides" | "launchpad" | "anti-scam" | "about" | "seo-inspector";

/**
 * Master generator for unified JSON-LD schema graph across all pages.
 * Guarantees Organization, WebSite, and Review schemas are present in every page context!
 */
export function buildPageStructuredData(params: {
  pageType: PageType;
  title: string;
  description: string;
  canonicalPath: string;
  selectedReviewId?: string;
  selectedGuideId?: string;
  lang?: string;
  promoCode?: string;
  customSchema?: Record<string, any> | Record<string, any>[];
}) {
  const {
    pageType,
    title,
    description,
    canonicalPath,
    selectedReviewId = "1win",
    selectedGuideId = "1win-lucky-jet-strategy",
    lang = "en",
    promoCode = "winpro17",
    customSchema,
  } = params;

  const currentCasino =
    CASINO_REVIEWS.find((c) => c.id === selectedReviewId) || CASINO_REVIEWS[0];
  const primary1win =
    CASINO_REVIEWS.find((c) => c.id === "1win") || CASINO_REVIEWS[0];

  // 1. Primary Review schema based on page context
  const primaryReview = buildCasinoReviewSchema(
    pageType === "reviews" ? currentCasino : primary1win,
    { lang, promoCode }
  );

  // 2. Breadcrumbs
  const breadcrumbItems: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  if (pageType === "reviews") {
    breadcrumbItems.push({ name: "Reviews", path: "/reviews" });
    if (currentCasino) {
      breadcrumbItems.push({ name: currentCasino.name, path: `/reviews/${currentCasino.slug}` });
    }
  } else if (pageType === "guides") {
    breadcrumbItems.push({ name: "Guides", path: "/guides" });
    const guide = EDUCATIONAL_GUIDES.find((g) => g.id === selectedGuideId);
    if (guide) breadcrumbItems.push({ name: guide.title, path: `/guides/${guide.slug}` });
  } else if (pageType === "launchpad") {
    breadcrumbItems.push({ name: "Launchpad Radar", path: "/launchpad-radar" });
  } else if (pageType === "anti-scam") {
    breadcrumbItems.push({ name: "Anti-Scam Trust Hub", path: "/anti-scam-trust-hub" });
  } else if (pageType === "about") {
    breadcrumbItems.push({ name: "About & E-E-A-T", path: "/about-editorial-eeat" });
  } else if (pageType === "seo-inspector") {
    breadcrumbItems.push({ name: "SEO Inspector", path: "/seo-inspector" });
  }

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  // 3. WebPage entity
  const webPageEntity: Record<string, any> = {
    "@type": pageType === "about" ? "AboutPage" : "WebPage",
    "@id": `https://apexlaunch.io${canonicalPath}#webpage`,
    "url": `https://apexlaunch.io${canonicalPath}`,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": "https://apexlaunch.io/#website"
    },
    "about": {
      "@id": "https://apexlaunch.io/#organization"
    },
    "inLanguage": lang,
    "breadcrumb": {
      "@id": `https://apexlaunch.io${canonicalPath}#breadcrumb`
    }
  };

  // Compile full unified @graph
  const graph: any[] = [
    // Requirement 1: Organization
    APEX_ORGANIZATION_SCHEMA,
    // Requirement 2: WebSite
    APEX_WEBSITE_SCHEMA,
    // Requirement 3: Review
    primaryReview,
    // Page & Breadcrumb context
    webPageEntity,
    breadcrumbSchema,
  ];

  // If custom schema provided, add it (handles array or single object)
  if (customSchema) {
    if (Array.isArray(customSchema)) {
      customSchema.forEach((item) => {
        if (item && Object.keys(item).length > 0) {
          graph.push(item);
        }
      });
    } else if (Object.keys(customSchema).length > 0) {
      graph.push(customSchema);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
