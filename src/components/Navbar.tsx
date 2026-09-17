import React, { useState } from "react";
import { PageRoute } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Compass,
  FileCheck2,
  Users,
  Menu,
  X,
  Sparkles,
  Flame,
  ExternalLink,
} from "lucide-react";

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, promoCode, handleClaim1Win } = useLanguage();

  const navItems: { route: PageRoute; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { route: "home", label: t("nav_home"), icon: Compass },
    { route: "reviews", label: t("nav_reviews"), icon: Award },
    { route: "guides", label: t("nav_guides"), icon: BookOpen },
    { route: "launchpad", label: t("nav_launchpad"), icon: Sparkles },
    { route: "anti-scam", label: t("nav_anti_scam"), icon: ShieldCheck },
    { route: "about", label: t("nav_about"), icon: Users },
    { route: "seo-inspector", label: t("nav_seo"), icon: FileCheck2, badge: "100" },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header id="apex-navbar" className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Utility Bar with Domain Status & Language Auto-detect */}
      <div className="bg-slate-900/95 border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-slate-300">
              Authority Domain: <strong className="text-cyan-400">ApexLaunch.io</strong>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-blue-300 font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Official 1win Partner Code:</span>
              <strong className="text-white px-1.5 py-0.2 bg-blue-600/30 rounded border border-blue-500/40">
                {promoCode}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-block text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors"
            >
              /sitemap.xml
            </a>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/20">
              Lighthouse 100/100
            </span>
            <LanguageSelector compact={false} />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer group text-left shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-sans">
                  ApexLaunch
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  .io
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wide block uppercase font-mono">
                Crypto Intelligence
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded-full border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Direct 1win Claim CTA Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="nav-1win-vip-btn"
              onClick={() => handleClaim1Win("navbar_btn")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold font-mono shadow-md shadow-blue-500/20 transition-all hover:scale-105 cursor-pointer border border-blue-400/30"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>1win +500% VIP</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <div className="pb-2 border-b border-slate-800/80 mb-2">
            <button
              onClick={() => {
                handleClaim1Win("mobile_drawer");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md shadow-blue-600/30"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Klaim 1win +500% (Kode: {promoCode})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-mono rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
