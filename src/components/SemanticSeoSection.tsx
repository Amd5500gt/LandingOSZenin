import React from "react";
import { Check, Heart, Sparkles } from "lucide-react";

const benefits = [
  "A daily plan shaped around your available time",
  "Tasks, routines, and habits in one place",
  "Focus sessions that help protect your attention",
  "Progress that celebrates consistency, not perfection",
];

export const SemanticSeoSection: React.FC = () => {
  return (
    <section id="details" aria-label="About Zenin OS" className="details-section">
      <div className="details-intro">
        <span className="details-symbol"><Heart size={19} /></span>
        <p className="eyebrow">A tool for real life</p>
        <h2>Productivity that<br />feels more <span>human.</span></h2>
        <p>Zenin OS is an Android productivity system for building a clear daily schedule from your real tasks, routines, and available time. No noisy feeds. Just a little more clarity for the day ahead.</p>
      </div>
      <div className="details-list-wrap">
        <h3><Sparkles size={18} /> A calmer kind of progress</h3>
        <ul className="details-list">
          {benefits.map((benefit) => (
            <li key={benefit}><span><Check size={14} /></span>{benefit}</li>
          ))}
        </ul>
        <p className="details-note">Designed to help you move forward at your own pace.</p>
      </div>
    </section>
  );
};
