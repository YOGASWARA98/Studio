export type PageRoute =
  | "home"
  | "reviews"
  | "guides"
  | "launchpad"
  | "anti-scam"
  | "about"
  | "seo-inspector";

export interface CasinoReview {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  logoUrl: string;
  heroImageUrl?: string;
  screenshotUrl?: string;
  badgeImageUrl?: string;
  rating: number; // e.g. 4.9
  reviewCount: number;
  established: number;
  license: string;
  provablyFair: boolean;
  vipRakeback: string; // e.g. "Up to 20% + Level-up bonuses"
  payoutSpeed: string; // e.g. "< 5 Menit (Instant Crypto)"
  supportedCoins: string[];
  minDeposit: string;
  kycRequirement: string;
  pros: string[];
  cons: string[];
  verdictSummary: string;
  securityScore: number; // out of 100
  originalGames: string[];
  testedWithdrawalTime: string;
  isFeaturedPrimary?: boolean;
  affiliateUrl?: string;
  promoCode?: string;
  exclusiveBonusText?: string;
  depositBonusPercent?: number;
  sportsbookAvailable?: boolean;
  mobileAppAvailable?: boolean;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnailUrl?: string;
  heroImageUrl?: string;
  diagramUrl?: string;
  category: "Teknis & Kriptografi" | "Strategi VIP" | "Keamanan & Anti-Scam" | "Regulasi";
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    avatarUrl?: string;
    credentials: string;
  };
  contentSections: {
    heading: string;
    body: string;
    callout?: string;
  }[];
  schemaType: "TechArticle" | "HowTo" | "Article";
}

export interface TokenRadarItem {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  stage: "Presale Live" | "Upcoming IDO" | "Mainnet Alpha" | "Audited Launch";
  safetyScore: number; // 0-100
  liquidityLockDays: number;
  auditFirm: string;
  honeypotStatus: "Clean / Pass" | "Warning" | "Critical";
  launchDate: string;
  useCase: string;
}

export interface SeoCheckResult {
  id: string;
  name: string;
  passed: boolean;
  score: number;
  detail: string;
}

export interface SeoAuditResponse {
  success: boolean;
  domain: string;
  evaluatedUrl: string;
  overallSeoScore: number;
  lighthouseScores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  auditChecks: SeoCheckResult[];
}
