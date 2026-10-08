/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import Lenis from "lenis";
import confetti from "canvas-confetti";
import { Scene3D } from "./components/3d/Scene3D";
import { HeroSection } from "./components/HeroSection";
import { JourneySection } from "./components/JourneySection";
import { DownloadSection } from "./components/DownloadSection";
import { SemanticSeoSection } from "./components/SemanticSeoSection";
import { MinimalFooter } from "./components/MinimalFooter";
import { JourneyIndicator } from "./components/JourneyIndicator";
import { APK_URL, APK_FILENAME } from "./constants";
import { prefersReducedMotion } from "./utils/webgl";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll with Lenis + scroll progress calculation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let animId: number;

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

    if (!prefersReducedMotion()) {
      const lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", (e) => {
        updateScrollMetrics(e.scroll);
      });

      const raf = (time: number) => {
        lenis.raf(time);
        animId = requestAnimationFrame(raf);
      };
      animId = requestAnimationFrame(raf);
    } else {
      const handleNativeScroll = () => {
        updateScrollMetrics(window.scrollY);
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
      };
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Smooth navigation handler
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
          colors: ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B"],
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
    <div className="relative min-h-screen text-slate-900 bg-transparent overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* 3D WebGL Camera Journey Canvas & Fallback */}
      <Scene3D
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
      />

      {/* Discrete Journey Depth Indicator */}
      <JourneyIndicator
        progress={scrollProgress}
        onNavigate={handleNavigate}
      />

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
        <DownloadSection onDirectDownload={triggerDownload} />

        {/* Compact Semantic SEO Section */}
        <SemanticSeoSection />
      </main>

      {/* Minimal Footer */}
      <MinimalFooter />
    </div>
  );
}
