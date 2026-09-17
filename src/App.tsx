import React, { useState, useEffect } from "react";
import { PageRoute } from "./types";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ReviewsPage } from "./components/ReviewsPage";
import { GuidesPage } from "./components/GuidesPage";
import { LaunchpadRadarPage } from "./components/LaunchpadRadarPage";
import { AntiScamTrustHubPage } from "./components/AntiScamTrustHubPage";
import { AboutPage } from "./components/AboutPage";
import { SeoInspectorPage } from "./components/SeoInspectorPage";
import { VipStickyBanner } from "./components/VipStickyBanner";
import { useDocumentMetadata } from "./hooks/useDocumentMetadata";

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>("home");
  const [selectedReviewId, setSelectedReviewId] = useState<string>("1win");
  const [selectedGuideId, setSelectedGuideId] = useState<string>("1win-lucky-jet-strategy");

  // Dynamic route-based document title and meta description tag updater
  useDocumentMetadata({
    route: currentRoute,
    reviewId: selectedReviewId,
    guideId: selectedGuideId,
    syncHistory: true,
  });

  // Check URL path or query params for initial route & handle browser back/forward (popstate)
  useEffect(() => {
    const handleUrlState = () => {
      try {
        const pathname = window.location.pathname;
        if (pathname.includes("/reviews")) {
          setCurrentRoute("reviews");
          if (pathname.includes("bc-game")) setSelectedReviewId("bc-game");
          else if (pathname.includes("stake")) setSelectedReviewId("stake");
          else if (pathname.includes("rollbit")) setSelectedReviewId("rollbit");
          else setSelectedReviewId("1win");
        } else if (pathname.includes("/guides")) {
          setCurrentRoute("guides");
          if (pathname.includes("provably-fair-math")) setSelectedGuideId("provably-fair-math");
          else if (pathname.includes("vip-rakeback-guide")) setSelectedGuideId("vip-rakeback-guide");
          else if (pathname.includes("anti-scam-checklist")) setSelectedGuideId("anti-scam-checklist");
          else setSelectedGuideId("1win-lucky-jet-strategy");
        } else if (pathname.includes("/launchpad")) {
          setCurrentRoute("launchpad");
        } else if (pathname.includes("/anti-scam")) {
          setCurrentRoute("anti-scam");
        } else if (pathname.includes("/about")) {
          setCurrentRoute("about");
        } else if (pathname.includes("/seo-inspector")) {
          setCurrentRoute("seo-inspector");
        }
      } catch {
        // ignore
      }
    };

    handleUrlState();
    window.addEventListener("popstate", handleUrlState);
    return () => window.removeEventListener("popstate", handleUrlState);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviewId(reviewId);
  };

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuideId(guideId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      <div className="flex-1">
        {currentRoute === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectReview={handleSelectReview}
            onSelectGuide={handleSelectGuide}
          />
        )}

        {currentRoute === "reviews" && (
          <ReviewsPage
            selectedReviewId={selectedReviewId}
            onSelectReview={handleSelectReview}
          />
        )}

        {currentRoute === "guides" && (
          <GuidesPage
            selectedGuideId={selectedGuideId}
            onSelectGuide={handleSelectGuide}
          />
        )}

        {currentRoute === "launchpad" && <LaunchpadRadarPage />}

        {currentRoute === "anti-scam" && <AntiScamTrustHubPage />}

        {currentRoute === "about" && <AboutPage />}

        {currentRoute === "seo-inspector" && <SeoInspectorPage />}
      </div>

      <Footer onNavigate={handleNavigate} onSelectReview={handleSelectReview} />

      {/* Global Floating VIP Sticky Banner for 1win +500% Offer */}
      <VipStickyBanner />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
