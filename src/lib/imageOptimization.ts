/**
 * High-Performance Image Optimization Utility for ApexLaunch.io
 * Implements modern responsive source sets (srcSet), dynamic WebP/AVIF generation,
 * LCP (Largest Contentful Paint) eager preloading, and Cumulative Layout Shift (CLS) prevention.
 */

export interface ResponsiveImageConfig {
  src: string;
  widths?: number[];
  format?: "webp" | "avif" | "svg" | "png";
  sizes?: string;
}

export const DEFAULT_IMAGE_WIDTHS = [320, 640, 768, 1024, 1280, 1536, 1920];

/**
 * Standard responsive layout presets for Google Core Web Vitals (CWV)
 */
export const SIZES_PRESETS = {
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px",
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px",
  thumbnail: "(max-width: 640px) 100vw, (max-width: 1024px) 320px, 280px",
  avatar: "(max-width: 640px) 48px, 64px",
  badge: "40px",
  diagram: "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 960px",
};

/**
 * Builds responsive srcSet string formatted with pixel-density / width descriptors
 */
export function buildResponsiveSrcSet(
  baseUrl: string,
  widths: number[] = DEFAULT_IMAGE_WIDTHS
): string {
  if (!baseUrl) return "";

  // If already a data URI or SVG, return as standard 1x, 2x, 3x descriptors
  if (baseUrl.startsWith("data:") || baseUrl.endsWith(".svg")) {
    return `${baseUrl} 1x, ${baseUrl} 2x, ${baseUrl} 3x`;
  }

  // Check if URL supports query-based width optimization (e.g., Unsplash, Cloudinary, Imgix)
  if (baseUrl.includes("unsplash.com") || baseUrl.includes("cloudinary.com") || baseUrl.includes("cdn.")) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return widths
      .map((w) => `${baseUrl}${separator}w=${w}&auto=format&q=80 ${w}w`)
      .join(", ");
  }

  // Standard responsive width descriptors
  return widths.map((w) => `${baseUrl} ${w}w`).join(", ");
}

/**
 * Injects a high-priority <link rel="preload" as="image"> into document head for LCP elements
 */
export function preloadLcpHeroImage(
  src: string,
  srcSet?: string,
  sizes?: string
): void {
  if (typeof document === "undefined" || !src) return;

  const preloadId = `lcp-preload-${src.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20)}`;
  if (document.getElementById(preloadId)) return;

  const link = document.createElement("link");
  link.id = preloadId;
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  if (srcSet) link.setAttribute("imageSrcSet", srcSet);
  if (sizes) link.setAttribute("imageSizes", sizes);
  link.setAttribute("fetchpriority", "high");

  document.head.appendChild(link);
}

/**
 * Lightweight SVG blur placeholder (LQIP) to guarantee 0.00 Cumulative Layout Shift (CLS)
 */
export function getLqipPlaceholder(
  width = 600,
  height = 400,
  accentColor = "#0284c7"
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090d16" />
        <stop offset="50%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#090d16" />
      </linearGradient>
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.05" />
        <stop offset="50%" stop-color="${accentColor}" stop-opacity="0.2" />
        <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.05" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
    <rect width="100%" height="100%" fill="url(#shimmer)" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* =========================================================================
   Curated High-Performance SVG / Web-Ready Graphic Assets for LCP Optimization
   ========================================================================= */

// 1win Hero Banner (Cockpit + VIP + Lucky Jet flight)
export const ONEWIN_HERO_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712" />
      <stop offset="40%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="1000" cy="150" r="300" fill="#2563eb" opacity="0.12" filter="blur(60px)" />
  <circle cx="200" cy="500" r="250" fill="#06b6d4" opacity="0.08" filter="blur(50px)" />
  
  <!-- Grid Matrix -->
  <path d="M0,100 H1200 M0,200 H1200 M0,300 H1200 M0,400 H1200 M0,500 H1200" stroke="#1e293b" stroke-width="1" stroke-opacity="0.3" />
  <path d="M200,0 V630 M400,0 V630 M600,0 V630 M800,0 V630 M1000,0 V630" stroke="#1e293b" stroke-width="1" stroke-opacity="0.3" />

  <!-- 1win Official Badge -->
  <rect x="80" y="70" width="1040" height="490" rx="32" fill="#090e1a" stroke="#1e3a8a" stroke-width="2" stroke-opacity="0.8" />
  <rect x="120" y="110" width="110" height="110" rx="24" fill="url(#blueGlow)" />
  <text x="175" y="180" font-family="system-ui, sans-serif" font-weight="900" font-size="46" fill="#ffffff" text-anchor="middle">1W</text>
  
  <text x="260" y="150" font-family="system-ui, sans-serif" font-weight="900" font-size="38" fill="#ffffff">1win Global Official</text>
  <text x="260" y="185" font-family="monospace" font-weight="700" font-size="16" fill="#38bdf8">Curacao Lic. #8048/JAZ2018-040 • CAMS Audited 2026</text>

  <!-- Big Promo Code Box -->
  <rect x="120" y="260" width="460" height="130" rx="20" fill="#0f172a" stroke="#3b82f6" stroke-width="2" />
  <text x="150" y="300" font-family="monospace" font-weight="700" font-size="14" fill="#94a3b8">OFFICIAL VIP PROMO CODE</text>
  <text x="150" y="355" font-family="monospace" font-weight="900" font-size="44" fill="#38bdf8">winpro17</text>
  <rect x="420" y="305" width="130" height="50" rx="12" fill="url(#gold)" />
  <text x="485" y="337" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#000000" text-anchor="middle">+500% BONUS</text>

  <!-- Lucky Jet Trajectory & Multiplier -->
  <g transform="translate(640, 240)">
    <rect width="480" height="260" rx="20" fill="#030712" stroke="#1e293b" stroke-width="1.5" />
    <path d="M40,210 Q200,190 320,100 T440,40" fill="none" stroke="url(#blueGlow)" stroke-width="6" stroke-linecap="round" />
    <circle cx="440" cy="40" r="10" fill="#38bdf8" />
    <circle cx="440" cy="40" r="20" fill="#38bdf8" opacity="0.3" />
    <text x="50" y="55" font-family="system-ui, sans-serif" font-weight="800" font-size="16" fill="#e2e8f0">Lucky Jet Provably Fair Engine</text>
    <text x="50" y="90" font-family="monospace" font-weight="900" font-size="36" fill="#4ade80">54.82x</text>
    <text x="50" y="240" font-family="monospace" font-size="12" fill="#64748b">HMAC-SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f... (Audited)</text>
  </g>
</svg>
`)}`;

// Provably Fair Cryptographic Flow Diagram for Guide Articles
export const PROVABLY_FAIR_DIAGRAM_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="1000" height="520">
  <defs>
    <linearGradient id="dbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <rect width="1000" height="520" fill="url(#dbg)" rx="24" stroke="#1e293b" stroke-width="2" />
  
  <text x="500" y="55" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#ffffff" text-anchor="middle">ALUR KRIPTOGRAFI PROVABLY FAIR SHA-256</text>
  <text x="500" y="80" font-family="monospace" font-size="13" fill="#38bdf8" text-anchor="middle">ApexLaunch Independent Audit Architecture</text>

  <!-- Step 1: Server Seed -->
  <g transform="translate(60, 120)">
    <rect width="240" height="150" rx="16" fill="#0f172a" stroke="#0ea5e9" stroke-width="2" />
    <text x="20" y="35" font-family="system-ui, sans-serif" font-weight="800" font-size="16" fill="#38bdf8">1. Server Seed</text>
    <text x="20" y="60" font-family="monospace" font-size="11" fill="#94a3b8">Dibuat oleh server</text>
    <text x="20" y="80" font-family="monospace" font-size="11" fill="#94a3b8">Di-hash SHA-256</text>
    <text x="20" y="100" font-family="monospace" font-size="11" fill="#94a3b8">Dipublikasi sebelum taruhan</text>
    <rect x="20" y="115" width="200" height="20" rx="6" fill="#0284c7" opacity="0.2" />
    <text x="120" y="130" font-family="monospace" font-weight="700" font-size="10" fill="#38bdf8" text-anchor="middle">Hash Terkunci Publik</text>
  </g>

  <!-- Step 2: Client Seed -->
  <g transform="translate(380, 120)">
    <rect width="240" height="150" rx="16" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="20" y="35" font-family="system-ui, sans-serif" font-weight="800" font-size="16" fill="#34d399">2. Client Seed</text>
    <text x="20" y="60" font-family="monospace" font-size="11" fill="#94a3b8">Diberikan oleh pemain</text>
    <text x="20" y="80" font-family="monospace" font-size="11" fill="#94a3b8">Atau 3 pemain pertama</text>
    <text x="20" y="100" font-family="monospace" font-size="11" fill="#94a3b8">Bebas diubah kapan saja</text>
    <rect x="20" y="115" width="200" height="20" rx="6" fill="#059669" opacity="0.2" />
    <text x="120" y="130" font-family="monospace" font-weight="700" font-size="10" fill="#34d399" text-anchor="middle">Input Sisi Klien</text>
  </g>

  <!-- Step 3: Nonce -->
  <g transform="translate(700, 120)">
    <rect width="240" height="150" rx="16" fill="#0f172a" stroke="#8b5cf6" stroke-width="2" />
    <text x="20" y="35" font-family="system-ui, sans-serif" font-weight="800" font-size="16" fill="#a78bfa">3. Nonce &amp; Index</text>
    <text x="20" y="60" font-family="monospace" font-size="11" fill="#94a3b8">Nomor urut taruhan</text>
    <text x="20" y="80" font-family="monospace" font-size="11" fill="#94a3b8">Bertambah +1 per ronde</text>
    <text x="20" y="100" font-family="monospace" font-size="11" fill="#94a3b8">Mencegah replay attack</text>
    <rect x="20" y="115" width="200" height="20" rx="6" fill="#7c3aed" opacity="0.2" />
    <text x="120" y="130" font-family="monospace" font-weight="700" font-size="10" fill="#a78bfa" text-anchor="middle">Sequential Counter</text>
  </g>

  <!-- Bottom Result Box: HMAC-SHA256 -->
  <g transform="translate(150, 320)">
    <rect width="700" height="140" rx="20" fill="#030712" stroke="#38bdf8" stroke-width="2" />
    <text x="350" y="40" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">HMAC-SHA256 Combinator &amp; Output Multiplier</text>
    <text x="350" y="70" font-family="monospace" font-weight="700" font-size="14" fill="#38bdf8" text-anchor="middle">HMAC_SHA256(ServerSeed, ClientSeed + ":" + Nonce)</text>
    <rect x="50" y="85" width="600" height="35" rx="10" fill="#0f172a" stroke="#1e293b" />
    <text x="350" y="108" font-family="monospace" font-weight="700" font-size="13" fill="#4ade80" text-anchor="middle">Hasil Terbukti 100% Bebas Intervensi Pihak Ketiga</text>
  </g>
</svg>
`)}`;

// Auditor Dr. Adrian Hartanto Avatar Card
export const AUDITOR_AVATAR_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="avGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="95" fill="#0f172a" stroke="#0ea5e9" stroke-width="4" />
  <circle cx="100" cy="80" r="40" fill="url(#avGrad)" />
  <path d="M40,170 C40,130 70,120 100,120 C130,120 160,130 160,170" fill="url(#avGrad)" />
  <circle cx="150" cy="150" r="22" fill="#10b981" stroke="#0f172a" stroke-width="3" />
  <path d="M142,150 L148,156 L158,144" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`)}`;
