import React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_VERSION, MIN_ANDROID_VERSION } from "../constants";

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <a className="brand-lockup footer-brand" href="#hero">
        <img src="/logo.svg" alt="" width="32" height="32" />
        <span>zenin<span className="brand-period">.</span></span>
      </a>
      <p>Make space for a day that feels like yours.</p>
      <div className="footer-meta">
        <span>v{APP_VERSION}</span><i /><span>{MIN_ANDROID_VERSION}</span><i />
        <span>&copy; {new Date().getFullYear()} N11Hub</span><i />
        <a href="https://n11hub.in" target="_blank" rel="noopener noreferrer">Official site <ArrowUpRight size={13} /></a>
      </div>
    </footer>
  );
};
