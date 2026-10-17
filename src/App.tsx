/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { Scene3D } from "./components/3d/Scene3D";
import { HeroSection } from "./components/HeroSection";
import { JourneySection } from "./components/JourneySection";
import { DownloadSection } from "./components/DownloadSection";
import { SemanticSeoSection } from "./components/SemanticSeoSection";
import { MinimalFooter } from "./components/MinimalFooter";
import { APK_URL, APK_FILENAME } from "./constants";
import { prefersReducedMotion } from "./utils/webgl";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track native scrolling without adding another animation loop.
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let animId = 0;

    const updateScrollMetrics = (currentY: number) => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentY / maxScroll)) : 0;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dy = currentY - lastScrollY;
      const vel = dy / dt;

      lastScrollY = currentY;
      lastTime = now;

      setScrollProgress(progress);
      setScrollVelocity(vel);
    };

    const handleNativeScroll = () => {
      if (animId) return;
      animId = requestAnimationFrame(() => {
        animId = 0;
        updateScrollMetrics(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    updateScrollMetrics(window.scrollY);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, []);

  // Smooth navigation handler
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    setMenuOpen(false);

    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  // Universal Download Trigger
  const triggerDownload = useCallback(async () => {
    setDownloading(true);

    try {
      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.65 },
          colors: ["#8174ed", "#a9d9b8", "#f5a990", "#c7bcf7"],
          disableForReducedMotion: true,
        });
      } catch {
        // silent fallback
      }

      // Check file availability
      const res = await fetch(APK_URL, { method: "HEAD" });
      if (!res.ok && res.status !== 0) {
        throw new Error("APK unavailable");
      }

      const link = document.createElement("a");
      link.href = APK_URL;
      link.setAttribute("download", APK_FILENAME);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // If direct fetch fails or file blocked, still attempt anchor navigation
      const link = document.createElement("a");
      link.href = APK_URL;
      link.setAttribute("download", APK_FILENAME);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => {
        setDownloading(false);
      }, 1500);
    }
  }, []);

  return (
    <div className="site-shell relative min-h-screen overflow-x-hidden">
      {/* 3D WebGL Camera Journey Canvas & Fallback */}
      <Scene3D
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
      />

      <header className="site-header">
        <a className="brand-lockup" href="#hero" onClick={(event) => { event.preventDefault(); handleNavigate("hero"); }}>
          <img src="/logo.svg" alt="" width="36" height="36" />
          <span>zenin<span className="brand-period">.</span></span>
        </a>
        <nav id="main-menu" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <button type="button" onClick={() => handleNavigate("hero")}>Home</button>
          <button type="button" onClick={() => handleNavigate("rhythm")}>How it works</button>
          <button type="button" onClick={() => handleNavigate("details")}>Features</button>
        </nav>
        <button
          className="header-download"
          type="button"
          onClick={() => handleNavigate("download")}
        >
          Get the app <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="main-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero Opening */}
        <HeroSection
          onDownload={triggerDownload}
          onExplore={() => handleNavigate("rhythm")}
          downloading={downloading}
        />

        {/* Section 2 & 3: Camera Scroll Journey: Time & Rhythm -> Intention */}
        <JourneySection />

        {/* Section 4: Final Product Launch & Download */}
        <DownloadSection />

        {/* Compact Semantic SEO Section */}
        <SemanticSeoSection />
      </main>

      {/* Minimal Footer */}
      <MinimalFooter />
    </div>
  );
}
