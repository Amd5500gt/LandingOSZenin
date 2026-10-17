import React from "react";
import { ArrowDown, ArrowRight, Check, Download, Sparkles } from "lucide-react";
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
    <section id="hero" aria-label="Zenin OS introduction" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={15} /> A calmer way to get things done</p>
        <h1>Your day,<br /><span>back in balance.</span></h1>
        <p className="hero-description">
          {SITE_META.subheadline}
        </p>
        <div className="hero-actions">
          <button type="button" onClick={onDownload} disabled={downloading} className="button button-primary">
            <Download size={18} />
            {downloading ? "Preparing download..." : "Get Zenin OS"}
            <ArrowRight size={17} className="button-arrow" />
          </button>
          <button type="button" onClick={onExplore} className="button button-secondary">
            Discover how it works <ArrowDown size={16} />
          </button>
        </div>
        <div className="hero-proof">
          <span className="proof-check"><Check size={13} /></span>
          Made for Android <span className="proof-dot" /> {MIN_ANDROID_VERSION}
          <span className="proof-dot" /> {APK_FILENAME}
        </div>
      </div>

      <div className="hero-visual" role="img" aria-label="Illustrated preview of the Zenin OS daily planner">
        <div className="visual-glow" />
        <div className="floating-note note-top"><span className="note-icon note-purple"><Sparkles size={15} /></span><span><strong>Small steps</strong><small>add up to big days</small></span></div>
        <div className="phone-frame">
          <div className="phone-island" />
          <div className="phone-screen">
            <div className="phone-status"><span>9:41</span><span>●●●  ▰</span></div>
            <div className="app-greeting"><span>YOUR DAY, AT A GLANCE</span><strong>Good morning,<br />Alex <span>✦</span></strong></div>
            <div className="day-card">
              <div className="day-card-heading"><span>Today’s focus</span><span className="day-count">2 of 5</span></div>
              <div className="day-progress"><span /></div>
              <div className="task-row task-done"><span className="task-check"><Check size={11} /></span><span><strong>Morning stretch</strong><small>8:00 – 8:15 AM</small></span><span className="task-duration">15m</span></div>
              <div className="task-row task-active"><span className="task-check" /><span><strong>Deep work session</strong><small>9:00 – 10:30 AM</small></span><span className="task-duration">Now</span></div>
              <div className="task-row"><span className="task-check" /><span><strong>Review project notes</strong><small>11:00 – 11:30 AM</small></span><span className="task-duration">30m</span></div>
            </div>
            <div className="phone-bottom"><span className="bottom-active">◉<small>Today</small></span><span>▦<small>Schedule</small></span><span>◷<small>Focus</small></span><span>☻<small>Profile</small></span></div>
          </div>
        </div>
        <div className="floating-note note-bottom"><span className="note-icon note-green"><Check size={15} /></span><span><strong>Room to breathe</strong><small>Your schedule, at your pace</small></span></div>
      </div>

      <button type="button" className="scroll-cue" onClick={onExplore} aria-label="Scroll to discover Zenin OS">
        <span>SCROLL TO EXPLORE</span><span className="scroll-cue-line" />
      </button>
    </section>
  );
};
