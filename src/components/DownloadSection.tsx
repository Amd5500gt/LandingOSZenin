import React, { useState } from "react";
import { Download, CheckCircle2, AlertCircle, FileCheck, Smartphone } from "lucide-react";
import confetti from "canvas-confetti";
import {
  APK_URL,
  APK_FILENAME,
  APP_VERSION,
  MIN_ANDROID_VERSION,
  APK_SIZE,
  SITE_META,
} from "../constants";

interface DownloadSectionProps {
  onDirectDownload?: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onDirectDownload }) => {
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDirectDownload) {
      onDirectDownload();
    }

    setDownloadStatus("downloading");
    setErrorMessage(null);

    try {
      // Trigger subtle particle burst
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
          colors: ["#4F46E5", "#06B6D4", "#F43F5E", "#10B981", "#F59E0B"],
          ticks: 200,
          scalar: 0.9,
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback gracefully if confetti fails
      }

      // Check asset availability and trigger download
      const response = await fetch(APK_URL, { method: "HEAD" });
      if (!response.ok && response.status !== 0) {
        throw new Error("File unavailable");
      }

      // Perform download
      const link = document.createElement("a");
      link.href = APK_URL;
      link.setAttribute("download", APK_FILENAME);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus("success");
      setTimeout(() => {
        setDownloadStatus("idle");
      }, 5000);
    } catch {
      setDownloadStatus("error");
      setErrorMessage("Download is temporarily unavailable. Please try again shortly.");
      setTimeout(() => {
        setDownloadStatus("idle");
      }, 6000);
    }
  };

  return (
    <section
      id="download"
      aria-label="Download Zenin OS"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-28 text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Large statement */}
        <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-indigo-700 mb-2">
          Ready to take control of your day?
        </p>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-3 text-balance">
          {SITE_META.downloadStatement}
        </h2>

        <p className="text-2xl sm:text-3xl font-medium text-slate-800 tracking-tight mb-2">
          {SITE_META.name}
        </p>

        <p className="text-base sm:text-lg text-slate-700 font-normal mb-8 max-w-md text-balance">
          Your personal productivity system.
        </p>

        {/* Product Launch Download Action */}
        <div className="relative group mb-6">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-rose-400 opacity-30 group-hover:opacity-75 blur-md transition duration-300" />
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadStatus === "downloading"}
            className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-lg sm:text-xl font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-97 transition-all duration-200 shadow-xl shadow-slate-900/15 cursor-pointer disabled:opacity-80"
            aria-label="Download Zenin OS APK for Android"
          >
            {downloadStatus === "downloading" ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Preparing APK...</span>
              </>
            ) : downloadStatus === "success" ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>Starting Download...</span>
              </>
            ) : (
              <>
                <Download className="w-6 h-6 text-cyan-300 transition-transform group-hover:-translate-y-0.5" />
                <span>Download for Android</span>
              </>
            )}
          </button>
        </div>

        {/* Small supporting text */}
        <p className="text-sm text-slate-700 font-medium mb-3">
          {SITE_META.supportingDownload}
        </p>

        {/* Download Trust & Factual Metadata (Strictly factual, no fake stats/badges) */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-medium pt-2">
          <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            {SITE_META.trustBadge}
          </span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-slate-500" />
            {SITE_META.apkFormatBadge}
          </span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>v{APP_VERSION}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{APK_SIZE}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{MIN_ANDROID_VERSION}</span>
        </div>

        {/* Error Feedback message */}
        {downloadStatus === "error" && errorMessage && (
          <div
            role="alert"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm animate-fade-in"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success feedback state */}
        {downloadStatus === "success" && (
          <div
            role="status"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm animate-fade-in"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Downloading {APK_FILENAME}. Check your browser downloads.</span>
          </div>
        )}
      </div>
    </section>
  );
};
