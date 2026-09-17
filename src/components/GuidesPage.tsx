import React, { useState } from "react";
import { GuideArticle } from "../types";
import { EDUCATIONAL_GUIDES } from "../data/mockData";
import { ProvablyFairVerifier } from "./ProvablyFairVerifier";
import { SeoHeadManager } from "./SeoHeadManager";
import { OptimizedImage } from "./OptimizedImage";
import {
  BookOpen,
  UserCheck,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

interface GuidesPageProps {
  selectedGuideId?: string;
  onSelectGuide: (guideId: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  selectedGuideId,
  onSelectGuide,
}) => {
  const currentGuide =
    EDUCATIONAL_GUIDES.find((g) => g.id === selectedGuideId) || EDUCATIONAL_GUIDES[0];

  const guideSchema = {
    "@type": "TechArticle",
    "headline": currentGuide.title,
    "description": currentGuide.excerpt,
    "datePublished": "2026-09-01T08:00:00+07:00",
    "dateModified": "2026-09-15T10:00:00+07:00",
    "author": {
      "@type": "Person",
      "name": currentGuide.author.name,
      "jobTitle": currentGuide.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "ApexLaunch.io",
      "url": "https://apexlaunch.io"
    }
  };

  return (
    <div id="guides-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SeoHeadManager
        title={`${currentGuide.title} - Panduan ApexLaunch`}
        description={currentGuide.excerpt}
        canonicalPath={`/guides/${currentGuide.slug}`}
        pageType="guides"
        selectedGuideId={currentGuide.id}
        schemaJson={guideSchema}
      />

      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pusat Riset Kriptografi &amp; Keamanan Web3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Panduan Teknis, Matematika Provably Fair, &amp; Edukasi
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Artikel berbasis riset mendalam yang ditulis oleh auditor smart contract dan analis resiko independen untuk mencerdaskan komunitas.
        </p>
      </div>

      {/* Guide Navigation Pills */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-800">
        {EDUCATIONAL_GUIDES.map((guide) => {
          const isSelected = guide.id === currentGuide.id;
          return (
            <button
              key={guide.id}
              id={`tab-guide-${guide.id}`}
              onClick={() => onSelectGuide(guide.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
              }`}
            >
              <span className="block">{guide.title.slice(0, 35)}...</span>
            </button>
          );
        })}
      </div>

      {/* Main Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Article Body */}
        <article className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
                {currentGuide.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentGuide.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {currentGuide.publishDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
              {currentGuide.title}
            </h2>

            {/* LCP Optimized Article Hero Banner */}
            {currentGuide.heroImageUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <OptimizedImage
                  src={currentGuide.heroImageUrl}
                  alt={currentGuide.title}
                  aspectRatio="1000/520"
                  priority={true}
                  sizesPreset="hero"
                  className="hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 mb-6">
              {currentGuide.excerpt}
            </p>

            {/* Author Byline (E-E-A-T Signal for Google) */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800/80 mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-cyan-500/40">
                {currentGuide.author.avatarUrl ? (
                  <OptimizedImage
                    src={currentGuide.author.avatarUrl}
                    alt={currentGuide.author.name}
                    width={48}
                    height={48}
                    aspectRatio="1/1"
                    sizesPreset="avatar"
                    priority={true}
                  />
                ) : (
                  <div className="w-full h-full bg-cyan-500/20 flex items-center justify-center font-mono font-bold text-cyan-400">
                    {currentGuide.author.avatar}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">
                    {currentGuide.author.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <CheckCircle className="w-3 h-3" />
                    <span>Auditor Terverifikasi</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{currentGuide.author.role}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {currentGuide.author.credentials}
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              {currentGuide.contentSections.map((section, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {section.heading}
                  </h3>
                  <div className="whitespace-pre-line text-slate-300 text-xs sm:text-sm">
                    {section.body}
                  </div>
                  {section.callout && (
                    <div className="p-3.5 bg-cyan-950/30 border-l-4 border-cyan-500 rounded-r-xl text-xs text-cyan-200 mt-3 font-medium">
                      {section.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Embedded Live Tool for the Cryptography Guide */}
            {currentGuide.id === "provably-fair-explained" && (
              <div className="mt-10 pt-8 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white mb-4">
                  Coba Langsung: Verifikator Seed di Bawah Ini
                </h4>
                <ProvablyFairVerifier />
              </div>
            )}
          </div>
        </article>

        {/* Right 1 Col: Other Articles & Key Takeaways */}
        <aside className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4">
              Panduan Terkait Lainnya
            </h3>
            <div className="space-y-4">
              {EDUCATIONAL_GUIDES.filter((g) => g.id !== currentGuide.id).map((other) => (
                <div
                  key={other.id}
                  onClick={() => onSelectGuide(other.id)}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer group space-y-2.5"
                >
                  {other.thumbnailUrl && (
                    <div className="rounded-lg overflow-hidden border border-slate-800/80">
                      <OptimizedImage
                        src={other.thumbnailUrl}
                        alt={other.title}
                        aspectRatio="16/9"
                        priority={false}
                        sizesPreset="thumbnail"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                    {other.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 line-clamp-2">
                    {other.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
                    <span>{other.readTime}</span>
                    <span className="flex items-center gap-0.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      Baca <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 border border-emerald-500/20 rounded-2xl p-5 text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Jaminan Kualitas Konten</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Semua panduan di ApexLaunch.io bebas dari link afiliasi terselubung. Materi ini dirancang untuk melindungi aset dan privasi pemain crypto gaming.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
