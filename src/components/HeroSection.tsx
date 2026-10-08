import React from "react";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { SITE_META, APK_FILENAME, MIN_ANDROID_VERSION } from "../constants";

interface HeroSectionProps {
  onDownload: () => void;
  onExplore: () => void;
  downloading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDownload,
  onExplore,
  downloading,
}) => {
  return (
    <section
      id="hero"
      aria-label="Zenin OS Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-20 text-center select-none"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Exact logo asset from public/logo.svg */}
        <div className="relative mb-6 sm:mb-8 transition-transform duration-500 hover:scale-105">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/10 via-cyan-500/15 to-emerald-500/10 blur-xl pointer-events-none" />
          <img
            src="/logo.svg"
            alt="Zenin OS Official Logo"
            width={120}
            height={120}
            className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-sm"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Sole H1 on page */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-3">
          ZENIN OS
        </h1>

        {/* Hero copy */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 tracking-tight mb-4 max-w-xl text-balance">
          &ldquo;{SITE_META.headline}&rdquo;
        </p>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 sm:mb-10 text-balance">
          {SITE_META.subheadline}
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg shadow-slate-900/10 cursor-pointer disabled:opacity-75"
            aria-label="Download Zenin OS Android APK"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 text-cyan-300" />
            <span>{downloading ? "Preparing APK..." : "Download Zenin OS"}</span>
          </button>

          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-slate-700 bg-white/70 hover:bg-white active:scale-98 transition-all duration-200 border border-slate-200/80 shadow-xs cursor-pointer backdrop-blur-sm"
            aria-label="Explore Zenin OS 3D journey"
          >
            <span>Explore Zenin OS</span>
            <ArrowDown className="w-4 h-4 text-slate-500 animate-bounce" />
          </button>
        </div>

        {/* Unboxed Metadata Discipline */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-600 font-medium tracking-wide">
          <span>{MIN_ANDROID_VERSION}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{APK_FILENAME}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span className="flex items-center gap-1 text-slate-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Distraction-Free Architecture
          </span>
        </div>
      </div>
    </section>
  );
};
