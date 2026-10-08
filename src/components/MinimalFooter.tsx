import React from "react";
import { APP_VERSION, MIN_ANDROID_VERSION } from "../constants";

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/60 py-10 px-6 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand identity using the exact logo asset */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.svg"
            alt="Zenin OS Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-semibold text-slate-800 text-sm tracking-tight">
            Zenin OS
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>v{APP_VERSION}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{MIN_ANDROID_VERSION}</span>
        </div>

        {/* Quiet copyright & domain */}
        <div className="flex items-center gap-3">
          <span>&copy; {new Date().getFullYear()} Zenin OS. All rights reserved.</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <a
            href="https://os.n11hub.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-800 transition-colors underline underline-offset-2"
          >
            os.n11hub.in
          </a>
        </div>
      </div>
    </footer>
  );
};
