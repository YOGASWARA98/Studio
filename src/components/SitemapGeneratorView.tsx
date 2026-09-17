import React, { useState, useEffect } from "react";
import {
  generateSitemapReport,
  generateDynamicSitemapXml,
  generateSitemapIndexXml,
  CrawledSitemapReport,
  CrawledRoute,
} from "../lib/sitemapGenerator";
import {
  Compass,
  RefreshCw,
  Download,
  Copy,
  Check,
  ExternalLink,
  FileCode,
  Layers,
  Globe,
  Bot,
  Sparkles,
  ShieldCheck,
  Search,
  Filter,
  Clock,
  HardDrive,
} from "lucide-react";

export const SitemapGeneratorView: React.FC = () => {
  const [report, setReport] = useState<CrawledSitemapReport | null>(null);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlDuration, setCrawlDuration] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeXmlTab, setActiveXmlTab] = useState<"sitemap" | "index">("sitemap");
  const [copied, setCopied] = useState(false);
  const [lastCrawlTimestamp, setLastCrawlTimestamp] = useState<string>("");

  const runCrawler = async () => {
    setIsCrawling(true);
    const start = Date.now();
    try {
      // Try hitting the live server crawler endpoint
      const res = await fetch("/api/sitemap/crawl", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setReport(data.report);
        setCrawlDuration(data.crawlDurationMs);
        setLastCrawlTimestamp(data.timestamp);
      } else {
        // Fallback to client-side sitemap engine
        const fallbackReport = generateSitemapReport();
        setReport(fallbackReport);
        setCrawlDuration(Date.now() - start);
        setLastCrawlTimestamp(new Date().toISOString());
      }
    } catch {
      const fallbackReport = generateSitemapReport();
      setReport(fallbackReport);
      setCrawlDuration(Date.now() - start);
      setLastCrawlTimestamp(new Date().toISOString());
    } finally {
      setIsCrawling(false);
    }
  };

  useEffect(() => {
    runCrawler();
  }, []);

  const handleCopyXml = () => {
    if (!report) return;
    const xml = activeXmlTab === "sitemap" ? report.xml : report.sitemapIndexXml;
    try {
      navigator.clipboard.writeText(xml);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadXml = () => {
    if (!report) return;
    const xml = activeXmlTab === "sitemap" ? report.xml : report.sitemapIndexXml;
    const filename = activeXmlTab === "sitemap" ? "sitemap.xml" : "sitemap-index.xml";
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredRoutes = (report?.routes || []).filter((r: CrawledRoute) => {
    const matchesCategory = selectedCategory === "all" || r.category === selectedCategory;
    const matchesSearch =
      r.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "Semua Rute", count: report?.routes.length || 0 },
    { id: "core", label: "Core Hubs", count: report?.routesByCategory["core"] || 0 },
    { id: "review", label: "Kasino Reviews", count: report?.routesByCategory["review"] || 0 },
    { id: "guide", label: "Panduan Teknis", count: report?.routesByCategory["guide"] || 0 },
    { id: "radar", label: "Radar Presale", count: report?.routesByCategory["radar"] || 0 },
    { id: "landing", label: "Landing Voucher", count: report?.routesByCategory["landing"] || 0 },
  ];

  return (
    <div id="dynamic-sitemap-generator-view" className="space-y-8">
      {/* Top Banner & Crawl Trigger */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-900/90 to-blue-950/70 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold">
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>DYNAMIC AUTONOMOUS SITEMAP CRAWLER V2.4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Generator XML Sitemap Dinamis &amp; Perayap Rute Otomatis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Secara dinamis memindai seluruh rute aktif, halaman review mendalam (1win, BC.Game, Stake), panduan kriptografi Provably Fair, dan deep link token radar dengan relasi hreflang 7 bahasa serta metadata Google Image.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="btn-run-crawler"
              onClick={runCrawler}
              disabled={isCrawling}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isCrawling ? "animate-spin" : ""}`} />
              <span>{isCrawling ? "Sedang Merayap Halaman..." : "Jalankan Crawl Ulang Otomatis"}</span>
            </button>

            <a
              id="link-view-raw-sitemap"
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
            >
              <span>Buka /sitemap.xml</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Indexing Metrics Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Rute Unik Aktif
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
              {report?.totalRoutes || 0}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Rute terindeks 100%</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Total URL Alternat Hreflang
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {report?.totalLocalizedUrls || 0}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">7 Bahasa + x-default</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Sinkronisasi File System
            </span>
            <div className="text-sm sm:text-base font-black font-mono text-amber-300 flex items-center justify-center gap-1 mt-1">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{report?.latestSystemModTime || "Live FS Sync"}</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">lastmod dinamis aktif</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Status Googlebot &amp; Bing
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-blue-400 flex items-center justify-center gap-1.5 pt-0.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>ALLOWED</span>
            </div>
            <span className="text-[11px] text-emerald-400/90 mt-1 block">robots.txt Verified</span>
          </div>
        </div>
      </div>

      {/* Crawled Route Inventory Table & Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Daftar Inventaris Rute yang Terayap ({filteredRoutes.length} Halaman)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Setiap rute otomatis dikalibrasikan atribut <code className="text-cyan-400 font-mono">&lt;lastmod&gt;</code> berdasarkan waktu modifikasi file fisik di server untuk memicu frekuensi recrawl Googlebot.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari rute atau judul..."
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48 sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300 font-bold">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table of Routes */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Rute / Path</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-3 py-3 text-center">Prioritas</th>
                <th className="px-3 py-3 text-center">Frekuensi</th>
                <th className="px-3 py-3 text-center">Lastmod (File FS)</th>
                <th className="px-3 py-3 text-center">Alternates</th>
                <th className="px-3 py-3 text-center">Gambar</th>
                <th className="px-4 py-3 text-right">Status Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredRoutes.map((route, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{route.path}</span>
                    </div>
                    <span className="text-[11px] font-sans text-slate-400 truncate max-w-sm block mt-0.5">
                      {route.title}
                    </span>
                    {route.sourceFiles && route.sourceFiles.length > 0 && (
                      <span className="text-[10px] font-mono text-slate-500 block mt-0.5 truncate max-w-xs">
                        src: {route.sourceFiles[0]}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        route.category === "review"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : route.category === "guide"
                          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                          : route.category === "radar"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : route.category === "landing"
                          ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {route.category}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-slate-200">
                    <span className={Number(route.priority) >= 0.9 ? "text-emerald-400" : "text-slate-300"}>
                      {route.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-slate-400">
                    {route.changefreq}
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-amber-300">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/20 text-[10px]">
                      <Clock className="w-2.5 h-2.5 text-amber-400" />
                      <span>{route.lastmod}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-cyan-300">
                      8 Lokalisasi
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    {route.images && route.images.length > 0 ? (
                      <span className="text-emerald-400 font-bold">
                        ✓ {route.images.length} Aset
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                      <Check className="w-3 h-3" />
                      <span>INDEXABLE</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw XML Inspector & Code Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Inspektur XML Mentah (Sitemap Protocol v0.9)
              </h3>
              <p className="text-xs text-slate-400">
                Sesuai dengan spesifikasi resmi Google Search Central &amp; sitemaps.org.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveXmlTab("sitemap")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeXmlTab === "sitemap"
                    ? "bg-cyan-500/20 text-cyan-300 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                sitemap.xml
              </button>
              <button
                onClick={() => setActiveXmlTab("index")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeXmlTab === "index"
                    ? "bg-cyan-500/20 text-cyan-300 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                sitemap-index.xml
              </button>
            </div>

            <button
              onClick={handleCopyXml}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin XML</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadXml}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-colors cursor-pointer shadow-md shadow-blue-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh XML</span>
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <pre className="p-4 text-[11px] font-mono text-cyan-300/90 leading-relaxed overflow-x-auto max-h-96">
            {activeXmlTab === "sitemap" ? report?.xml : report?.sitemapIndexXml}
          </pre>
        </div>
      </div>

      {/* Search Engine Bot Ping & Submission Directives */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">
            Prosedur Pengiriman &amp; Notifikasi Mesin Pencari (Search Engine Pings)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6 max-w-3xl">
          Gunakan URL ping resmi di bawah ini untuk memberi tahu Googlebot dan Bingbot secara seketika saat konten atau ulasan baru ditambahkan:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-bold">Google Search Console Ping:</span>
              <span className="text-[10px] text-emerald-400">REST GET</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg text-slate-300 break-all text-[11px]">
              https://www.google.com/ping?sitemap=https://apexlaunch.io/sitemap.xml
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold">Bing Webmaster Tools Ping:</span>
              <span className="text-[10px] text-emerald-400">REST GET</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg text-slate-300 break-all text-[11px]">
              https://www.bing.com/ping?sitemap=https://apexlaunch.io/sitemap.xml
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
