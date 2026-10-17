import React, { useState } from "react";
import { AlertCircle, Check, CheckCircle2, Download, FileCheck, Smartphone } from "lucide-react";
import confetti from "canvas-confetti";
import {
  APK_URL,
  APK_FILENAME,
  APP_VERSION,
  MIN_ANDROID_VERSION,
  APK_SIZE,
  SITE_META,
} from "../constants";

export const DownloadSection: React.FC = () => {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    setDownloadStatus("downloading");
    setErrorMessage(null);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#8174ed", "#a9d9b8", "#f5a990", "#c7bcf7"],
        ticks: 200,
        scalar: 0.9,
        disableForReducedMotion: true,
      });

      const response = await fetch(APK_URL, { method: "HEAD" });
      if (!response.ok && response.status !== 0) {
        throw new Error("File unavailable");
      }

      const link = document.createElement("a");
      link.href = APK_URL;
      link.setAttribute("download", APK_FILENAME);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 5000);
    } catch {
      setDownloadStatus("error");
      setErrorMessage("Download is temporarily unavailable. Please try again shortly.");
      setTimeout(() => setDownloadStatus("idle"), 6000);
    }
  };

  return (
    <section id="download" aria-label="Download Zenin OS" className="download-section">
      <div className="download-panel">
        <div className="download-orb download-orb-one" />
        <div className="download-orb download-orb-two" />
        <div className="download-content">
          <span className="download-kicker"><span /> READY WHEN YOU ARE</span>
          <h2>A more intentional<br />day starts <span>here.</span></h2>
          <p>Make room for what matters. Take your daily rhythm with you.</p>
          <button type="button" onClick={handleDownload} disabled={downloadStatus === "downloading"} className="button download-button">
            {downloadStatus === "downloading" ? (
              <><span className="download-spinner" /> Preparing your download</>
            ) : downloadStatus === "success" ? (
              <><CheckCircle2 size={19} /> Your download is starting</>
            ) : (
              <><Download size={19} /> Download for Android</>
            )}
          </button>
          <div className="download-details">
            <span><FileCheck size={15} /> Official download</span>
            <i />
            <span><Smartphone size={15} /> Android APK</span>
            <i />
            <span>v{APP_VERSION}</span>
            <i />
            <span>{APK_SIZE}</span>
            <i />
            <span>{MIN_ANDROID_VERSION}</span>
          </div>
          {downloadStatus === "error" && errorMessage && (
            <p role="alert" className="download-message download-error"><AlertCircle size={16} />{errorMessage}</p>
          )}
          {downloadStatus === "success" && (
            <p role="status" className="download-message download-success"><Check size={16} />Downloading {APK_FILENAME}. Check your browser downloads.</p>
          )}
          <small className="download-support">{SITE_META.supportingDownload}</small>
        </div>
        <div className="download-stamp" aria-hidden="true"><span>MAKE SPACE<br />FOR YOUR DAY</span><span className="stamp-star">✳</span></div>
      </div>
    </section>
  );
};
